import {
  Cell,
  generateCells,
  getUpdatedHiddenCell,
  getUpdatedFlagCell,
} from "../utils/createGrid";
import { calcCellClass } from "../utils/cellStyle";
import { useReducer } from "react";

type CellsReducerType = "toggle_flag" | "toggle_hidden" | "restart_game";

interface GridProps {
  width: number;
  height: number;
  mineChance: number;
}

export function Grid({ width, height, mineChance }: GridProps): JSX.Element {
  const [cellsState, cellsDispatch] = useReducer(cellsReducer, [], () =>
    generateCells(width, height, mineChance)
  );

  function cellsReducer(
    state: Cell[],
    action: { type: CellsReducerType; id?: number }
  ) {
    switch (action.type) {
      case "restart_game":
        return generateCells(width, height, mineChance);
      case "toggle_flag":
        return state.map((cell) =>
          cell.id === action.id ? getUpdatedFlagCell(cell) : cell
        );
      case "toggle_hidden":
        return state.map((cell) =>
          cell.id === action.id ? getUpdatedHiddenCell(cell) : cell
        );
      default:
        return state;
    }
  }

  const handleClick = (cell: Cell) => {
    if (cell.isMine) {
      // TODO: Handle loss

      alert("You lose");
      cellsDispatch({ type: "restart_game" });
    } else {
      cellsDispatch({ type: "toggle_hidden", id: cell.id });

      // TODO: Check win
      // TODO: Handle win
    }
  };

  return (
    <div className="grid" onContextMenu={(e) => e.preventDefault()}>
      {cellsState.map((cell) => {
        return (
          <div
            key={cell.id}
            className={calcCellClass(cell)}
            onClick={() => handleClick(cell)}
            onKeyDown={() => handleClick(cell)}
            onContextMenu={(e) => {
              e.preventDefault();
              cellsDispatch({ type: "toggle_flag", id: cell.id });
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
