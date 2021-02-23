import { getSession } from 'next-auth/client'
import { getTagsFromUser } from "../../libs/mongoDb";

export default async function handler(req, res) {

    const session = await getSession({ req })
    if (session) {
        // Signed in
        console.log('Session', JSON.stringify(session, null, 2))
    } else {
        // Not Signed in
        res.status(401);
        return;
    }

    if (req.method !== 'GET') {
        res.status(200).json({ text: 'this api is get only' });
        return;
    }

    const result = await getTagsFromUser(session.user.name);

    console.log('fetchedTagsFromUser', session.user.name, result);

    res.status(200).json(result);
}