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

const make_piece = (...a) =>
  _.zipObject(_.split('shapeI orientation x y', ' '), a);
const pieces = [
  make_piece(0,0,5,2),
  make_piece(0,1,2,3),
  make_piece(1,0,1,7),
  make_piece(1,1,7,9),
];
let livePiece = null;

const render = () => {
  for (const piece of pieces) {
    log(piece);
  }
  for (let y=0; y<20; y++) {
    for (let x=0; x<10; x++) {
      piece = _.find(pieces, (piece) => x==piece.x && y==piece.y);
      write(piece ? ''+piece.shapeI : '·');
    }
    write('\n');
  }
}

render();
