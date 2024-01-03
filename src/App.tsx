import { useState } from "react";
import "./App.css";
import backCard from "./assets/bg-card-back.png";
import frontCard from "./assets/bg-card-front.png";
import cardLogo from "./assets/card-logo.svg";

const initialErrors = {
  nameCantBeBlank: "",
  numberCantBeBlank: "",
  monthCantBeBlank: "",
  yearCantBeBlank: "",
  cvcCantBeBlank: "",
  cantBeNumber: "",
  cantBeChar: "",
};

function App() {
  const [holderName, setHolderName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setCvc] = useState("");

  const [error, setError] = useState(initialErrors);

  const updateName = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setHolderName(val);
  };

  const updateCardNumber = (e: React.FormEvent<HTMLInputElement>) => {
    let { value } = e.currentTarget;
    const formattedValue = formattedNumber(value);
    value = value.replace(/(.{4})/g, "$1 ");
    setCardNumber(formattedValue);
  };

  const formattedNumber = (value: string) => {
    //remove any non numeric values
    const formattedValue = value.replace(/\D/g, "");

    //add a space after every 4 characters
    const result = formattedValue.replace(/(.{4})/g, "$1 ");
    return result;
  };

  const updateMonth = (e: React.FormEvent<HTMLInputElement>) => {
    let { value } = e.currentTarget;
    // Allow only numeric characters
    value = value.replace(/\D/g, "");
    if (parseInt(value) > 12) {
      value = 12;
    }
    setMonth(value); // Update state with the current value
  };

  const updateYear = (e: React.FormEvent<HTMLInputElement>) => {
    let { value } = e.currentTarget;
    // Allow only numeric characters
    value = value.replace(/\D/g, "");
    setYear(value); // Update state with the current value
  };

  const updateCvc = (e: React.FormEvent<HTMLInputElement>) => {
    let { value } = e.currentTarget;
    value = value.replace(/\D/g, "");
    if (parseInt(value) > 999) {
      value = 999;
    }
    setCvc(value);
  };

  const isNotEmpty = (str: string) => str.trim().length > 0;

  const isNotNumber = (holderName: string) => {
    const regex = /^[A-Za-z ]*$/;
    if (!regex.test(holderName)) {
      setError((prevErrors) => ({
        ...prevErrors,
        cantBeNumber: "Holder name can't contain numbers",
      }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        cantBeNumber: "",
      }));
    }
  };

  const isNotCharacter = (cardNumber: string) => {
    const regex = /^[0-9 ]*$/;
    if (!regex.test(cardNumber)) {
      setError((prevErrors) => ({
        ...prevErrors,
        cantBeChar: "Wrong format, numbers only",
      }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        cantBeChar: "",
      }));
    }
  };

  const handleClick = () => {
    setError(initialErrors); //reset errors to each click

    let isValid = true;

    if (!isNotEmpty(holderName)) {
      setError((prevErrors) => ({
        ...prevErrors,
        nameCantBeBlank: "holder Can't be blank",
      }));
      isValid = false;
    }
    if (!isNotEmpty(cardNumber)) {
      setError((prevErrs) => ({
        ...prevErrs,
        numberCantBeBlank: "Can't be blank",
      }));
      isValid = false;
    }

    if (!isNotEmpty(month)) {
      setError((prevErrs) => ({
        ...prevErrs,
        monthCantBeBlank: "Can't be blank",
      }));
      isValid = false;
    }
    if (!isNotEmpty(year)) {
      setError((prevErrs) => ({
        ...prevErrs,
        yearCantBeBlank: "Can't be blank",
      }));
      isValid = false;
    }
    if (!isNotEmpty(cvc)) {
      setError((prevErrs) => ({
        ...prevErrs,
        cvcCantBeBlank: "Can't be blank",
      }));
      isValid = false;
    }

    isNotNumber(holderName);
    isNotCharacter(cardNumber);

    console.log(isValid);
    return isValid;
  };

  return (
    <>
      <div className="cards-container">
        <div className="back-card">
          <img src={backCard} alt="back of the card" />
          <span>{cvc || "000"}</span>
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
              <span>
                {month || "00"}/{year || "00"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="input-div">
        <form>
          <div>
            <label htmlFor="holder">Cardholder Name</label>
            <input onChange={updateName} id="holder" type="text" />
            {error.nameCantBeBlank && <span>{error.nameCantBeBlank}</span>}
            {error.cantBeNumber && <span>{error.cantBeNumber}</span>}
          </div>
          <div>
            <label htmlFor="cardNumber">Card Number</label>
            <input
              value={cardNumber}
              placeholder="XXXX XXXX XXXX XXXX"
              onChange={updateCardNumber}
              maxLength={19}
              id="cardNumber"
              type="text"
            />
            {error.numberCantBeBlank && <span>{error.numberCantBeBlank}</span>}
            {error.cantBeChar && <span>{error.cantBeChar}</span>}
          </div>
          <div className="expiration-dates">
            <div>
              <label htmlFor="mm">exp. date (mm/yy)</label>
              <input
                value={month}
                onChange={updateMonth}
                id="mm"
                type="text"
                maxLength={2}
              />
              {error.monthCantBeBlank && <span>{error.monthCantBeBlank}</span>}
              <input
                onChange={updateYear}
                id="yy"
                type="text"
                value={year}
                maxLength={2}
              />
              {error.yearCantBeBlank && <span>{error.yearCantBeBlank}</span>}
            </div>
            <div>
              <label htmlFor="cvc">cvc</label>
              <input
                onChange={updateCvc}
                id="cvc"
                type="text"
                maxLength={3}
                minLength={3}
                value={cvc}
              />
            </div>
            {error.cvcCantBeBlank && <span>{error.cvcCantBeBlank}</span>}
          </div>
        </form>
        <button onClick={handleClick} className="confirm">
          confirm
        </button>
      </div>
    </>
  );
}

export default App;
