import { Cell } from "./createGrid";

export function calcCellClass(cell: Cell): string {
  let cellClass = "cell";
  if (cell.isMine) {
    cellClass += " mine";
  } else cellClass += ` nearby-${cell.nearbyMines}`;

  if (cell.isFlagged) {
    cellClass += " flagged";
  }

  if (cell.isHidden) {
    cellClass += " hidden";
  }

  return cellClass;
}
