/* 
 * This file is helper class on top of "problem".
 * It is designed to handle interaction with derived entities from "problem"
 */

import { Summary } from './problem'

export type QuizCreateFormType = {
    problemStatement?: string,
    partialSolution?: string,
    solution?: string,
}

export type ProblemDetailViewType = {
    problemStatement?: string;
    summary: Summary;
    solution: string;
    submitUserName: string;
    submitUserId: string;
    id: string;
}

export type ProblemPreviewType = {
    problemStatement?: string;
    id?: string;
    submitUserName: string;
    submitUserId: string;
    tags: Array<string>;
    submitTime: Date;
}

export type DbProblemCreateType = ProblemPreviewType & {
    solution: string;
}

export type DBProblemEditType = DbProblemCreateType & {
    id: string
}

export type Comment = {
    username: string;
    id: string; // userId
    comment: string;
};

export type Comments = Array<Comment>;

export type CommentsList = Array<Comments>;

export type CommentEditType = Comment & {
    stepIndex: number,
    solutionId: string,
    commentIndex: number,
}