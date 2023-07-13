import { generateCells } from "../utils/createGrid";
import { Grid } from "./Grid";
import { useMemo } from "react";
import "./App.css";

const width = 10;
const height = 10;
const mineChance = 20;

function App() {
  const cells = useMemo(() => generateCells(width, height, mineChance), []);

  return (
    <div className="App">
      <div className="grid-container">
        <Grid cells={cells} />
      </div>
    </div>
  );
}

export default App;
