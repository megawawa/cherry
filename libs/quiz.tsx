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
}

export type ProblemPreviewType = {
    problemStatement?: string;
    id?: string;
    submitUserName: string;
    tags: Array<string>;
}

export type DbProblemCreateType = ProblemPreviewType & {
    solution: string;
}

export type DBProblemEditType = DbProblemCreateType & {
    id: string
}