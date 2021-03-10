import { getProblemPreviewFromTags } from "../../libs/mongoDb/quiz/problem";

export default async function handler(req, res) {

    if (req.method !== 'GET') {
        res.status(200).json({ text: 'this api is get only' });
        return;
    }

    const tags = req.query?.tags;
    const current = req.query?.current;

    if (!tags) {
        res.status(422).json({ text: "tags shouldn't be empty"});
        return;
    }

    if (!current) {
        res.status(422).json({ text: "current page shouldn't be empty"});
    }

    const parsedTags = JSON.parse(tags);
    const parsedCurrent = parseInt(current);

    if (!parsedTags) {
        res.status(422).json({ text: "parsed tags shouldn't be empty"});
        return;
    }

    if (!parsedCurrent) {
        res.status(422).json({ text: "parsed current page shouldn't be empty"});
    }

    res.status(200).json(await getProblemPreviewFromTags(parsedTags, parsedCurrent));
}