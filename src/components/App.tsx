import { Game } from "./Game";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="grid-container">
        <Game width={10} height={10} mineChance={20} />
      </div>
    </div>
  );
}

export default App;
