import {
  Cell,
  generateCells,
  getUpdatedHiddenCell,
  getUpdatedFlagCell,
} from "../utils/createGrid";
import { calcCellClass } from "../utils/cellStyle";
import { useState, useEffect, useReducer } from "react";
import { cellReducer } from "../utils/cellStateReducer";
import { GameState, isGameWin } from "../utils/evaluateGameState";

interface GameProps {
  width: number;
  height: number;
  mineChance: number;
}

export function Game({ width, height, mineChance }: GameProps): JSX.Element {
  const [gameState, setGameState] = useState<GameState>("playing");
  const [cellState, cellDispatch] = useReducer(
    cellReducer,
    { width, height, mineChance },
    generateCells
  );

  // TODO: Extract game logic
  const handleRestart = () => {
    cellDispatch({
      type: "restart_game",
      newCells: generateCells({ width, height, mineChance }),
    });
  };

  const handleLeftClick = (cell: Cell) => {
    cellDispatch({
      type: "update_cell",
      id: cell.id,
      updatedCell: getUpdatedHiddenCell(cell),
    });

    if (cell.isMine) {
      setGameState("loss");
      handleRestart();
    } else if (isGameWin(cellState, cell.id)) {
      setGameState("win");
      handleRestart();
    }
  };

  useEffect(() => {
    switch (gameState) {
      case "playing":
        return;
      case "win":
        alert("YOU WIN");
        break;
      case "loss":
        alert("YOU LOSE");
        break;
    }

    setGameState("playing");
  }, [gameState]);

  const handleRightClick = (cell: Cell) => {
    cellDispatch({
      type: "update_cell",
      id: cell.id,
      updatedCell: getUpdatedFlagCell(cell),
    });
  };

  return (
    <div className="grid" onContextMenu={(e) => e.preventDefault()}>
      {cellState.map((cell) => {
        return (
          <div
            key={cell.id}
            className={calcCellClass(cell)}
            onClick={() => handleLeftClick(cell)}
            onKeyDown={() => handleLeftClick(cell)}
            onContextMenu={(e) => {
              e.preventDefault();
              handleRightClick(cell);
            }}
            role="button"
            tabIndex={cell.id}
          >
            {cell.isFlagged
              ? "🚩"
              : cell.isHidden
              ? ""
              : cell.isMine
              ? "💣"
              : cell.nearbyMines > 0 && cell.nearbyMines}
          </div>
        );
      })}
    </div>
  );
}
