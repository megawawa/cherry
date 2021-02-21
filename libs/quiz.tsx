/* 
 * This file is helper class on top of "problem".
 * It is designed to handle interaction with derived entities from "problem"
 */

export type QuizCreateFormType = {
    problemStatement?: string,
    partialSolution?: string,
    solution?: string,
}
