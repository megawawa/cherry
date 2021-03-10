import { ObjectId } from 'mongodb'
import { CommentEditType, Comments } from '../../quiz';
import { connectToDatabase } from '../helper';


export async function getComments(problemId: string,
    stepIndex: number
): Promise<Comments> {
    const { db } = await connectToDatabase();
    const result = await db
        .collection("problems")
        .findOne({ _id: { $eq: ObjectId(problemId) } })
        .then(
            result => {
                if (result.matchedCount != 0) {
                    console.log(`found user interests.`, result);
                    return result;
                }
                console.log("[getProfileFromUser] user does not exist");
            }
        );
    if (!result?.commentsList) {
        console.log("[getComments]", []);
        return [];
    }
    const comments = result?.commentsList[stepIndex]?.comments ?? [];
    console.log("[getComments]", comments);
    return comments;
}

export async function editComment(comment: CommentEditType, insert: boolean) {
    const { db } = await connectToDatabase();

    console.log("[editComment]uploading comment", comment);


    const bulkOp = db
        .collection("problems").initializeOrderedBulkOp();

    bulkOp.find({
        _id: { $eq: ObjectId(comment.solutionId) },
        'commentsList': { $exists: false },
    })
        .updateOne({
            "$set":
            {
                "commentsList": []
            }
        });

    // push empty comment list if not exists
    bulkOp.find({
        _id: { $eq: ObjectId(comment.solutionId) },
        [`commentsList.${comment.stepIndex}.comments`]: { $exists: false },
    })
        .updateOne({
            "$set":
            {
                [`commentsList.${comment.stepIndex}`]:
                {
                    "comments": [],
                }
            }
        });

    if (insert) {
        // only support add comment for now
        bulkOp.find({
            _id: { $eq: ObjectId(comment.solutionId) },
        })
            .upsert()
            .updateOne({
                "$push":
                {
                    [`commentsList.${comment.stepIndex}.comments`]: {
                        comment: comment.comment,
                        id: comment.id,
                        username: comment.username,
                    }
                }
            });
    }

    await bulkOp.execute();
}