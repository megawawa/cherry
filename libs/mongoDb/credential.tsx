import { generateHash, validPassword } from "../auth";
import { CredentialType, TutorOrStudentAccount } from "../user";
import { connectToDatabase } from "./helper";

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
                        id: user._id.valueOf().toString(),
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
            }, { upsert: true, returnNewDocument: true })
        .then(
            result => {
                if (result.matchedCount != 0) {
                    console.log(`user already exists: ${result.matchedCount}.`);
                    return;
                }
                console.log("adding new user. id:", result.upsertedId._id);
                return {
                    name: credentials.name,
                    email: credentials.email,
                    isTutor: credentials.isTutor,
                    isStudent: credentials.isStudent,
                    id: result.upsertedId._id,
                }
            }
        );

    return result;
}