import { Cell } from "../utils/createGrid";
import { calcCellClass } from "../utils/cellStyle";

export function Grid({ cells }: { cells: Cell[] }): JSX.Element {
  return (
    <div className="grid">
      {cells.map((cell) => {
        return (
          <div
            key={`${cell.pos.x},${cell.pos.y}`}
            className={calcCellClass(cell)}
          >
            {!cell.isMine && cell.nearbyMines > 0 && cell.nearbyMines}
          </div>
        );
      })}
    </div>
  );
}
