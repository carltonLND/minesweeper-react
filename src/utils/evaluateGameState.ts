import { Cell } from "./createGrid";

export type GameState = "win" | "loss" | "playing";

export function isGameWin(gameCells: Cell[], updatedCellId: number): boolean {
  return gameCells.every((cell) => {
    if (cell.id === updatedCellId || cell.isMine) {
      return true;
    }

    return !cell.isHidden;
  });
}
