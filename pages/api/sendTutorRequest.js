import { genTutorRequestForUser } from "../../libs/mongoDb"
import { getSession } from 'next-auth/client'

export default async function handler(req, res) {

    const session = await getSession({ req })
    if (session) {
        // Signed in
        console.log('Session', JSON.stringify(session, null, 2))
    } else {
        // Not Signed in
        res.status(401).json({ text: '[setProfile] not signed in' });;
        return;
    }

    if (req.method !== 'POST') {
        res.status(200).json({ text: 'this api is post only' });
        return;
    }

    if (!req.body?.request) {
        res.status(422).json({ text: "tutor request shouldn't be empty" });
        return;
    }

    await genTutorRequestForUser(session.user.id, req.body?.request);
    res.status(200).json({ quizUpdate: 'success' });
}