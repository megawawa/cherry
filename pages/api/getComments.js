import { getCommentRange } from "typescript";
import { getComments } from "../../libs/mongoDb";

export default async function handler(req, res) {

    if (req.method !== 'GET') {
        res.status(200).json({ text: 'this api is get only' });
        return;
    }

    const problemId = req.query?.problemId;
    const stepIndex = req.query?.stepIndex;

    if (!problemId) {
        res.status(422).json({ text: "problemId shouldn't be empty"});
        return;
    }

    if (!stepIndex) {
        res.status(422).json({ text: "stepIndex shouldn't be empty"});
    }

    const parsedProblemId = JSON.parse(problemId);
    const parsedStepIndex = parseInt(stepIndex);

    if (!parsedProblemId) {
        res.status(422).json({ text: "parsedProblemId shouldn't be empty"});
        return;
    }

    if (!parsedStepIndex) {
        res.status(422).json({ text: "parsedStepIndex page shouldn't be empty"});
    }

    res.status(200).json(await getComments(parsedProblemId, parsedStepIndex));
}