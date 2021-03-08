import { getSubTopics } from "../../libs/mongoDb/tags";

export default async function handler(req, res) {

    if (req.method !== 'GET') {
        res.status(200).json({ text: 'this api is get only' });
        return;
    }

    const tags = req.query?.tags;
    if (!tags) {
        res.status(422).json({ text: "[getSubTopics] tags shouldn't be empty" });
        return;
    }


    const parsedTags = JSON.parse(tags);

    if (!parsedTags) {
        res.status(422).json({ text: "[getSubTopics] parsed tags shouldn't be empty" });
        return;
    }


    // const result = parsedTags.length == 0  ? ["math"] : ["third grade", "test"];
    const result = await getSubTopics(parsedTags);

    console.log("genSubTopic:", parsedTags, result);
    res.status(200).json(result);
}