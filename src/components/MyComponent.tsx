interface IPosition {
  x: number;
  y: number;
}

interface ITile {
  pos: IPosition;
}

interface TileProps {
  tile: ITile;
}

export function Tile({ tile }: TileProps): JSX.Element {
  return (
    <div>
      {tile.pos.x}, {tile.pos.y}
    </div>
  );
}
