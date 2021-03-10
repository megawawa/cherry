import { ObjectId } from 'mongodb'

import { TutorRequestFormType } from '../../user';
import { connectToDatabase, increaseTagsCount } from "../helper";
import { eqTagsPredicate } from '../tags';

export async function getTutorRequestsFromTags(tags: Array<string>, pageIndex: number):
    Promise<Array<TutorRequestFormType>> {
    const { db } = await connectToDatabase();
    const result = await db
        .collection("tutor_request")
        .find(eqTagsPredicate(tags))
        .skip((pageIndex - 1) * 10)
        .limit(10)
        .toArray();
    return result.map((obj) => {
        obj.id = obj._id.valueOf().toString();
        delete obj._id;
        return obj;
    });
}


export async function genTutorRequestForUser(id: string,
    name: string,
    request: TutorRequestFormType) {
    const { db } = await connectToDatabase();
    if (!id) {
        console.log("[genTutorRequestForUser bad id:", id);
        return;
    }

    if (!name) {
        console.log("[genTutorRequestForUser bad name", name);
        return;
    }

    request.userid = id;
    request.submitUserName = name;

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

export async function getTutorRequestFromId(id: string):
    Promise<TutorRequestFormType> {
    const { db } = await connectToDatabase();
    const result = await db
        .collection("tutor_request")
        .findOne({ _id: { $eq: ObjectId(id) } })
        .then(
            result => {
                if (result?.matchedCount != 0) {
                    console.log(`found tutor request.`, result);
                    return result;
                }
                console.log("[getTutorRequestFromId] tutor request does not exist");
            }
        );
    return ((obj) => {
        obj.id = obj._id.valueOf().toString();
        delete obj._id;
        return obj;
    })(result);
}

