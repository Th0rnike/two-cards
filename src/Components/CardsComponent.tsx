import backCard from "../assets/bg-card-back.png";
import frontCard from "../assets/bg-card-front.png";
import cardLogo from "../assets/card-logo.svg";

interface cardProps {
  cvc: string;
  cardNumber: string;
  holderName: string;
  month: string;
  year: string;
}

export default function CardsComponent(props: cardProps) {
  return (
    <div className="cards-container">
      <div className="back-card">
        <img src={backCard} alt="back of the card" />
        <span>{props.cvc || "000"}</span>
      </div>
      <div className="front-card">
        <img src={frontCard} alt="front of the card" />
        <div className="card-details">
          <img id="logo" src={cardLogo} alt="logo of the card" />
          <span>
            {props.cardNumber === "" ? "0000 0000 0000 0000" : props.cardNumber}
          </span>
          <div className="info">
            <span>
              {props.holderName === "" ? "Jane Appleseed" : props.holderName}
            </span>
            <span>
              {props.month || "00"}/{props.year || "00"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
