import { useEffect, useState } from "react";
import "./App.css";
import backCard from "./assets/bg-card-back.png";
import frontCard from "./assets/bg-card-front.png";
import cardLogo from "./assets/card-logo.svg";

function App() {
  const [holderName, setHolderName] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardNumberError, setCardNumberError] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);

  const updateName = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setHolderName(val);
  };

  const updateCardNumber = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setCardNumber(val);
  };

  useEffect(() => {
    if (confirm) {
      const isValid = checkName(holderName) && checkCardNumber(cardNumber);
      console.log("useEffect validation check: " + isValid);
      setConfirm(false);
    }
  }, [confirm]);

  const checkName = (input: string): boolean => {
    // Regular expression to match alphabets and spaces only
    const regex = /^[a-zA-Z\s]*$/;
    const isValid = regex.test(input);
    setNameError(!isValid);
    return isValid;
  };

  const checkCardNumber = (input: string): boolean => {
    const regex = /^[0-9]*$/;
    const isValid = regex.test(input);
    setCardNumberError(!isValid);
    return isValid;
  };

  // const showEmptyError = (): boolean => {
  //   const isEmprty = holderName === "" || cardNumber === "";
  //   return isEmprty;
  // };

  // to throw error messages on the display afrer the confirm button is clicked
  const handleConfirm = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    setConfirm(true);
  };

  return (
    <>
      <div className="cards-container">
        <div className="back-card">
          <img src={backCard} alt="back of the card" />
          <span>000</span>
        </div>
        <div className="front-card">
          <img src={frontCard} alt="front of the card" />
          <div className="card-details">
            <img id="logo" src={cardLogo} alt="logo of the card" />
            <span>
              {cardNumber === "" ? "0000 0000 0000 0000" : cardNumber}
            </span>
            <div className="info">
              <span>{holderName === "" ? "Jane Appleseed" : holderName}</span>
              <span>00/00</span>
            </div>
          </div>
        </div>
      </div>
      <div className="input-div">
        <form>
          <div>
            <label htmlFor="holder">Cardholder Name</label>
            <input onChange={updateName} id="holder" type="text" />
            <p>{nameError ? "Username not valid" : ""}</p>
          </div>
          <div>
            <label htmlFor="cardNumber">Card Number</label>
            <input onChange={updateCardNumber} id="cardNumber" type="text" />
            <p>
              {cardNumberError === true ? "Wrong format, use numbers only" : ""}
            </p>
          </div>
          <div className="expiration-dates">
            <div>
              <label htmlFor="mm">exp. date (mm/yy)</label>
              <input id="mm" type="number" />
              <input id="yy" type="number" />
            </div>
            <div>
              <label htmlFor="cvc">cvc</label>
              <input id="cvc" type="number" />
            </div>
          </div>
        </form>
        <button className="confirm" onClick={handleConfirm}>
          confirm
        </button>
      </div>
    </>
  );
}

export default App;
