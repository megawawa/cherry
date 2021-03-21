import { ProfileFormType, ProfilePreviewType } from "../../user";
import { connectToDatabase } from "../helper";
import { ObjectId } from 'mongodb'

export async function genProfileForUser(id: string,
    profile: ProfileFormType) {
    const { db } = await connectToDatabase();
    if (!id) {
        return;
    }

    console.log('[genProfileForUser]', id, profile);

    await db
        .collection("users")
        .updateOne({ _id: { $eq: ObjectId(id) } },
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

export async function getProfileFromUser(id: string):
    Promise<ProfilePreviewType> {
    const { db } = await connectToDatabase();
    const result = await db
        .collection("users")
        .findOne({ _id: { $eq: ObjectId(id) } }, {
            $project: {
                "contact": 1, "intro": 1,
                "email": 1, "otherContact": 1,
                "phone": 1, "username": 1,
                "education": 1
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
        name: result?.username ?? "",
        education: result?.education ?? "",
        userId: id,
    }
}
