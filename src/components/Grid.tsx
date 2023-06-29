import { Tile } from "./Tile";

interface GridProps {
  width: number;
  height: number;
  mineChance: number;
}

export function Grid(props: GridProps) {
  return <div className="grid">{generateTiles(props)}</div>;
}

function generateTiles({ width, height, mineChance }: GridProps) {
  const tileArray = [];

  for (let [i, j] = [0, 0]; i < width && j < height; j++) {
    tileArray.push(
      <Tile
        key={`${i}:${j}`}
        tile={{ pos: { x: i, y: j }, isMine: randomMine(mineChance) }}
      />
    );

    if (j === height - 1) {
      j = -1;
      i++;
    }
  }

  return tileArray;
}

function randomMine(odds: number): boolean {
  return Math.random() <= odds / 100;
}
