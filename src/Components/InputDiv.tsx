import CardNumber from "./CardNumber";
import ExpirationDates from "./ExpirationDates";
import HolderName from "./Holdername";

interface inputDivInterface {
  updateName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cardNumber: string;
  updateCardNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
  month: string;
  updateMonth: (e: React.ChangeEvent<HTMLInputElement>) => void;
  year: string;
  updateYear: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cvc: string;
  updateCvc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: InputErrors;
  handleClick: () => boolean;
}

interface InputErrors {
  nameCantBeBlank?: string;
  numberCantBeBlank?: string;
  dateCantBeBlank?: string;
  cvcCantBeBlank?: string;
  cantBeNumber?: string;
  cvcIsShort?: string;
  numberTooShort?: string;
}

const InputDiv: React.FC<inputDivInterface> = ({
  updateName,
  cardNumber,
  updateCardNumber,
  cvc,
  month,
  updateCvc,
  updateMonth,
  updateYear,
  year,
  error,
  handleClick,
}) => {
  return (
    <div className="input-div">
      <form>
        <HolderName error={error} updateName={updateName} />
        <CardNumber
          cardNumber={cardNumber}
          error={error}
          updateCardNumber={updateCardNumber}
        />
        <ExpirationDates
          cvc={cvc}
          error={error}
          month={month}
          updateCvc={updateCvc}
          updateMonth={updateMonth}
          updateYear={updateYear}
          year={year}
        />
      </form>
      <button onClick={handleClick} className="confirm">
        confirm
      </button>
    </div>
  );
};

export default InputDiv;
