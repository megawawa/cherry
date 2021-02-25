import { Button } from 'react-bootstrap';

export function MathSymbolList({ handleTextUpdate }: {
    handleTextUpdate: (addedSymbol: string) => void
}) {

    const symbols = ["≡", "|", "∤", "∃", "∀"];

    return <>
        {
            symbols.map((symbol) =>
            (<Button variant="secondary" className="ml-2" onClick={() => {
                handleTextUpdate(symbol);
            }}>
                {symbol}
            </Button>))
        }
    </>;
}