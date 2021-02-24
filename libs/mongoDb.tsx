import { MongoClient, ObjectId } from 'mongodb'
import { resourceLimits } from 'worker_threads';
import { validPassword, generateHash } from './auth'
import {
    DbProblemCreateType, DBProblemEditType,
    ProblemDetailViewType, ProblemPreviewType
} from './quiz'
import { CredentialType, ProfileFormType, TutorOrStudentAccount, TutorPreviewType, UserInterestsType } from './user';


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
        .findOne({ email: credentials.email }, { username: 1, isTutor: 1, isStudent: 1 })
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
                        id: 1, /* id not used for generating session */
                        name: user.username,
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
        .find({ tags: { $in: tags } })
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

    const uploadQuizRes = await db
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


    if (uploadQuizRes) {
        console.log("uploadedQuiz", uploadQuizRes);
        await db.collection("users").update(
            { username: uploadQuizRes.submitUserName }
            , {
                "$inc": { submittedQuizCount: 1 }
            }, { upsert: false, returnNewDocument: false }).then(
                result => {
                    if (result.matchedCount == 0) {
                        console.log(`SubmitUsername does not exist.`);
                        return;
                    }
                    console.log("update new user submitted quiz count");
                }
            );
    }
    return uploadQuizRes;
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

export async function getTopTutors(pageIndex: number)
    : Promise<TutorPreviewType> {
    const { db } = await connectToDatabase();
    const result = await db
        .collection("users")
        .find({ isTutor: true }, {
            sort: { submittedQuizCount: -1 }
        })
        .skip((pageIndex - 1) * 10)
        .limit(10)
        .toArray();
    return result.map((obj) => {
        obj.id = obj._id.valueOf().toString();
        delete obj._id;
        obj.name = obj.username;
        return obj;
    });
}

export async function getTagsFromUser(user: string):
    Promise<UserInterestsType> {
    const { db } = await connectToDatabase();
    const result = await db
        .collection("users")
        .findOne({ username: { $eq: user } }, {
            $project: { "studentTags": 1, "tutorTags": 1 }
        })
        .then(
            result => {
                if (result.matchedCount != 0) {
                    console.log(`found user interests.`, result);
                    return result;
                }
                console.log("[getTagFromUser] user does not exist");
            }
        );
    return {
        studentTags: result?.studentTags ?? [],
        tutorTags: result?.tutorTags ?? [],
    }
}

export async function genTagsForUser(user, tags: UserInterestsType) {
    const { db } = await connectToDatabase();
    if (!user) {
        return;
    }

    console.log('[genTagForUser]', user, tags);

    // do not set student/tutor tags if null
    if (!tags.studentTags) {
        delete tags.studentTags;
    }

    if (!tags.tutorTags) {
        delete tags.tutorTags;
    }

    await db
        .collection("users")
        .updateOne({ username: { $eq: user } },
            {
                "$set": tags
            }, { upsert: false, returnNewDocument: false })
        .then(
            result => {
                if (result.matchedCount != 0) {
                    console.log(`updated user interests.`);
                    return;
                }
                console.log("[genTagForUser] user does not exist");
            }
        );
}

export async function genProfileForUser(user: string,
    profile: ProfileFormType) {
    const { db } = await connectToDatabase();
    if (!user) {
        return;
    }

    console.log('[genTagForUser]', user, profile);

    // do not set student/tutor tags if null
    if (!profile.contact) {
        delete profile.contact;
    }

    if (!profile.intro) {
        delete profile.intro;
    }

    if (!profile.email) {
        delete profile.email;
    }

    if (!profile.otherContact) {
        delete profile.otherContact;
    }

    if (!profile.phone) {
        delete profile.phone;
    }

    await db
        .collection("users")
        .updateOne({ username: { $eq: user } },
            {
                "$set": profile
            }, { upsert: false, returnNewDocument: false })
        .then(
            result => {
                if (result.matchedCount != 0) {
                    console.log(`updated user profile.`);
                    return;
                }
                console.log("[genProfileForUser] user does not exist");
            }
        );
}

export async function getProfileFromUser(user: string):
    Promise<ProfileFormType> {
    const { db } = await connectToDatabase();
    const result = await db
        .collection("users")
        .findOne({ username: { $eq: user } }, {
            $project: {
                "contact": 1, "intro": 1,
                "email": 1, "otherContact": 1, "phone": 1
            }
        })
        .then(
            result => {
                if (result.matchedCount != 0) {
                    console.log(`found user interests.`, result);
                    return result;
                }
                console.log("[getProfileFromUser] user does not exist");
            }
        );
    return {
        contact: result?.contact ?? "",
        intro: result?.intro ?? "",
        email: result?.email ?? "",
        otherContact: result?.otherContact ?? "",
        phone: result?.phone ?? "",
    }
}
