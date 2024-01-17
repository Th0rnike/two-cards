import iconComplete from "../assets/icon-complete.svg";

interface thankYouInterface {
  setIsValid: (val: boolean) => void;
  setHolderName: (val: string) => void;
  setCardNumber: (val: string) => void;
  setMonth: (val: string) => void;
  setYear: (val: string) => void;
  setCvc: (val: string) => void;
}

export default function ThankYou(props: thankYouInterface) {
  const handleReset = () => {
    props.setIsValid(false);
    props.setHolderName("");
    props.setCardNumber("");
    props.setMonth("");
    props.setYear("");
    props.setCvc("");
  };

  return (
    <div className="thank-you">
      <img src={iconComplete} alt="" />
      <h1>THANK YOU!</h1>
      <p>We’ve added your card details</p>
      <button className="confirm thanks" onClick={handleReset}>
        Continue
      </button>
    </div>
  );
}
