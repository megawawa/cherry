import { userInfo } from "os"

export type TutorOrStudentAccount = {
    id: number;
    name: string;
    email: string;
    isTutor: boolean;
    isStudent: boolean;
}

export type CredentialType = {
    name: string;
    email: string;
    password: string;
    isTutor: boolean;
    isStudent: boolean;
}

export type TutorPreviewType = {
    name: string;
    id: string;
}

export type UserInterestsType = {
    studentTags?: Array<string>,
    tutorTags?: Array<string>,
}

export async function getUserTags(): Promise<UserInterestsType> {
    console.log("fetching interest");
    const url = `/api/getTags`;

    const res = await fetch(
        url,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }
    )

    const result = await res.json();
    console.log("fetched interest", result);
    return result;
}

export async function uploadTagsForUser(tags: UserInterestsType)
    : Promise<void> {
    console.log("uploading interest", tags);
    const url = `/api/setTags`;

    const res = await fetch(
        url,
        {
            body: JSON.stringify(
                {
                    tags: tags,
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }
    )

    const result = await res.json();
    console.log("uploaded interest", result);
    return result;
}