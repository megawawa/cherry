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
    let query: any = {
        [`tags.${tags.length}`]: { $exists: true },
        [`tags.${tags.length + 1}`]: { $exists: false }
    };
    if (tags.length != 0) {
        query["tags"] = { $all: tags };
    }
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
    const parsedResult = result.map((obj) => {
        let additionalTag = [];
        obj.tags.forEach((tag) => {
            if (tags.indexOf(tag) == -1) {
                additionalTag.push(tag);
            }
        });
        if (additionalTag.length == 0) {
            console.log("[db-getSubtopic] invalid result item from db",
                additionalTag, tags, obj.tags);
        }
        return additionalTag[0];
    });
    console.log("[db-getSubtopic]", parsedResult);
    return parsedResult;
}

