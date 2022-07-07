import { useEffect, useState } from "react";
import "./styles.css";

export default function Card({ id, icon, show, disabled, idx, onCardClicked }) {
  const [shouldShow, setShouldShow] = useState(show);

  useEffect(() => {
// console.log({ show: !!show });
    setShouldShow(show);
  }, [show]);

  const handleCardClicked = () => {
    setShouldShow(true);
    setTimeout(() => {
      onCardClicked(id, idx);
    }, 500);
  };

//console.log("Card:", { id, icon, show, disabled, idx }, { shouldShow });

  return (
    <button
      className={`card
        ${shouldShow ? "" : "hide"}
        ${disabled || shouldShow ? "nonClickable" : ""} `}
      disabled={!!disabled}
      onClick={() => !!!shouldShow && handleCardClicked()}
    >
      {shouldShow ? icon : "❓"}
    </button>
  );
}