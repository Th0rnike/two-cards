import "./App.css";
import backCard from "./assets/bg-card-back.png";
import frontCard from "./assets/bg-card-front.png";

function App() {
  return (
    <div className="cards-container">
      <div className="back-card">
        <img src={backCard} alt="" />
        <span>000</span>
      </div>
      <div className="front-card">
        <img src={frontCard} alt="" />
        <span>0000 0000 0000 0000</span>
      </div>
    </div>
  );
}

export default App;
