import { Grid } from "./Grid";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Grid width={10} height={10} mineChance={25} />
    </div>
  );
}

export default App;
