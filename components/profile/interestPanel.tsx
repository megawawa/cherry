import { useEffect, useState } from "react";
import { getUserTags, uploadTagsForUser, UserInterestsType } from "../../libs/user";
import InputButtonList from "../libs/inputButtonList";

export default function InterestPanel() {

    const [tags, updateTags] = useState<UserInterestsType>({});

    useEffect(() => {
        (async () => {
            // already initialized interest. sync interest to db
            if (tags.studentTags != undefined
                && tags.tutorTags != undefined) {
                uploadTagsForUser({
                    studentTags: tags.studentTags,
                    tutorTags: tags.tutorTags,
                });
                return;
            }

            // fetch interest from db
            const userInterests = await getUserTags();

            const studentTags = !tags.studentTags ?
                (userInterests.studentTags ?? []) : tags.studentTags;
            const tutorTags = !tags.tutorTags ?
                (userInterests.tutorTags ?? []) : tags.tutorTags;

            updateTags({
                studentTags: studentTags,
                tutorTags: tutorTags,
            });
        })();
    }, [tags.studentTags, tags.tutorTags]);

    return <div>
        <div>
            <div>I am interested in learning...</div>
            <InputButtonList tags={tags.studentTags ?? []} onUpdate={(tagsState) => {
                updateTags({
                    studentTags: tagsState,
                    tutorTags: tags.tutorTags,
                });
            }} 
            name="student-interests" />
        </div>
        <div>
            <div>I am interesting in tutoring...
                </div>
            <InputButtonList tags={tags.tutorTags ?? []} onUpdate={(tagsState) => {
                updateTags({
                    studentTags: tags.studentTags,
                    tutorTags: tagsState,
                });
            }} 
            name="tutor-interests" />
        </div>
    </div>;
}