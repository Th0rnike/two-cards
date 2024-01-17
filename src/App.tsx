import { useState } from "react";
import "./App.css";
import CardsComponent from "./Components/CardsComponent";
import ThankYou from "./Components/ThankYou";
import InputDiv from "./Components/InputDiv";

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
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [cvc, setCvc] = useState<string>("");
  const [error, setError] = useState(initialErrors);
  const [isValid, setIsValid] = useState(false);

  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setHolderName(val);
  };

  const updateCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    // Remove any non-numeric characters
    const formattedValue = value.replace(/\D/g, "");

    // Add a space after every 4 characters
    const newValue = formattedValue.replace(/(.{4})/g, "$1 ").trim();

    setCardNumber(newValue);
  };

  const updateMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.currentTarget;
    // Allow only numeric characters
    value = value.replace(/\D/g, "");
    if (parseInt(value) > 12) {
      value = "12";
    }
    setMonth(value); // Update state with the current value
  };

  const updateYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.currentTarget;
    // Allow only numeric characters
    value = value.replace(/\D/g, "");
    setYear(value); // Update state with the current value
  };

  const updateCvc = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className="app">
      <CardsComponent
        cardNumber={cardNumber}
        cvc={cvc}
        holderName={holderName}
        month={month}
        year={year}
      />

      {isValid ? (
        <ThankYou
          setCardNumber={setCardNumber}
          setCvc={setCvc}
          setHolderName={setHolderName}
          setIsValid={setIsValid}
          setMonth={setMonth}
          setYear={setYear}
        />
      ) : (
        <InputDiv
          updateName={updateName}
          updateCardNumber={updateCardNumber}
          updateCvc={updateCvc}
          updateMonth={updateMonth}
          updateYear={updateYear}
          cardNumber={cardNumber}
          cvc={cvc}
          month={month}
          year={year}
          error={error}
          handleClick={handleClick}
        />
      )}
    </div>
  );
}

export default App;
