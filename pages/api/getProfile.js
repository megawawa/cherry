import { getSession } from 'next-auth/client'
import { getProfileFromUser } from "../../libs/mongoDb";

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

    const result = await getProfileFromUser(session.user.name);

    console.log('getProfileFromUser', session.user.name, result);

    res.status(200).json(result);
}