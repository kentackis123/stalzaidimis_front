

type CardTypes = {
    card: {
        id?: number,
        sentence?: string;
        sentence1?: string;
        sentence2?: string;
    },
    handleSelectCard: Function,
    cardSelected?: number
};

const Card = ({ card, handleSelectCard, cardSelected }: CardTypes) => {
    return (
        <div className="card">
            <p>
                {card.sentence}
                {card.sentence1 && "________"}
                {card.sentence1}
            </p>
            <button onClick={() => handleSelectCard(card)} disabled={!!cardSelected}>Select</button>
        </div>
    )
}

export default Card