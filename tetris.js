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
  make_piece(0,1,15,2),
  make_piece(1,1,11,5),
  make_piece(2,1,11,8),
  make_piece(3,1,15,12),
  make_piece(4,1,11,14),
  make_piece(5,1,16,16),
  make_piece(6,1,11,17),
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
  _.some(shapes[piece.shapeI], ([cx,cy]) => {
    if (piece.orientation % 4) [cy,cx]=[cx,cy];
    // log(xy,x,y,piece.shapeI,piece.orientation);
    return gx == piece.x+cx && gy == piece.y+cy  ;
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
    () => write('\n')
  );
}

render();
