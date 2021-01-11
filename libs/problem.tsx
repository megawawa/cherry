export type Problem = {
    body?: string
}

export const getProblemById: (Number) => Problem = (id) => {
    return {
        body: "sample problem: " + id
    };
}