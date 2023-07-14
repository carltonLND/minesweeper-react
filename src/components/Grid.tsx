import { Cell } from "../utils/createGrid";
import { calcCellClass } from "../utils/cellStyle";

export function Grid({
  cells,
  handleLeftClick,
  handleRightClick,
}: {
  cells: Cell[];
  handleLeftClick?: (cell: Cell) => void;
  handleRightClick?: (cell: Cell) => void;
}): JSX.Element {
  return (
    <div className="grid" onContextMenu={(e) => e.preventDefault()}>
      {cells.map((cell) => {
        return (
          <div
            key={cell.id}
            className={calcCellClass(cell)}
            onClick={() => {
              if (handleLeftClick !== undefined) {
                handleLeftClick(cell);
              }
            }}
            onKeyDown={() => {
              if (handleLeftClick !== undefined) {
                handleLeftClick(cell);
              }
            }}
            onContextMenu={(e) => {
              if (handleRightClick !== undefined) {
                e.preventDefault();
                handleRightClick(cell);
              }
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
