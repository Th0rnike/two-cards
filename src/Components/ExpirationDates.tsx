interface expDatesInterface {
  month: string;
  updateMonth: (e: React.ChangeEvent<HTMLInputElement>) => void;
  year: string;
  updateYear: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cvc: string;
  updateCvc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: errorInterface;
}

interface errorInterface {
  dateCantBeBlank?: string;
  cvcCantBeBlank?: string;
  cvcIsShort?: string;
}

const ExpirationDates: React.FC<expDatesInterface> = ({
  month,
  year,
  cvc,
  updateMonth,
  updateYear,
  updateCvc,
  error,
}) => {
  return (
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
  );
};

export default ExpirationDates;
