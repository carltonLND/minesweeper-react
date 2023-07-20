export type Cell = Mine | Tile;

export interface Mine {
  id: number;
  pos: Position;
  isHidden: boolean;
  isFlagged: boolean;
  isMine: true;
}

export interface Tile {
  id: number;
  pos: Position;
  isHidden: boolean;
  isFlagged: boolean;
  isMine: false;
  nearbyMines: number;
}

interface Position {
  x: number;
  y: number;
}

export function generateCells({
  width,
  height,
  mineChance,
}: {
  width: number;
  height: number;
  mineChance: number;
}): Cell[] {
  const cells: Cell[] = [];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const pos: Position = { x, y };
      const newCell: Cell = randomIsMine(mineChance)
        ? createNewMine(pos, cells.length)
        : createNewTile(pos, cells.length);

      cells.push(newCell);
    }
  }

  return updateNearbyMineCounts(cells);
}

function createNewTile(pos: Position, id: number): Tile {
  return {
    id,
    pos,
    isHidden: true,
    isFlagged: false,
    isMine: false,
    nearbyMines: 0,
  };
}

function createNewMine(pos: Position, id: number): Mine {
  return {
    id,
    pos,
    isHidden: true,
    isFlagged: false,
    isMine: true,
  };
}

function randomIsMine(odds: number): boolean {
  return Math.random() <= odds / 100;
}

export function updateNearbyMineCounts(cells: Cell[]) {
  cells.forEach((cell) => {
    if (!cell.isMine) {
      cell.nearbyMines = calcNearbyMines(cell.pos, cells);
    }
  });

  return cells;
}

function calcNearbyMines(currCellPos: Position, cells: Cell[]): number {
  let mineCount = 0;

  for (let x = -1; x < 2; x++) {
    for (let y = -1; y < 2; y++) {
      if (x === 0 && y === 0) {
        continue;
      }

      const offsetX = currCellPos.x + x;
      const offsetY = currCellPos.y + y;

      const nearbyCell = cells.find(
        (cell) => cell.pos.x === offsetX && cell.pos.y === offsetY
      );

      if (nearbyCell !== undefined && nearbyCell.isMine) {
        mineCount++;
      }
    }
  }

  return mineCount;
}

export function getUpdatedFlagCell(cell: Cell): Cell {
  return {
    ...cell,
    pos: {
      ...cell.pos,
    },
    isFlagged: cell.isHidden ? (cell.isFlagged ? false : true) : false,
  };
}

export function getUpdatedHiddenCell(cell: Cell): Cell {
  return {
    ...cell,
    pos: {
      ...cell.pos,
    },
    isHidden: cell.isFlagged ? true : false,
  };
}

export function getCellsToReveal(cellArray: Cell[], clickedCell: Cell): Cell[] {
  const checkedCells = new Set<Cell>();

  function filterCells(cell: Cell) {
    checkedCells.add(cell);

    if (!cell.isMine && cell.nearbyMines !== 0) {
      return [cell];
    }

    const cellsToReveal = cellArray.filter((t) => {
      if (checkedCells.has(t)) {
        return false;
      }

      const offsetX = Math.abs(t.pos.x - cell.pos.x);
      const offsetY = Math.abs(t.pos.y - cell.pos.y);

      return offsetX <= 1 && offsetY <= 1;
    });

    for (const filteredCell of cellsToReveal) {
      if (!filteredCell.isMine && filteredCell.nearbyMines === 0) {
        cellsToReveal.push(...filterCells(filteredCell));
      }
    }

    return cellsToReveal;
  }

  return filterCells(clickedCell);
}
