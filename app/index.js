const _ = require('lodash');
const tetris = require('./tetris');
const log = console.log

let livePiece;

const onNextPiece = () => {

}

const render = () => {
  const svg = document.querySelector("svg #game");
  const svgns = "http://www.w3.org/2000/svg";

  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }

  _.each(tetris.getPieceCellCoordinates(livePiece), ([x,y]) => {
    const rect = document.createElementNS(svgns,"rect");
    rect.setAttribute("width",1);
    rect.setAttribute("height",1);
    rect.setAttribute("x",x);
    rect.setAttribute("y",y);
    rect.setAttribute("fill",_.split("black red green blue orange yellow purple", ' ')[livePiece.shapeI]);
    svg.appendChild(rect);
  });
};

setInterval(
  () => {
    if (!livePiece)  livePiece = tetris.makePiece(_.random(6),0,4,-1);
    livePiece.y += 1;
    render();
    if (livePiece.y + tetris.getPieceSize(livePiece)[1] + 1 == 20) {
      livePiece = null;
    }
  },
  100 );
