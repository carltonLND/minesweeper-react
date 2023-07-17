import { Grid } from "./Grid";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="grid-container">
        <Grid width={10} height={10} mineChance={30} />
      </div>
    </div>
  );
}

export default App;
