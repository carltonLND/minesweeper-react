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

function calcNearbyMines(cellPos: Position, cells: Cell[]): number {
  const tileOffsets: [number, number][] = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  let mineCount = 0;

  for (const offset of tileOffsets) {
    const offsetX = cellPos.x + offset[0];
    const offsetY = cellPos.y + offset[1];

    const nearbyCell = cells.find(
      (cell) => cell.pos.x === offsetX && cell.pos.y === offsetY
    );

    if (nearbyCell !== undefined && nearbyCell.isMine) {
      mineCount++;
    }
  }

  return mineCount;
}
