import { Mine } from "./Mine";

interface IPosition {
  x: number;
  y: number;
}

interface ITile {
  pos: IPosition;
  isMine: boolean;
}

interface TileProps {
  tile: ITile;
}

export function Tile({ tile }: TileProps): JSX.Element {
  if (tile.isMine) {
    return <Mine />;
  }
  return <div className="tile"></div>;
}
