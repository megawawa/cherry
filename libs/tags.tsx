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
}
