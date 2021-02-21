import { useState } from "react";
import { Button } from "react-bootstrap";

export function EditableView({ defaultView, editView, editable, onCancel, onSave }: {
    defaultView: JSX.Element
    editView: JSX.Element
    editable: boolean,
    onCancel: () => void,
    onSave: () => void,
}) {
    let [state, updateState] = useState<{
        isEditMode: boolean,
    }>({
        isEditMode: false
    });
    const handleOnSave = () => {
        onSave();
        updateState({
            isEditMode: !state.isEditMode
        });
    };

    const handleOnCancel = () => {
        onCancel();
        updateState({
            isEditMode: !state.isEditMode
        });
    };

    return (
        <div>
            {state.isEditMode ? editView : defaultView}
            {
                editable &&
                (<div style={{
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    display: "flex",
                    marginTop: "1rem",
                }}>
                    {state.isEditMode &&
                        <Button variant="light" onClick={handleOnCancel} style={
                            {
                                marginRight: "1rem",
                            }}>
                            Cancel</Button>}
                    <Button variant="light" onClick={handleOnSave}>
                        {state.isEditMode ? "Confirm" : "Edit"}</Button>
                </div>)
            }
        </div>
    );
}