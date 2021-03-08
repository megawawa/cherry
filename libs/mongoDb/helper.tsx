import { MongoClient, ObjectId } from 'mongodb'

function* iterator(tags: Array<string>) {
    tags.sort();

    for (let i = 0; i < Math.pow(2, tags.length); i++) {
        let selectedIndex = [];
        let j = i;
        while (j != 0) {
            // find least significant bit
            selectedIndex.push(Math.log2(j & -j));
            // clear least significant bit
            j = j & (j - 1);
        }

        if (selectedIndex.length > 3) {
            continue;
        }

        yield selectedIndex.map((index) => tags[index]);
    }
}

export function increaseTagsCount(db: any, tags: Array<string>, countName: string) {
    const tagsSubset = iterator(tags);
    const bulkOp = db
        .collection("tags").initializeUnorderedBulkOp();
    while (true) {
        let tags = tagsSubset.next().value;
        if (!tags) break;
        bulkOp.find({ tags: { $eq: tags } })
            .upsert()
            .updateOne(
                { "$inc": { [countName]: 1 } });
    }
    bulkOp.execute();
}

const { MONGODB_URI, MONGODB_DB } = process.env
const globalAny: any = global;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}

if (!MONGODB_DB) {
    throw new Error(
        'Please define the MONGODB_DB environment variable inside .env.local'
    )
}

/**
 * globalAny is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = globalAny.mongo

if (!cached) {
    cached = globalAny.mongo = { conn: null, promise: null }
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }

        cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
            return {
                client,
                db: client.db(MONGODB_DB),
            }
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}