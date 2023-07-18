import { Cell } from "./createGrid";

export type CellReducerAction = UpdateCellAction | RestartGameAction;

interface RestartGameAction {
  type: "restart_game";
  newCells: Cell[];
}

interface UpdateCellAction {
  type: "update_cell";
  id: number;
  updatedCell: Cell;
}

export const cellReducer = (state: Cell[], action: CellReducerAction) => {
  switch (action.type) {
    case "restart_game":
      return action.newCells;
    case "update_cell":
      return state.map((cell) =>
        cell.id === action.id ? action.updatedCell : cell
      );
    default:
      throw new Error("Reducer action case not covered!");
  }
};
