interface nameInterface {
  updateName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: errorInterface;
}

interface errorInterface {
  nameCantBeBlank?: string;
  cantBeNumber?: string;
}

const HolderName: React.FC<nameInterface> = ({ updateName, error }) => {
  return (
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
  );
};

export default HolderName;
