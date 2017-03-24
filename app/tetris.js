// tetris

const _ = require('lodash');
const log = console.log


exports.make_piece = (...a) =>
  _.zipObject(_.split('shapeI orientation x y', / +/), a);

const getShapeSize = (shape) =>
  _.reduce(
    shape,
    (extents, coords) => _.zipWith(
      extents, coords, (e,c)=>_.max([e,c]) ),
    [0,0] )


const getPieceCellCoordinates =
exports.getPieceCellCoordinates = (piece) => {
  const shape = shapes[piece.shapeI];
  let mx,my; [mx,my] = getShapeSize(shape);
  return _.map(shape, ([x,y]) => {
    x -= mx/2;
    y -= my/2;
    [x,y] = rotateCoords([x,y], piece.orientation);
    x = _.floor(x + mx/2);
    y = _.floor(y + my/2);
    return [piece.x+x, piece.y+y];
  });
}

const rotateCoords = ([x,y], orientation) =>
  [[x,y],[-y,x],[-x,-y],[y,-x]] [orientation % 4]  // clockwise, around origin

exports.isPieceHere = (piece, gx,gy) =>
  _.some(getPieceCellCoordinates(piece), ([x,y]) =>
    gx == x && gy == y );


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
