import { updateNearbyMineCounts, Cell } from "./createGrid";

test("test correct nearby mine counts, 3x3 grid", () => {
  const testGrid3x3BeforeNearbyMinesSet: Cell[] = [
    { pos: { x: 0, y: 0 }, isHidden: true, isFlagged: false, isMine: true },
    {
      pos: { x: 0, y: 1 },
      isHidden: true,
      isFlagged: false,
      isMine: false,
      nearbyMines: 0,
    },
    { pos: { x: 0, y: 2 }, isHidden: true, isFlagged: false, isMine: true },
    {
      pos: { x: 1, y: 0 },
      isHidden: true,
      isFlagged: false,
      isMine: false,
      nearbyMines: 0,
    },
    {
      pos: { x: 1, y: 1 },
      isHidden: true,
      isFlagged: false,
      isMine: false,
      nearbyMines: 0,
    },
    {
      pos: { x: 1, y: 2 },
      isHidden: true,
      isFlagged: false,
      isMine: false,
      nearbyMines: 0,
    },
    {
      pos: { x: 2, y: 0 },
      isHidden: true,
      isFlagged: false,
      isMine: false,
      nearbyMines: 0,
    },
    {
      pos: { x: 2, y: 1 },
      isHidden: true,
      isFlagged: false,
      isMine: false,
      nearbyMines: 0,
    },
    {
      pos: { x: 2, y: 2 },
      isHidden: true,
      isFlagged: false,
      isMine: false,
      nearbyMines: 0,
    },
  ];

  const testGrid3x3: Cell[] = [
    { pos: { x: 0, y: 0 }, isHidden: true, isFlagged: false, isMine: true },
    {
      pos: { x: 0, y: 1 },
      isHidden: true,
      isFlagged: false,
      isMine: false,
      nearbyMines: 2,
    },
    { pos: { x: 0, y: 2 }, isHidden: true, isFlagged: false, isMine: true },
    {
      pos: { x: 1, y: 0 },
      isHidden: true,
      isFlagged: false,
      isMine: false,
      nearbyMines: 1,
    },
    {
      pos: { x: 1, y: 1 },
      isHidden: true,
      isFlagged: false,
      isMine: false,
      nearbyMines: 2,
    },
    {
      pos: { x: 1, y: 2 },
      isHidden: true,
      isFlagged: false,
      isMine: false,
      nearbyMines: 1,
    },
    {
      pos: { x: 2, y: 0 },
      isHidden: true,
      isFlagged: false,
      isMine: false,
      nearbyMines: 0,
    },
    {
      pos: { x: 2, y: 1 },
      isHidden: true,
      isFlagged: false,
      isMine: false,
      nearbyMines: 0,
    },
    {
      pos: { x: 2, y: 2 },
      isHidden: true,
      isFlagged: false,
      isMine: false,
      nearbyMines: 0,
    },
  ];

  const resultCells = updateNearbyMineCounts(testGrid3x3BeforeNearbyMinesSet);
  expect(testGrid3x3BeforeNearbyMinesSet).toStrictEqual(testGrid3x3);
  expect(resultCells).toBe(testGrid3x3BeforeNearbyMinesSet);
});
