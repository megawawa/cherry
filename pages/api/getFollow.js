import { getSession } from 'next-auth/client'
import { getIfFollowTagsFromUser } from "../../libs/mongoDb/tags";

export default async function handler(req, res) {

    if (req.method !== 'GET') {
        res.status(200).json({ text: 'this api is get only' });
        return;
    }

    const session = await getSession({ req })
    if (session) {
        // Signed in
        console.log('Session', JSON.stringify(session, null, 2))
    } else {
        // Not Signed in
        res.status(401).json({ text: 'not signed in' })
        return;
    }

    const userId = session.user.id;

    console.log("[getFollow]", req.query?.tags, req.query?.tagsType)

    const tags = JSON.parse(req.query?.tags);
    const tagsType = req.query?.tagsType;

    if (!userId) {
        res.status(422).json({ text: '[getFollow] need userId' });
        return;
    }

    
    if (!tags) {
        res.status(422).json({ text: '[getFollow] need tags' });
        return;
    }
    
    if (!tagsType) {
        res.status(422).json({ text: '[getFollow] need tagsType' });
        return;
    }


    const result = await getIfFollowTagsFromUser(userId, tags, tagsType);

    console.log('getFollow result:', result);

    res.status(200).json(result);
}