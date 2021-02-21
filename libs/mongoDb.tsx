import { MongoClient, ObjectId } from 'mongodb'
import { resourceLimits } from 'worker_threads';
import { validPassword, generateHash } from './auth'
import {
    DbProblemCreateType, DBProblemEditType,
    ProblemDetailViewType, ProblemPreviewType
} from './quiz'
import { CredentialType, TutorOrStudentAccount } from './user';


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

export async function getUserFromCredential(credentials: CredentialType):
    Promise<TutorOrStudentAccount> {
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
                        email: credentials.email,
                        isTutor: user.isTutor ?? false,
                        isStudent: user.isStudent ?? false,
                    };
                }
            }
        );

    return result;
}

export async function genUserFromCredential(credentials: CredentialType) {
    let result = null;
    const { db } = await connectToDatabase();
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
                    isTutor: credentials.isTutor,
                    isStudent: credentials.isStudent,
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
                    isTutor: credentials.isTutor,
                    isStudent: credentials.isStudent,
                }
            }
        );

    return result;
}

export async function getProblemPreviewFromTags(tags: Array<string>, pageIndex: number):
    Promise<Array<ProblemPreviewType>> {
    const { db } = await connectToDatabase();
    const result = await db
        .collection("problems")
        .find({ tags: { $eq: tags } })
        .skip((pageIndex - 1) * 10)
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
        submitUserName: result.submitUserName ?? "",
    }
}

export async function uploadQuiz(quiz: DbProblemCreateType) {
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

export async function editQuiz(quiz: DBProblemEditType) {
    const { db } = await connectToDatabase();

    return await db
        .collection("problems")
        .updateOne({
            _id: { $eq: ObjectId(quiz.id) }, submitUserName: { $eq: quiz.submitUserName }
        }, {
            "$set":
                ((obj) => {
                    delete obj.id;
                    return obj;
                })(quiz)
        }, { upsert: false, returnNewDocument: false })
        .then(
            result => {
                if (result.matchedCount != 0) {
                    console.log(`matching quiz found. edited`);
                    return;
                }
                console.log("no matching quiz to edit");
                return quiz;
            }
        );
}

