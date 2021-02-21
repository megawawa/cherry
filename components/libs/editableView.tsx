import { useState } from "react";
import { Button } from "react-bootstrap";

export function EditableView({ defaultView, editView, editable }: {
    defaultView: JSX.Element
    editView: JSX.Element
    editable: boolean,
}) {
    let [state, updateState] = useState<{
        isEditMode: boolean,
    }>({
        isEditMode: false
    });
    const handleOnClick = () => {
        updateState({
            isEditMode: !state.isEditMode
        })
    }

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
                        <Button variant="light" onClick={handleOnClick} style={
                            {
                                marginRight: "1rem",
                            }}>
                            Cancel</Button>}
                    <Button variant="light" onClick={handleOnClick}>
                        {state.isEditMode ? "Confirm" : "Edit"}</Button>
                </div>)
            }
        </div>
    );
}