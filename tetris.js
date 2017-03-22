// tetris

const log = console.log
const write = (...a) => process.stdout.write(...a)
const _=require('lodash');
// const grid = _.times(20,()=>_.times(10,()=>null));
// console.log(grid);

const shapes = [
  [[0,0],[1,0],[2,0],[3,0],],
  [[0,0],[1,0],
   [1,0],[1,1],],
];
const pieces = [
  {shape: shapes[0], orientation: 0, x:5, y:2},
  {shape: shapes[0], orientation: 1, x:5, y:3},
  {shape: shapes[1], orientation: 0, x:1, y:7},
  {shape: shapes[1], orientation: 0, x:7, y:9},
];
let livePiece = null;

const render = () => {
  for (const piece of pieces) {
    log(piece);
  }
  for (let y=0; y<20; y++) {
    for (let x=0; x<10; x++) {
      for (const piece of pieces) {
        write(x==piece.x && y==piece.y ? '•' : ' ');
      }
    }
    write('\n');
  }
}

render();
