// tetris

const _=require('lodash');

const log = console.log

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

const isPieceHere = (piece, gx,gy) =>
  _.some(shapes[piece.shapeI], ([x,y]) => {
    [x,y] = [[x,y],[-y,x],[-x,-y],[y,-x]] [piece.orientation % 4];
    return gx == piece.x+x && gy == piece.y+y;
  });

const render = () => {
  for (const piece of pieces) {
    log(piece);
  }
  log( _.times(20, (y) =>
    _.times(10, (x) => {
      const piece = _.find(pieces, (piece) => isPieceHere(piece, x,y));
      return piece ? ''+piece.shapeI : '·';
    }).join('')
  ).join('\n') );
};

_.times(4, (i) => {
  for (piece of pieces) piece.orientation = i;
  render();
});
