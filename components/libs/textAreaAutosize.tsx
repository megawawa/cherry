import TextareaAutosize from "react-autosize-textarea/lib";

export default function StyledTextareaAutosize(props) {
    let childProps = { ...props };
    childProps.style = { ...(props.style ?? {}), borderColor: "rgb(200, 200, 200)" };
    return <TextareaAutosize
        {...childProps}
    />;
}