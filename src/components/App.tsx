import {
  Cell,
  generateCells,
  updatedFlagCell as getUpdatedFlagCell,
  updatedHiddenCell as getUpdatedHiddenCell,
} from "../utils/createGrid";
import { Grid } from "./Grid";
import { useState } from "react";
import "./App.css";

const width = 10;
const height = 10;
const mineChance = 20;

function App() {
  const [cells, setCells] = useState(generateCells(width, height, mineChance));

  const handleRightClick = (cell: Cell) => {
    setCells((prev) => {
      const newCells = [...prev];
      newCells[cell.id] = getUpdatedFlagCell(cell);

      return newCells;
    });
  };

  const handleLeftClick = (cell: Cell) => {
    if (cell.isMine) {
      // TODO: Handle loss

      setCells(generateCells(width, height, mineChance));
    } else {
      setCells((prev) => {
        const newCells = [...prev];
        newCells[cell.id] = getUpdatedHiddenCell(cell);

        return newCells;
      });

      // TODO: Check win
      // TODO: Handle win
    }
  };

  return (
    <div className="App">
      <div className="grid-container">
        <Grid
          cells={cells}
          handleRightClick={handleRightClick}
          handleLeftClick={handleLeftClick}
        />
      </div>
    </div>
  );
}

export default App;
