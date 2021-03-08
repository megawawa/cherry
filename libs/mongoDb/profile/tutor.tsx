import { TutorPreviewType, TutorRequestFormType } from "../../user";
import { connectToDatabase, increaseTagsCount } from "../helper";

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

export async function genTutorRequestForUser(id: string,
    request: TutorRequestFormType) {
    const { db } = await connectToDatabase();
    if (!id) {
        return;
    }

    request.userid = id;

    console.log('[genTutorRequestForUser]', id, request);

    const res = await db
        .collection("tutor_request")
        .insertOne(request,
            { upsert: true, returnNewDocument: false })
        .then(
            result => {
                if (result.matchedCount != 0) {
                    console.log(`[genTutorRequestForUser]submitted tutor request.`);
                    return result;
                }
                console.log("[genTutorRequestForUser] user does not exist");
            }
        );

    if (res) {
        increaseTagsCount(db, request.tags, "tutorRequestCount");
    }

    console.log("[genTutorRequestForUser]", res);

    return res;
}
