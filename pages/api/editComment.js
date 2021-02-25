import { editComment } from "../../libs/mongoDb"
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
        res.status(422).json({ text: "quiz shouldn't be empty" });
        return;
    }

    if (!req.body?.comment) {
        res.status(422).json({ text: "comment shouldn't be empty" });
        return;
    }

    
    if (req.body?.commentIndex == undefined) {
        res.status(422).json({ text: "commentIndex shouldn't be empty" });
        return;
    }

    
    if (req.body?.stepIndex == undefined) {
        res.status(422).json({ text: "stepIndex shouldn't be empty" });
        return;
    }

    editComment({
        stepIndex: req.body?.stepIndex,
        commentIndex: req.body?.commentIndex,
        comment: req.body?.comment,
        userId: session.user.id,
        solutionId: req.body?.solutionId,
    }, true);
    res.status(200).json({ quizUpdate: 'success' });
}