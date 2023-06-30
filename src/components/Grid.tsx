type TileKind = "mine" | "empty";

interface Position {
  x: number;
  y: number;
}

interface Tile {
  pos: Position;
  kind: TileKind;
  content: number | string;
}

interface GridProps {
  tiles: Tile[];
}

export function Grid(props: GridProps) {
  return (
    <div className="grid">
      {props.tiles.map((tile) => {
        return (
          <div
            key={`${tile.pos.y},${tile.pos.y}`}
            className={calcTileClass(tile)}
          >
            {tile.content}
          </div>
        );
      })}
    </div>
  );
}

export function generateTiles(
  width: number,
  height: number,
  mineChance: number
): Tile[] {
  const tileArray = [];

  for (let [i, j] = [0, 0]; i < width && j < height; j++) {
    const kind = randomMine(mineChance);
    const pos = { x: i, y: j };
    const content = kind === "mine" ? "💣" : 0;
    tileArray.push({ pos, kind, content });

    if (j === height - 1) {
      j = -1;
      i++;
    }
  }

  return updateMineCount(tileArray);
}

function randomMine(odds: number): TileKind {
  return Math.random() <= odds / 100 ? "mine" : "empty";
}

function updateMineCount(tileArray: Tile[]) {
  for (const tile of tileArray) {
    if (tile.kind === "mine") {
      continue;
    }

    tile.content = calcNearbyMines(tile, tileArray);
  }

  return tileArray;
}

function calcNearbyMines(currTile: Tile, tiles: Tile[]): number | "" {
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
    const offsetX = currTile.pos.x + offset[0];
    const offsetY = currTile.pos.y + offset[1];

    const nearbyTile = tiles.find(
      (tile) => tile.pos.x === offsetX && tile.pos.y === offsetY
    );

    if (nearbyTile && nearbyTile.kind === "mine") {
      mineCount++;
    }
  }

  return mineCount === 0 ? "" : mineCount;
}

function calcTileClass(tile: Tile): string {
  if (tile.content === "") {
    return "tile";
  }

  if (tile.kind === "mine") {
    return "tile mine";
  }

  return `tile tile-${tile.content}`;
}
