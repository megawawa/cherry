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
