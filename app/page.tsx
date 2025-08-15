import { useState, useEffect } from 'react';
import AnimalCard from './AnimalCard';
import ScorePanel from './ScorePanel';

const animals = [
  { id: 1, name: 'Lion', image: '🦁', sound: 'roar.mp3' },
  { id: 2, name: 'Elephant', image: '🐘', sound: 'trumpet.mp3' },
  { id: 3, name: 'Monkey', image: '🐒', sound: 'ooh.mp3' },
  { id: 4, name: 'Giraffe', image: '🦒', sound: 'munch.mp3' },
  { id: 5, name: 'Penguin', image: '🐧', sound: 'squeak.mp3' },
  { id: 6, name: 'Bear', image: '🐻', sound: 'growl.mp3' }
];

const GameBoard = () => {
  const [cards, setCards] = useState(shuffleCards([...animals, ...animals]));
  const [score, setScore] = useState(0);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first].id === cards[second].id) {
        setMatched([...matched, first, second]);
        setScore(score + 10);
        playSound('success.mp3');
      } else {
        playSound('error.mp3');
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  }, [flipped]);

  const handleCardClick = (index: number) => {
    if (flipped.length < 2 && !flipped.includes(index)) {
      setFlipped([...flipped, index]);
      playSound(cards[index].sound);
    }
  };

  const playSound = (soundFile: string) => {
    const audio = new Audio(`/sounds/${soundFile}`);
    audio.play();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ScorePanel score={score} matched={matched.length} total={cards.length} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {cards.map((animal, index) => (
          <AnimalCard
            key={index}
            animal={animal}
            isFlipped={flipped.includes(index) || matched.includes(index)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

const shuffleCards = (array: typeof animals) => {
  return array.sort(() => Math.random() - 0.5);
};

export default GameBoard;