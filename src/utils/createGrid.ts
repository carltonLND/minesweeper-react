export type Cell = Mine | Tile;

interface Mine {
  pos: Position;
  isHidden: boolean;
  isFlagged: boolean;
  isMine: true;
}

interface Tile {
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

export function generateCells(
  width: number,
  height: number,
  mineChance: number
): Cell[] {
  const cells: Cell[] = [];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const pos: Position = { x, y };
      const newCell: Cell = randomIsMine(mineChance)
        ? createNewMine(pos)
        : createNewTile(pos);

      cells.push(newCell);
    }
  }

  updateNearbyMineCounts(cells);

  return cells;
}

function createNewTile(pos: Position): Tile {
  return {
    pos,
    isHidden: true,
    isFlagged: false,
    isMine: false,
    nearbyMines: 0,
  };
}

function createNewMine(pos: Position): Mine {
  return {
    pos,
    isHidden: true,
    isFlagged: false,
    isMine: true,
  };
}

function randomIsMine(odds: number): boolean {
  return Math.random() <= odds / 100;
}

function updateNearbyMineCounts(cells: Cell[]) {
  cells.forEach((cell) => {
    if (!cell.isMine) {
      cell.nearbyMines = calcNearbyMines(cell.pos, cells);
    }
  });
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
