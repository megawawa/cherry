import { ObjectId } from 'mongodb'

import { ProblemDetailViewType, ProblemPreviewType } from "../../quiz";
import { connectToDatabase } from "../helper";
import { containsTagsPredicate } from '../tags';

export async function getProblemPreviewFromTags(tags: Array<string>, pageIndex: number):
    Promise<Array<ProblemPreviewType>> {
    const { db } = await connectToDatabase();
    const result = await db
        .collection("problems")
        .find(containsTagsPredicate(tags))
        .sort([['submitTime', -1]])
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
        submitUserId: result.submitUserName ?? "",
        id: id,
    }
}
