import { Cell } from "../utils/createGrid";

export function Grid({ cells }: { cells: Cell[] }): JSX.Element {
  return (
    <div className="grid">
      {cells.map((cell) => {
        return (
          <div
            key={`${cell.pos.x},${cell.pos.y}`}
            className={`cell ${cell.isMine ? "mine" : ""}`}
          >
            {!cell.isMine && cell.nearbyMines > 0 && cell.nearbyMines}
          </div>
        );
      })}
    </div>
  );
}
