import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Card from './Card';

const URL = "http://localhost:3001";
const socket = io(URL, { transports: ['websocket'] });

type CardTypes = {
  card: {
    id?: number,
    sentence?: string;
    sentence1?: string;
    sentence2?: string;
  }
};

type SelectedCardsType = {
  id?: string,
  sentence?: string;
};

function App() {
  const [cards, setCards] = useState<CardTypes["card"][]>([])
  // TO:DO fix type to not be any
  const [cardSelected, setCardSelected] = useState<any | null>(null)
  const [gameReady, setGameReady] = useState<boolean>(false)
  const [showSelectedCards, setShowSelectedCards] = useState<SelectedCardsType[]>([])

  useEffect(() => {
    socket.on('gameReady', () => {
      setGameReady(true)
    });
    socket.on('cards', (data) => {
      if (data.length) {
        setCards(data)
      }
    });
    socket.on('showContenders', (data) => {
      if (data.length) {
        setShowSelectedCards(data)
      }
    });
  }, []);

  useEffect(() => {
    if (gameReady) {
      socket.emit('deal');
    }
  }, [gameReady])

  const handleSelectCard = (card: SelectedCardsType) => {
    socket.emit("selectWhiteCard", card)
    setCardSelected(card.id)
  }

  // const handlePost = async () => {
  //   const result = await fetch(
  //     'http://localhost:3001/api/test',
  //     { method: 'post', body: JSON.stringify({ 'aaa': 'bbb' }), headers: { 'Content-Type': 'application/json' } }
  //   ).then(res => res.json())
  //   console.log(result)
  // }
  if (!gameReady) {
    return <div><h1>Waiting for other players</h1></div>
  }

  return showSelectedCards.length > 0 ? (
    <div>
      {showSelectedCards.map(i => <p key={i.id}>{i.id}: {i.sentence}</p>)}
    </div>
  ) : (
    <div>
      {cards.map(card =>
        <Card
          card={card}
          key={card.id}
          handleSelectCard={handleSelectCard}
          cardSelected={cardSelected} />
      )}
      {/* <button onClick={handlePost}>test</button> */}
    </div>
  );
}

export default App;