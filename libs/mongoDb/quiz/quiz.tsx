import { DbProblemCreateType, DBProblemEditType } from "../../quiz";
import { connectToDatabase, increaseTagsCount } from "../helper";
import { ObjectId } from 'mongodb'

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
        await db.collection("users").updateOne(
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

        increaseTagsCount(db, quiz.tags, "quizCount");

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
