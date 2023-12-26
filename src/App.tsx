import "./App.css";
import backCard from "./assets/bg-card-back.png";
import frontCard from "./assets/bg-card-front.png";
import cardLogo from "./assets/card-logo.svg";

function App() {
  return (
    <div className="cards-container">
      <div className="back-card">
        <img src={backCard} alt="" />
        <span>000</span>
      </div>
      <div className="front-card">
        <img src={frontCard} alt="" />
        <div className="card-details">
          <img id="logo" src={cardLogo} alt="" />
          <span>0000 0000 0000 0000</span>
          <div className="info">
            <span>jane appleseed</span>
            <span>00/00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
