import "./styles.css";

export default function Card({ icon, show, shouldBeRevealed, onCardClicked }) {
  return (
    <button
      className={`card
      ${show ? "show" : "hide"}
      ${shouldBeRevealed ? "" : "not-revealed"}
    `}
      onClick={onCardClicked}
    >
      {shouldBeRevealed ? icon : "❓"}
    </button>
  );
}