import { useState } from "react";
import "./App.css";
import backCard from "./assets/bg-card-back.png";
import frontCard from "./assets/bg-card-front.png";
import cardLogo from "./assets/card-logo.svg";
import iconComplete from "./assets/icon-complete.svg";

const initialErrors = {
  nameCantBeBlank: "",
  numberCantBeBlank: "",
  dateCantBeBlank: "",
  cvcCantBeBlank: "",
  cantBeNumber: "",
  cvcIsShort: "",
  numberTooShort: "",
};

function App() {
  const [holderName, setHolderName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [error, setError] = useState(initialErrors);
  const [isValid, setIsValid] = useState(false);

  const updateName = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setHolderName(val);
  };

  const updateCardNumber = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    // Remove any non-numeric characters
    const formattedValue = value.replace(/\D/g, "");

    // Add a space after every 4 characters
    const newValue = formattedValue.replace(/(.{4})/g, "$1 ").trim();

    setCardNumber(newValue);
  };

  const updateMonth = (e: React.FormEvent<HTMLInputElement>) => {
    let { value } = e.currentTarget;
    // Allow only numeric characters
    value = value.replace(/\D/g, "");
    if (parseInt(value) > 12) {
      value = "12";
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
      value = "999";
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

  const isTooShortCvc = (cvc: string) => {
    if (cvc.length < 3) {
      setError((prev) => ({
        ...prev,
        cvcIsShort: "CVC is too short",
        cvcCantBeBlank: "",
      }));
      setIsValid(false);
    }
  };

  const numberIsShort = (number: string) => {
    if (number.length < 19) {
      setError((prev) => ({
        ...prev,
        numberTooShort: "Number is too short",
      }));
      setIsValid(false);
    }
  };

  const handleClick = () => {
    setError(initialErrors); //reset errors to each click

    // let isValid = true;
    setIsValid(true);

    if (!isNotEmpty(holderName)) {
      setError((prevErrors) => ({
        ...prevErrors,
        nameCantBeBlank: "holder Can't be blank",
      }));
      // isValid = false;
      setIsValid(false);
    }
    if (!isNotEmpty(cardNumber)) {
      setError((prevErrs) => ({
        ...prevErrs,
        numberCantBeBlank: "Can't be blank",
      }));
      // isValid = false;
      setIsValid(false);
    } else {
      numberIsShort(cardNumber);
    }

    if (!isNotEmpty(month) || !isNotEmpty(year)) {
      setError((prevErrs) => ({
        ...prevErrs,
        dateCantBeBlank: "Can't be blank",
      }));
      // isValid = false;
      setIsValid(false);
    }

    if (!isNotEmpty(cvc)) {
      setError((prevErrs) => ({
        ...prevErrs,
        cvcCantBeBlank: "Can't be blank",
      }));
      // isValid = false;
      setIsValid(false);
    } else {
      isTooShortCvc(cvc);
    }

    isNotNumber(holderName);
    isNotCharacter(cardNumber);

    console.log(isValid);
    return isValid;
  };

  const handleReset = () => {
    setIsValid(false);
    setHolderName("");
    setCardNumber("");
    setMonth("");
    setYear("");
    setCvc("");
    setError(initialErrors);
  };

  return (
    <div className="app">
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

      {isValid ? (
        <div className="thank-you">
          <img src={iconComplete} alt="" />
          <h1>THANK YOU!</h1>
          <p>We’ve added your card details</p>
          <button className="confirm thanks" onClick={handleReset}>
            Continue
          </button>
        </div>
      ) : (
        <div className="input-div">
          <form>
            <div>
              <label htmlFor="holder">Cardholder Name</label>
              <input
                onChange={updateName}
                id="holder"
                type="text"
                placeholder="e.g. Jane Appleseed"
              />
              {error.nameCantBeBlank && (
                <span className="error">{error.nameCantBeBlank}</span>
              )}
              {error.cantBeNumber && (
                <span className="error">{error.cantBeNumber}</span>
              )}
            </div>
            <div>
              <label htmlFor="cardNumber">Card Number</label>
              <input
                value={cardNumber}
                placeholder="e.g. 1234 5678 9123 0000"
                onChange={updateCardNumber}
                maxLength={19}
                id="cardNumber"
                type="text"
              />
              {(error.numberCantBeBlank && (
                <span className="error">{error.numberCantBeBlank}</span>
              )) ||
                (error.numberTooShort && (
                  <span className="error">{error.numberTooShort}</span>
                ))}
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
                  placeholder="MM"
                />

                <input
                  value={year}
                  onChange={updateYear}
                  id="yy"
                  type="text"
                  maxLength={2}
                  placeholder="YY"
                />
                {error.dateCantBeBlank && (
                  <span className="error">{error.dateCantBeBlank}</span>
                )}
              </div>
              <div>
                <label htmlFor="cvc">cvc</label>
                <input
                  value={cvc}
                  onChange={updateCvc}
                  id="cvc"
                  type="text"
                  maxLength={3}
                  placeholder="e.g. 123"
                />
                {(error.cvcCantBeBlank && (
                  <span className="error">{error.cvcCantBeBlank}</span>
                )) ||
                  (error.cvcIsShort && (
                    <span className="error">{error.cvcIsShort}</span>
                  ))}
              </div>
            </div>
          </form>
          <button onClick={handleClick} className="confirm">
            confirm
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
