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
  const svg = document.querySelector("svg");
  const svgns = "http://www.w3.org/2000/svg";

  while (svg.firstChild) { svg.removeChild(svg.firstChild); }
  _.each(pieces, (piece) =>
    _.each(tetris.getPieceCellCoordinates(piece), ([x,y]) => {
      const rect = document.createElementNS(svgns,"rect");
      rect.setAttribute("width",1);
      rect.setAttribute("height",1);
      rect.setAttribute("x",x);
      rect.setAttribute("y",y);
      rect.setAttribute("fill",_.split("black red green blue orange yellow purple", ' ')[piece.shapeI]);
      svg.appendChild(rect);
    }));
};

setInterval(
  () => {
    for (piece of pieces) piece.orientation += 1;
    render();
  },
  1000 );
