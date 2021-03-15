import { UserInterestsType } from "../user";
import { connectToDatabase } from "./helper";
import { ObjectId } from 'mongodb'

export async function getTagsFromUser(id: string):
    Promise<UserInterestsType> {
    const { db } = await connectToDatabase();
    const result = await db
        .collection("users")
        .findOne({ _id: { $eq: ObjectId(id) } }, {
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

export async function genTagsForUser(id: string, tags: UserInterestsType) {
    const { db } = await connectToDatabase();
    if (!id) {
        return;
    }

    console.log('[genTagForUser]', id, tags);

    // do not set student/tutor tags if null
    if (!tags.studentTags) {
        delete tags.studentTags;
    }

    if (!tags.tutorTags) {
        delete tags.tutorTags;
    }

    await db
        .collection("users")
        .updateOne({ _id: { $eq: ObjectId(id) } },
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

export function eqTagsPredicate(tags: Array<string>) {
    if (tags.length == 0) {
        return {
            [`tags.0`]: { $exists: true }
        };
    }
    let query: any = {
        [`tags.${tags.length}`]: { $exists: true },
        [`tags.${tags.length + 1}`]: { $exists: false }
    };
    query["tags"] = { $all: tags };

    return query;
}

export async function getSubTopics(tags: Array<string>,
    stepIndex: number
): Promise<Array<string>> {
    // TODO(@megawawa, 2/28/2021) getSubTopic only works for short array
    const { db } = await connectToDatabase();

    let query = eqTagsPredicate(tags);

    const result = await db
        .collection("tags")
        .find(query)
        .sort({ quizCount: -1 })
        .limit(5)
        .toArray();
    let tagsSet = [];
    result.map((obj) => {
        obj.tags.forEach((tag) => {
            if (tags.indexOf(tag) != -1) {
                return;
            }
            if (tagsSet.indexOf(tag) != -1) {
                return;
            }
            tagsSet.push(tag);
        });
        if (tagsSet.length == 0) {
            console.log("[db-getSubtopic] invalid result item from db",
                tagsSet, tags, obj.tags);
        }
    });

    console.log("[db-getSubtopic]", tagsSet);
    return tagsSet;
}


export async function submitFollowTagsFromUser(userId: string,
    tags: Array<string>,
    tagsType: string) {

    const { db } = await connectToDatabase();
    if (!userId) {
        return;
    }

    console.log('[submitFollowTagsFromUser]', userId, tags, tagsType);

    await db
        .collection("users")
        .updateOne({
            _id: { $eq: ObjectId(userId) }
        },
            {
                $addToSet: { [tagsType]: tags }
            }, { upsert: false, returnNewDocument: false })
        .then(
            result => {
                if (result.matchedCount != 0) {
                    console.log(`submitFollowTagsFromUser success.`);
                    return;
                }
                console.log("[submitFollowTagsFromUser] user does not exist");
            }
        );
}


export async function getIfFollowTagsFromUser(userId: string,
    tags: Array<string>,
    tagsType: string) {

    const { db } = await connectToDatabase();
    if (!userId) {
        return false;
    }

    if (!tags?.length) {
        return false;
    }

    console.log('[getIfFollowTagsFromUser]', userId, tags, tagsType);

    return await db
        .collection("users")
        .findOne({
            _id: { $eq: ObjectId(userId) },
            [tagsType]: { $all: [tags] }
        })
        .then(
            result => {
                console.log("[getIfFollowTagsFromUser]", result);
                if (result) {
                    console.log(`getIfFollowTagsFromUser success.`);
                    return true;
                }
                console.log("[getIfFollowTagsFromUser] no matching results");
                return false;
            }
        );
}

