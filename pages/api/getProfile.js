import { getSession } from 'next-auth/client'
import { getProfileFromUser } from "../../libs/mongoDb/profile/profile";

export default async function handler(req, res) {

    if (req.method !== 'GET') {
        res.status(200).json({ text: 'this api is get only' });
        return;
    }

    const userId = req.query?.userId;

    if (!userId) {
        res.status(422).json({ text: '[getProfile] need userId' });
        return;
    }

    const result = await getProfileFromUser(userId);

    console.log('getProfileFromUser', userId, result);

    res.status(200).json(result);
}