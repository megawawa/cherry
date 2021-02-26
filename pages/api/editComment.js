import { editComment } from "../../libs/mongoDb"
import { getSession } from 'next-auth/client'

export default async function handler(req, res) {

    const session = await getSession({ req })
    if (session) {
        // Signed in
        console.log('Session', JSON.stringify(session, null, 2))
    } else {
        // Not Signed in
        res.status(401)
            .json({ text: '[editComment]not signed in' })
        return;
    }

    if (req.method !== 'POST') {
        res.status(200)
            .json({ text: '[editComment]this api is post only' });
        return;
    }

    if (!req.body) {
        res.status(422)
            .json({ text: "[editComment]quiz shouldn't be empty" });
        return;
    }

    if (req.body?.comment == undefined) {
        res.status(422)
            .json({ text: "[editComment]comment shouldn't be empty" });
        return;
    }


    if (req.body?.commentIndex == undefined) {
        res.status(422)
            .json({ text: "[editComment]commentIndex shouldn't be empty" });
        return;
    }


    if (req.body?.stepIndex == undefined) {
        res.status(422)
            .json({ text: "[editComment]stepIndex shouldn't be empty" });
        return;
    }

    editComment({
        stepIndex: req.body?.stepIndex,
        commentIndex: req.body?.commentIndex,
        comment: req.body?.comment,
        id: session.user.id,
        username: session.user.name,
        solutionId: req.body?.solutionId,
    }, true);
    res.status(200).json({ quizUpdate: 'success' });
}