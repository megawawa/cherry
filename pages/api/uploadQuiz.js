import { uploadQuiz } from "../../libs/mongoDb/quiz/quiz"
import { getSession } from 'next-auth/client'

export default async function handler(req, res) {
    const session = await getSession({ req })
    if (session) {
        // Signed in
        console.log('[uploadQuiz] Session', JSON.stringify(session, null, 2))
    } else {
        // Not Signed in
        res.status(401).json({ text: '[uploadQuiz] not logged in' });;
        return;
    }

    if (req.method !== 'POST') {
        res.status(200).json({ text: 'this api is post only' });
        return;
    }

    if (!req.body?.quiz) {
        res.status(422).json({ text: "quiz shouldn't be empty" });
        return;
    }

    if (!req.body?.tags) {
        res.status(422).json({ text: "tags shouldn't be empty" });
        return;
    }


    const quiz = {
        problemStatement: req.body?.quiz?.problemStatement ?? "",
        submitUserName: session.user.name,
        submitUserId: session.user.id,
        tags: req.body?.tags,
        solution: req.body?.quiz?.solution ?? "",
        summary: {
            pastAttempts: 0, successfulAttempts: 0
        },
        submitTime: new Date(),
    }

    uploadQuiz(quiz);
    res.status(200).json({ quizUpdate: 'success' });
}