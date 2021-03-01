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
    studentTags?: Array<string>;
    tutorTags?: Array<string>;
}

export type ProfileFormType = {
    contact?: string;
    intro?: string;
    email?: string;
    phone?: string;
    otherContact?: string;
    education?: string;
}

export type ProfilePreviewType = ProfileFormType & {
    name?: string
}

export type Rate = {
    type: string;
    number: number;
}

export type TutorRequestFormType = {
    message?: string;
    id?: string;
    rate?: Rate;
    requestTime?: Date;
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

    let result = await res.json();
    console.log("fetched interest", result);
    if (res.status != 200) {
        result = {};
    }
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

export async function getUserProfile(userId: string)
    : Promise<ProfilePreviewType> {
    console.log("get user profile");
    const url = `/api/getProfile?userId=${userId}`;

    const res = await fetch(
        url,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }
    )

    let result = await res.json();
    console.log("fetched profile", result);
    if (res.status != 200) {
        result = {};
    }
    return result;
}

export async function uploadProfileForUser(profile: ProfileFormType)
    : Promise<void> {
    console.log("uploading profile", profile);
    const url = `/api/setProfile`;

    const res = await fetch(
        url,
        {
            body: JSON.stringify(
                {
                    profile: profile
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }
    )

    const result = await res.json();
    console.log("uploaded profile", result);
    return result;
}

export async function createTutorRequestForUser(
    request: TutorRequestFormType): Promise<void> {
        console.log("create tutor request", request);
        const url = `/api/sendTutorRequest`;
        request.requestTime = new Date();
    
        const res = await fetch(
            url,
            {
                body: JSON.stringify(
                    {
                        request: request
                    }
                ),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )
    
        const result = await res.json();
        console.log("create tutor request", result);
        return result;
}