import { useEffect, useState } from "react";
import Card from "./components/Card";
import "./styles.css";

const CATEGORIES = {
  random: {
    label: "Varios",
    icons: [
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
    ],
  },
  animals: {
    label: "Animales",
    icons: [
      "🐟",
      "🐶",
      "🐱",
      "🐔",
      "🐦",
      "🐢",
      "🐳",
      "🐙",
      "🐌",
      "🐎",
      "🐘",
      "🐲",
      "🐞",
      "🐺",
      "🐍",
      "🐒",
    ],
  },
  vegetables: {
    label: "Vegetales",
    icons: [
      "🍅",
      "🍆",
      "🌽",
      "🥕",
      "🥒",
      "🥬",
      "🍏",
      "🥑",
      "🍒",
      "🍓",
      "🍇",
      "🍌",
    ],
  },
  vehicles: {
    label: "Vehículos",
    icons: [
      "🚓",
      "🚙",
      "🚍",
      "🛫",
      "🚂",
      "🚒",
      "🚜",
      "🚤",
      "🚢",
      "🚞",
      "🚁",
      "🚠",
    ],
  },
  people: {
    label: "Personas",
    icons: [
      "👫",
      "🧍‍♀️",
      "🧍‍♂️",
      "💃",
      "🕺",
      "🕴",
      "👨‍🚀",
      "👩‍⚕️",
      "🕵️‍♂️",
      "👨‍🔧",
      "👩‍🍳",
      "👮‍♂️",
      "👩‍🏫",
      "👨‍🌾",
      "🧙‍♂️",
      "🎅",
      "🙋‍♂️",
      "👨‍👩‍",
    ],
  },
  tools: {
    label: "Herramientas",
    icons: [
      "🧰",
      "🔪",
      "📞",
      "🔨",
      "🔧",
      "🧲",
      "🧵",
      "🧶",
      "🩺",
      "🧱",
      "💉",
      "🧪",
    ],
  },
};

const getRandomIndex = (totaltems) =>
  Math.floor(Math.random() * totaltems - 1) + 1;

const generateCards = (cardsAmount, repetitionAmount, category = "random") => {
  const cards = [];

  for (let index = 0; index < cardsAmount / repetitionAmount; index++) {
    const randomIndex = getRandomIndex(CATEGORIES[category].icons.length);

    if (
      cards.some(
        (card) => card.icon === CATEGORIES[category].icons[randomIndex]
      )
    ) {
      index--;
    } else {
      const card = {
        id: randomIndex,
        icon: CATEGORIES[category].icons[randomIndex],
      };
      for (let pushTimes = 0; pushTimes < repetitionAmount; pushTimes++) {
        cards.push(card);
      }
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

const CARDS_AMOUNT = 24;
const DIFFICULTY = {
  EASY: {
    label: "Fácil",
    requiredMatches: 2,
  },
  MEDIUM: {
    label: "Medio",
    requiredMatches: 3,
  },
  HARD: {
    label: "Difícil",
    requiredMatches: 4,
  },
};

function MemoryGame() {
  const [requiredMatches, updateRequiredMatches] = useState(
    DIFFICULTY.EASY.requiredMatches
  );
  const [cards, setCards] = useState(
    generateCards(CARDS_AMOUNT, requiredMatches)
  );
  const [clickedCards, updateClickedCards] = useState([]);
  const [matches, updateMatches] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [won, setWon] = useState(false);
  const [category, updateCategory] = useState("random");

  const resetStatistics = () => {
    setShowAll(true);
    setWon(false);
    setCards(generateCards(CARDS_AMOUNT, requiredMatches));
    updateClickedCards([]);
    updateMatches([]);
  };

  const handleChangeDifficulty = (difficultyKey) => {
    resetStatistics();
    updateRequiredMatches(DIFFICULTY[difficultyKey].requiredMatches);
  };

  const handleChangeCategory = (categoryKey) => {
    resetStatistics();
    updateCategory(categoryKey);
  };

  useEffect(() => {
    setCards(generateCards(CARDS_AMOUNT, requiredMatches, category));
  }, [requiredMatches, category]);

  const handleCardClicked = (idx) => {
    updateClickedCards([...clickedCards, { idx }]);
  };

  useEffect(() => {
    if (matches.length === CARDS_AMOUNT / requiredMatches) {
      setWon(true);
      setShowAll(true);
    }
  }, [matches.length, requiredMatches]);

  useEffect(() => {
    setTimeout(() => {
      if (clickedCards.length >= requiredMatches) {
        const id = cards[clickedCards[0].idx].id;
        if (clickedCards.every((cc) => cards[cc.idx].id === id)) {
          updateMatches((matches) => [...matches, { id }]);
        }
        updateClickedCards([]);
      }
    }, 700);
  }, [clickedCards, cards, requiredMatches]);

  return (
    <div className="app">
      <div className="Title">
        <h3>
          Juego de memoria (<small>Jonatandb@gmail.com</small>)
        </h3>
      </div>
      <div className="Container">
        <div className="Menu">
          <div className="Stats">
            <h3>Estadísticas:</h3>
            <p>&gt; Aciertos: {matches.length}</p>
            <p>
              &gt; Restantes: {CARDS_AMOUNT / requiredMatches - matches.length}
            </p>
          </div>
          <div className="Options">
            <h3>Categoría:</h3>
            {Object.keys(CATEGORIES).map((categoryKey) => {
              const disabled = categoryKey === category;
              const active = disabled;
              return (
                <button
                  key={categoryKey}
                  className={active ? "active" : ""}
                  style={{ display: "block", padding:'7px', fontSize:'15px' }}
                  disabled={disabled}
                  onClick={() => handleChangeCategory(categoryKey)}
                >
                  {CATEGORIES[categoryKey].label}
                </button>
              );
            })}
            <h3>Dificultad:</h3>
            {Object.keys(DIFFICULTY).map((difficultyKey) => {
              const disabled =
                DIFFICULTY[difficultyKey].requiredMatches === requiredMatches;
              const active = disabled;
              return (
                <button
                  key={difficultyKey}
                  className={active ? "active" : ""}
                  style={{ display: "block", padding:'7px', fontSize:'15px' }}
                  disabled={disabled}
                  onClick={() => handleChangeDifficulty(difficultyKey)}
                >
                  {DIFFICULTY[difficultyKey].label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="Board">
          {cards.map(({ id, icon }, idx) => {
            const wasClicked = clickedCards.find((cc) => cc.idx === idx);
            const wasMatched = matches.find((match) => match.id === id);
            const shouldBeRevealed = showAll || wasClicked || wasMatched;
            return (
              <Card
                key={`${id}__${idx}`}
                icon={icon}
                show={showAll || !wasMatched}
                shouldBeRevealed={shouldBeRevealed}
                onCardClicked={() =>
                  !shouldBeRevealed && handleCardClicked(idx)
                }
              />
            );
          })}
        </div>
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "52%",
            backgroundColor: "cyan",
            border: "5px dotted black",
            padding: "15px",
            borderRadius: "25px",
            display: showAll ? "block" : "none",
          }}
        >
          <button onClick={() => setShowAll(false)}>
            <h1>JUGAR!</h1>
          </button>
        </div>
      </div>
      {won && (
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "48%",
            backgroundColor: "cyan",
            border: "5px dotted black",
            padding: "15px",
            borderRadius: "25px",
            display: showAll ? "block" : "none",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <h1>GANASTE!! 🤩</h1>
            <button onClick={() => resetStatistics()}>
              <h1>Volver a JUGAR!</h1>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemoryGame;

// const br =
//   (idx + 1) % CARDS_PER_ROW === 0 ? (
//     <p style={{ display: "block" }}>j</p>
//   ) : null;
// console.log({
//   idx,
//   "(idx + 1) % CARDS_PER_ROW) === 0": (idx + 1) % CARDS_PER_ROW === 0,
// });

//   useEffect(() => {
//     const updateCards = () => {
//       setCards((cards) => {
//         const updatedCards = cards.map((card, idx) => ({
//           ...card,
//           idx,
//           show: false,
//           disabled: false,
//         }));
// console.log("updating cards...", { cards, updatedCards });
//         return updatedCards;
//       });
//     };
//     setTimeout(() => updateCards(), INITIAL_TIMEOUT);
//   }, []);

//   const handleCardClicked = (id, idx) => {
//     console.log("handleCardClicked", { idx, id });
//     updateCardsState((cardsData) => {
//       const oldData = cardsData.find((cd) => cd.id === id);
//       if (oldData) {
//         // dibujo ya clickeado
//         if (oldData.id === id) {
//           if (oldData.idx === idx) {
//             // misma card ya clickeada
//             return [];
//           } else {
//             // misma card pero en otro lugar
//             // COINCIDENCIA!!
//             setTimeout(() => {
//               setCards((cards) => {
//                 return cards.map((card) => {
//                   if (card.id === id) {
//                     return {
//                       ...card,
//                       disabled: true,
//                       show: true,
//                     };
//                   } else {
//                     return card;
//                   }
//                 });
//               });
//             }, 500);
//             return [];
//           }
//         } else {
//           // otra card
//           setTimeout(() => {
//             setCards((cards) => {
//               return cards.map((card) => {
//                 if (
//                   (card.id === id && card.idx === idx) ||
//                   (card.id === oldData.id && card.idx === oldData.idx)
//                 ) {
//                   return {
//                     ...card,
//                     show: false,
//                   };
//                 } else {
//                   return card;
//                 }
//               });
//             });
//           }, 500);
//           return [];
//         }
//       } else {
//         if (cardsData.length === 0) {
//           setCards((cards) => {
//             const updatedCards = cards.map((card) => {
//               if (card.id === id && card.idx === idx) {
//                 return {
//                   ...card,
//                   disabled: false,
//                   show: true,
//                 };
//               } else {
//                 return card;
//               }
//             });
//             return updatedCards;
//           });
//           return [
//             {
//               id,
//               idx,
//             },
//           ];
//         } else {
//           const otherCardId = cardsData[0].id;
//           const otherCardIdx = cardsData[0].idx;

//           setTimeout(() => {
//             setCards((cards) => {
//               const updatedCards = cards.map((card) => {
//                 if (
//                   (card.id === id && card.idx === idx) ||
//                   (card.id === otherCardId && card.idx === otherCardIdx)
//                 ) {
//                   return {
//                     ...card,
//                     disabled: false,
//                     show: false,
//                   };
//                 } else {
//                   return card;
//                 }
//               });
//               console.log({ updatedCards });
//               return updatedCards;
//             });
//           }, 500);
//           return [];
//         }
//       }
//     });
//   };

// console.log("Render:", { cards, cardsData: cardsState });
