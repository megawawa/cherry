import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import TextareaAutosize from 'react-autosize-textarea';
import styles from '../../styles/Tag.module.css'

function InputButton({ value, onEdit, onFinishedEdit, updateParentIsEditable, name }: {
    value: string,
    onEdit: (string) => void,
    onFinishedEdit: (string) => Promise<void>,
    updateParentIsEditable: (boolean) => void,
    name: string,
}) {
    // when value is empty, inputButton is just created,
    // and thus it is always editable
    const [isEditable, updateIsEditable] = useState<boolean>(value == "");

    if (isEditable) {
        return <TextareaAutosize className={styles.TagInputText}
            onChange={(event) => {
                onEdit((event.target as HTMLTextAreaElement).value);
                event.stopPropagation();
            }} value={value} onBlur={(event) => {
                updateIsEditable(!isEditable);
                onFinishedEdit((event.target as HTMLTextAreaElement).value);
                updateParentIsEditable(true);
                event.stopPropagation();
            }} onKeyPress={(event) => {
                if (event.key === 'Enter') {
                    (event.target as HTMLTextAreaElement).blur();
                }
                event.stopPropagation();

            }} autoFocus={true}>
        </TextareaAutosize>;
    }
    return <>
        <Button className={styles.TagInputButton}
            key={name + "-" + value} onClick={(event) => {
                updateIsEditable(!isEditable);
                updateParentIsEditable(false);
                event.stopPropagation();
            }}>{value == ""
                ? (<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>)
                : value}</Button>
        {!isEditable && <img className={styles.buttonImg}
            src={"/cross-out.svg"}
            alt="my image"
            onClick={(event) => {
                // removing coponent is the same as setting content to empty
                // and sending control back to parent
                onFinishedEdit("");
                updateParentIsEditable(true);
                event.stopPropagation();
            }} />}
    </>;

}

export default function InputButtonList({ tags, onUpdate, valid, name }: {
    tags?: Array<string>,
    onUpdate: (tagsState: Array<string>) => void,
    valid?: boolean,
    name: string,
}) {
    const [tagsState, updateTags] = useState(tags ?? []);

    useEffect(() => {
        updateTags(tags ?? []);
    }, [tags]);

    const [isEditable, updateIsEditable] = useState(true);

    const updateTag = (index: number, value: string) => {
        const ret = tagsState.slice(0);
        ret[index] = value;
        updateTags(ret);
    }

    const checkUpdatedTag = (index: number, value: string) => {
        // remove empty tag if finished updating tags
        // && no duplicate allowed
        let hasDuplicate = false;
        for (let i = 0; i < tagsState.length; i++) {
            if (tagsState[i] == value && i != index) {
                hasDuplicate = true;
                break;
            }
        }

        if ((value != "") && !hasDuplicate) {
            onUpdate(tagsState);
            return;
        }

        const ret = tagsState.slice(0);
        ret.splice(index, 1);
        updateTags(ret);
        onUpdate(ret);
    }

    // -- disallow editing of parent div when child div is being editted
    // -- when child div finish getting editted, check if the value is null
    //    and if is duplicate.
    const buttons = tagsState?.map((tag, index) => <InputButton value={tag}
        onEdit={(updateTag.bind(this, index))}
        onFinishedEdit={(checkUpdatedTag.bind(this, index))}
        updateParentIsEditable={updateIsEditable}
        name={name} />);

    return <div className={styles.TagsContainer + ' '
        + ((valid == false) ? styles.Invalid : styles.Valid)}
        onClick={() => {
            if (tagsState.indexOf("") != -1) {
                return;
            }
            if (isEditable) {
                updateTags(tagsState.concat([""]));
            }
        }}>
        {buttons}
    </div>;
}