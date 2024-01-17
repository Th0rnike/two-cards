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
  );
};

export default InputDiv;
