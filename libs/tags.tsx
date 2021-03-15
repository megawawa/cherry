export function addTag(tags: Array<string>, newTag: string
): Array<string> {
    if (!tags) {
        return [newTag];
    }

    let hasDuplicate = false;
    for (let i = 0; i < tags.length; i++) {
        if (tags[i] == newTag) {
            hasDuplicate = true;
            break;
        }
    }

    if (!hasDuplicate) {
        return tags?.concat([newTag]);
    }

    return tags;
}


export async function submitFollowTagsFromUser(tags: Array<string>,
    tagsType: string) {
    console.log("uploading follow list", tags, tagsType);
    if (!tags) {
        tags = [];
    }
    const sortedTags = [...tags].sort();

    const url = `/api/submitFollow`;

    const res = await fetch(
        url,
        {
            body: JSON.stringify(
                {
                    tags: sortedTags,
                    tagsType: tagsType,
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }
    )

    const result = await res.json();
    console.log("uploaded followList", result);
    return result;
}

export async function getIfFollowTagsFromUser(tags: Array<string>,
    tagsType: string) {
    console.log("get follow list", tags, tagsType);
    if (!tags) {
        tags = [];
    }

    const sortedTags = [...tags].sort();

    const url = `/api/getFollow?` +
        `tags=${JSON.stringify(sortedTags)}` +
        `&tagsType=${tagsType}`;

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
    console.log("get followList", result);
    return result;
}