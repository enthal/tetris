const _ = require('lodash');
const tetris = require('./tetris');
const log = console.log

const pieces = [
  tetris.make_piece(0,0,5,2),
  tetris.make_piece(1,0,1,5),
  tetris.make_piece(2,0,1,8),
  tetris.make_piece(3,0,5,12),
  tetris.make_piece(4,0,1,14),
  tetris.make_piece(5,0,6,16),
  tetris.make_piece(6,0,1,18),
];

const render = () => {
  for (const piece of pieces) {
    log(piece);
  }
  log( _.times(20, (y) =>
    _.times(10, (x) => {
      const piece = _.find(pieces, (piece) => tetris.isPieceHere(piece, x,y));
      return piece ? ''+piece.shapeI : '·';
    }).join('')
  ).join('\n') );
};

_.times(4, (i) => {
  for (piece of pieces) piece.orientation = i;
  render();
});
