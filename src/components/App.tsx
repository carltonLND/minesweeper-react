import { Grid, generateTiles } from "./Grid";
import { useMemo } from "react";
import "./App.css";

const width = 10;
const height = 10;
const mineChance = 15;

function App() {
  const tiles = useMemo(() => generateTiles(width, height, mineChance), []);

  return (
    <div className="App">
      <Grid tiles={tiles} />
    </div>
  );
}

export default App;
