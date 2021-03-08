import { Button } from 'react-bootstrap';

export function MathSymbolList({ handleTextUpdate }: {
    handleTextUpdate: (addedSymbol: string) => void
}) {

    const symbols = ["≡", "|", "∤", "∃", "∀"];

    return <>
        {
            symbols.map((symbol, index) =>
            (<Button variant="secondary" className="ml-2" key={"math-symbol-" + index}
                onClick={() => {
                    handleTextUpdate(symbol);
                }}>
                {symbol}
            </Button>))
        }
    </>;
}