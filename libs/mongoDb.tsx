import { MongoClient, ObjectId } from 'mongodb'
import { resourceLimits } from 'worker_threads';
import { validPassword, generateHash } from './auth'
import { Summary } from './problem'


const { MONGODB_URI, MONGODB_DB } = process.env
const globalAny: any = global;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}

if (!MONGODB_DB) {
    throw new Error(
        'Please define the MONGODB_DB environment variable inside .env.local'
    )
}

/**
 * globalAny is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = globalAny.mongo

if (!cached) {
    cached = globalAny.mongo = { conn: null, promise: null }
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }

        cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
            return {
                client,
                db: client.db(MONGODB_DB),
            }
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}

export async function getUserFromCredential(credentials) {
    let result = null;
    const { db } = await connectToDatabase();
    console.log("credentials: ", credentials);
    if (!credentials.email) {
        return;
    }
    result = await db
        .collection("users")
        .findOne({ email: credentials.email })
        .then(
            (user) => {
                console.log("user: ", user);
                if (!user) {
                    return;
                }
                if (!validPassword(credentials.password, user)) {
                    //password did not match
                } else {
                    return {
                        id: 1, name: user.username,
                        email: credentials.email
                    };
                }
            }
        );

    return result;
}

export async function genUserFromCredential(credentials) {
    let result = null;
    const { db } = await connectToDatabase();
    console.log("credentials: ", credentials);
    if (!credentials.name || !credentials.email || !credentials.password) {
        return;
    }
    result = await db
        .collection("users")
        .updateOne({ username: credentials.name },
            {
                "$setOnInsert": {
                    username: credentials.name,
                    password: generateHash(credentials.password),
                    email: credentials.email,
                }
            }, { upsert: true, returnNewDocument: false })
        .then(
            result => {
                if (result.matchedCount != 0) {
                    console.log(`user already exists: ${result.matchedCount}.`);
                    return;
                }
                console.log("adding new user");
                return {
                    name: credentials.name,
                    email: credentials.email,
                }
            }
        );

    return result;
}

export type ProblemPreviewType = {
    problemStatement?: string;
    id?: string;
    submitUserName: string;
    tags: Array<string>;
}
export async function getProblemPreviewFromTags(tags: Array<string>):
    Promise<Array<ProblemPreviewType>> {
    const { db } = await connectToDatabase();
    const result = await db
        .collection("problems")
        .find({ tags: { $eq: tags } })
        .limit(10)
        .toArray();
    return result.map((obj) => {
        obj.id = obj._id.valueOf().toString();
        delete obj._id;
        return obj;
    });
}


export async function getProblemPreviewFromUser(user: string):
    Promise<Array<ProblemPreviewType>> {
    const { db } = await connectToDatabase();
    const result = await db
        .collection("problems")
        .find({ submitUserName: { $eq: user } })
        .limit(10)
        .toArray();
    return result.map((obj) => {
        obj.id = obj._id.valueOf().toString();
        delete obj._id;
        return obj;
    });
}


export type ProblemDetailViewType = {
    problemStatement?: string;
    summary: Summary;
    solution: string;
}

export async function getProblemDetailViewFromId(id: string):
    Promise<ProblemDetailViewType> {
    const { db } = await connectToDatabase();
    const result = await db
        .collection("problems")
        .findOne({ _id: { $eq: ObjectId(id) } });
    return {
        problemStatement: result?.problemStatement ?? "",
        summary: result.summary ?? {},
        solution: result.solution ?? "",
    }
}

export type ProblemType = ProblemPreviewType & {
    solution: string;
}

export async function uploadQuiz(quiz: ProblemType) {
    const { db } = await connectToDatabase();

    return await db
        .collection("problems")
        .updateOne({
            problemStatement
                : quiz.problemStatement
        }, {
            "$setOnInsert":
                quiz
        }, { upsert: true, returnNewDocument: false })
        .then(
            result => {
                if (result.matchedCount != 0) {
                    console.log(`Identical problem statement already exists.`);
                    return;
                }
                console.log("adding new quiz");
                return quiz;
            }
        );
}

