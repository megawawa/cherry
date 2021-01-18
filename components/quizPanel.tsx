import { getProblemFromTags, ProblemPreviewType } from "../libs/mockDb";
import { Problem } from "../libs/problem";

function QuizPanel({ quiz }: { quiz: ProblemPreviewType }) {
    return <div></div>;
}

export default function QuizzesPanel({ tags }:
    { tags: Array<string> }) {
    const quizzes = getProblemFromTags(tags);
    const quizPanels = quizzes.map((quiz) =>
        <QuizPanel quiz={quiz} />);

    return <div>{quizPanels}</div>;
}