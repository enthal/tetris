// tetris

const log = console.log
const write = (...a) => process.stdout.write(...a)
const _=require('lodash');
// const grid = _.times(20,()=>_.times(10,()=>null));
// console.log(grid);

const stringedShapes = [
  ['xxxx'],
  ['xx',
   'xx'],
  ['xx ',
   ' xx'],
  [' xx',
   'xx '],
  ['x  ',
   'xxx'],
  [' x ',
   'xxx'],
  ['  x',
   'xxx'],
]
const shapes = _.map(stringedShapes, (ss)=> {
  r = []
  _.each(ss, (s,y) => _.each(s, (c,x) => {
      if (c=='x') r.push([x,y]); } ) )
  return r;
});
log(shapes);

const make_piece = (...a) =>
  _.zipObject(_.split('shapeI orientation x y', / +/), a);
const pieces = [
  make_piece(0,0,5,2),
  make_piece(1,0,1,5),
  make_piece(2,0,1,8),
  make_piece(3,0,5,12),
  make_piece(4,0,1,14),
  make_piece(5,0,6,16),
  make_piece(6,0,1,18),
];
let livePiece = null;

const overBoard = (cellF, rowEndF) => {
  for (let y=0; y<20; y++) {
    for (let x=0; x<20; x++) {
      cellF(x,y);
    }
    if (rowEndF) rowEndF(y);
  }
}
const isPieceHere = (piece, gx,gy) =>
  _.some(shapes[piece.shapeI], ([x,y]) => {
    [x,y] = [[x,y],[-y,x],[-x,-y],[y,-x]] [piece.orientation % 4];
    return gx == piece.x+x && gy == piece.y+y;
  });


const render = () => {
  for (const piece of pieces) {
    log(piece);
  }
  overBoard(
    (x,y) => {
      piece = _.find(pieces, (piece) => isPieceHere(piece, x,y));
      write(piece ? ''+piece.shapeI : '·');
    },
    (y) => write(` ${y}\n`)
  );
}

_.times(4, (i) => {
  for (piece of pieces) piece.orientation = i;
  render();
});
