import { Pagination } from "react-bootstrap";

export function PaginationFooter({ current, onUpdateIndex }: {
    current: number,
    onUpdateIndex: (number) => void,
}) {
    const maxIndex = 20;
    const handleClick = (event) => {
        onUpdateIndex(parseInt(event.target.text));
    };

    const handleUpdateTo = (index) => {
        return () => { onUpdateIndex(index) };
    };

    function PaginationValidItem({ current }: { current: number }) {
        if (current >= 1 && current <= maxIndex) {
            return <Pagination.Item onClick={handleClick}
                key={current}>{current}</Pagination.Item>
        }
        return <> </>;
    }

    return (<Pagination>
        { (current != 1) && (
            <>
                <Pagination.First onClick={handleUpdateTo(1)} />
                <Pagination.Prev onClick={handleUpdateTo(current - 1)} />
            </>)
        }
        { (current >= 4) && (
            <>
                <Pagination.Ellipsis />
                <PaginationValidItem current={current - 2} />
            </>
        )}
        <PaginationValidItem current={current - 1} />
        <Pagination.Item active onClick={handleUpdateTo(current)}>
            {current}</Pagination.Item>
        <PaginationValidItem current={current + 1} />
        <PaginationValidItem current={current + 2} />
        <Pagination.Ellipsis />
        <Pagination.Item onClick={handleUpdateTo(maxIndex)}>
            {maxIndex}</Pagination.Item>
        { (current <= maxIndex) && <Pagination.Next />}
        <Pagination.Last />
    </Pagination>);
}