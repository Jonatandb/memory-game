import { useEffect, useState } from "react";
import Card from "./components/Card";
import "./styles.css";

const ICONS = [
  "🎄",
  "🎀",
  "🎃",
  "🎡",
  "🎨",
  "🛒",
  "🍫",
  "🏡",
  "💖",
  "😍",
  "🎅",
  "🎁",
  "🍬",
  "🧉",
  "🍷",
  "🍎",
  "🍌",
  "🥝",
  "🍒",
  "🧷",
  "🌻",
  "🥕",
  "🚲",
  "🛴",
  "🌈",
  "🔥",
];

const getRandomIndex = (totaltems) =>
  Math.floor(Math.random() * totaltems - 1) + 1;

const generateCards = (amount) => {
  const cards = [];

  for (let index = 0; index < amount / 2; index++) {
    const randomIndex = getRandomIndex(ICONS.length);

    if (cards.some((card) => card.icon === ICONS[randomIndex])) {
      index--;
    } else {
      const card = {
        id: randomIndex,
        icon: ICONS[randomIndex],
        show: true,
        disabled: false,
      };
      cards.push(card);
      cards.push(card);
    }
  }

  const sortedCards = [];

  for (let index = 0; index < cards.length; index++) {
    const randomIndex = getRandomIndex(cards.length);
    if (sortedCards[randomIndex]) {
      index--;
    } else {
      sortedCards[randomIndex] = cards[index];
    }
  }

  return sortedCards;
};

const INITIAL_TIMEOUT = 3000;
const TOTAL_CARDS = 8;
const CARDS_PER_ROW = TOTAL_CARDS / 2;

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    const updateCards = () => {
      setCards((cards) => {
        const updatedCards = cards.map((card, idx) => ({
          ...card,
          idx,
          show: false,
          disabled: false,
        }));
        console.log("updating cards...", { cards, updatedCards });

        return updatedCards;
      });
    };
    setCards(generateCards(8));
    setTimeout(() => updateCards(), INITIAL_TIMEOUT);
  }, []);

  const handleCardClicked = (id, idx) => {
    console.log("handleCardClicked", { idx, id });
    setCardsData((cardsData) => {
      const oldData = cardsData.find((cd) => cd.id === id);
      if (oldData) {
        // dibujo ya clickeado
        if (oldData.id === id) {
          if (oldData.idx === idx) {
            // misma card ya clickeada
            return [];
          } else {
            // misma card pero en otro lugar
            // COINCIDENCIA!!
            setTimeout(() => {
              setCards((cards) => {
                return cards.map((card) => {
                  if (card.id === id) {
                    return {
                      ...card,
                      disabled: true,
                      show: true,
                    };
                  } else {
                    return card;
                  }
                });
              });
            }, 500);
            return [];
          }
        } else {
          // otra card
          setTimeout(() => {
            setCards((cards) => {
              return cards.map((card) => {
                if (
                  (card.id === id && card.idx === idx) ||
                  (card.id === oldData.id && card.idx === oldData.idx)
                ) {
                  return {
                    ...card,
                    show: false,
                  };
                } else {
                  return card;
                }
              });
            });
          }, 500);
          return [];
        }
      } else {
        if (cardsData.length === 0) {
          setCards((cards) => {
            const updatedCards = cards.map((card) => {
              if (card.id === id && card.idx === idx) {
                return {
                  ...card,
                  disabled: false,
                  show: true,
                };
              } else {
                return card;
              }
            });
            return updatedCards;
          });
          return [
            {
              id,
              idx,
            },
          ];
        } else {
          const otherCardId = cardsData[0].id;
          const otherCardIdx = cardsData[0].idx;

          setTimeout(() => {
            setCards((cards) => {
              const updatedCards = cards.map((card) => {
                if (
                  (card.id === id && card.idx === idx) ||
                  (card.id === otherCardId && card.idx === otherCardIdx)
                ) {
                  return {
                    ...card,
                    disabled: false,
                    show: false,
                  };
                } else {
                  return card;
                }
              });
              console.log({ updatedCards });
              return updatedCards;
            });
          }, 500);
          return [];
        }
      }
    });
  };

  console.log("Render:", { cards, cardsData });

  return (
    <div className="app">
      {cards.map(({ id, icon, show, disabled }, idx) => {
        const br = ((idx + 1) % CARDS_PER_ROW) === 0 ? <p style={{display:'block'}}>j</p> : null
        console.log({idx, '(idx + 1) % CARDS_PER_ROW) === 0': (idx + 1) % CARDS_PER_ROW === 0});
        return (
          <>
            <Card
              key={`${id}__${idx}`}
              id={id}
              icon={icon}
              show={show}
              disabled={
                !!cardsData.find((cd) => cd.id === id)?.disabled || !!disabled
              }
              idx={idx}
              onCardClicked={handleCardClicked}
            />
            {br}
          </>
        );
      })}
    </div>
  );
}

export default MemoryGame;
