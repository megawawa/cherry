import { uploadQuiz } from "../../libs/mongoDb"
import { getSession } from 'next-auth/client'

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

    if (req.method !== 'POST') {
        res.status(200).json({ text: 'this api is post only' });
        return;
    }

    if (!req.body) {
        res.status(422).json({ text: "quiz shouldn't be empty" });
        return;
    }

    const quiz = {
        problemStatement: req.body?.problemStatement ?? "",
        submitUserName: session.user.name,
        tags: ["third grade", "math"],
    }

    uploadQuiz(quiz);
    res.status(200).json({ quizUpdate: 'success' });
}