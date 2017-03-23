// tetris

const _ = require('lodash');
const log = console.log


exports.make_piece = (...a) =>
  _.zipObject(_.split('shapeI orientation x y', / +/), a);

exports.isPieceHere = (piece, gx,gy) =>
  _.some(shapes[piece.shapeI], ([x,y]) => {
    [x,y] = [[x,y],[-y,x],[-x,-y],[y,-x]] [piece.orientation % 4];
    return gx == piece.x+x && gy == piece.y+y;
  });


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
