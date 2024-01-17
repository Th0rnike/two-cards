interface numberInterface {
  cardNumber: string;
  updateCardNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: errorInterface;
}

interface errorInterface {
  numberCantBeBlank?: string;
  numberTooShort?: string;
}

const CardNumber: React.FC<numberInterface> = ({
  cardNumber,
  updateCardNumber,
  error,
}) => {
  return (
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
  );
};

export default CardNumber;
