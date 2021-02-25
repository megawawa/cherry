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

export type ProfileFormType = {
    contact?: string,
    intro?: string,
    email?: string,
    phone?: string,
    otherContact?: string,
}

export type ProfilePreviewType = ProfileFormType & {
    name: string
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

export async function getUserProfile()
    : Promise<ProfileFormType> {
    console.log("get user profile");
    const url = `/api/getProfile`;

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