// tetris

const _ = require('lodash');
const log = console.log


exports.makePiece = (...a) =>
  _.zipObject(_.split('shapeI orientation x y', / +/), a);

const getShapeSize = (shape) =>
  _.reduce(
    shape,
    (extents, coords) => _.zipWith(
      extents, coords, (e,c)=>_.max([e,c]) ),
    [0,0] )

exports.getPieceSize = (piece) => {
  const size = getShapeSize(shapes[piece.shapeI]);
  return piece.orientation % 2 ? size.reverse() : size;
}

const getPieceCellCoordinates =
exports.getPieceCellCoordinates = (piece) => {
  const shape = shapes[piece.shapeI];
  const size = getShapeSize(shape);
  return _.map(shape, (xy) => {
    xy = _.zipWith(size, xy, (s,c) => c - s/2)
    xy = rotateCoords(piece.orientation, xy);
    xy = _.zipWith(size, xy, (s,c) => _.floor(c + s/2))
    return [
      piece.x+xy[0],
      piece.y+xy[1] ];
  });
}

const rotateCoords = (orientation, [x,y]) =>
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
