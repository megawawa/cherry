import { genTagsForUser } from "../../libs/mongoDb/tags"
import { getSession } from 'next-auth/client'

export default async function handler(req, res) {

    const session = await getSession({ req })
    if (session) {
        // Signed in
        console.log('Session', JSON.stringify(session, null, 2))
    } else {
        // Not Signed in
        res.status(401).json({ text: 'not signed in' })
        return;
    }

    if (req.method !== 'POST') {
        res.status(200).json({ text: 'this api is post only' });
        return;
    }

    if (!req.body) {
        res.status(422).json({ text: "tags shouldn't be empty" });
        return;
    }

    if (!req.body?.tags) {
        res.status(422).json({ text: "tags shouldn't be empty" });
        return;
    }

    await genTagsForUser(session.user.id, req.body?.tags);
    res.status(200).json({ quizUpdate: 'success' });
}