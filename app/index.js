const _ = require('lodash');
const tetris = require('./tetris');
const log = console.log

let livePiece;
const deadCells = [];

const render = () => {
  const svg = document.querySelector("svg #game");
  const svgns = "http://www.w3.org/2000/svg";

  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }

  const shapeCells = _.concat(
    deadCells,
    _.map(tetris.getPieceCellCoordinates(livePiece), (coords)=>[coords,livePiece.shapeI]) )
  _.each(shapeCells, ([[x,y],shapeI]) => {
    const rect = document.createElementNS(svgns,"rect");
    rect.setAttribute("width",1);
    rect.setAttribute("height",1);
    rect.setAttribute("x",x);
    rect.setAttribute("y",y);
    rect.setAttribute("fill",_.split("black red green blue orange yellow purple", ' ')[shapeI]);
    svg.appendChild(rect);
  });
};

let count=0;
setInterval(
  () => {
    if (!livePiece) {
      if (count > 10) return;
      livePiece = tetris.makePiece(_.random(6),0,4,-1);
      count += 1;
      log("new livePiece", livePiece)
    }
    livePiece.y += 1;
    render();
    if (isLivePieceOnBottom() || isLivePieceLanded()) {
      deadCells.push(..._.map(tetris.getPieceCellCoordinates(livePiece), (coords)=>[coords,livePiece.shapeI]));
      livePiece = null;
    }
  },
  100 );

const isLivePieceOnBottom = () =>
  livePiece.y + tetris.getPieceSize(livePiece)[1] + 1 == 20;

const isLivePieceLanded = () =>
  _.some(tetris.getPieceCellCoordinates(livePiece), (liveCoord) =>
    _.some(deadCells, ([deadCoord], ignore) =>
      liveCoord[0] == deadCoord[0] &&
      liveCoord[1] == deadCoord[1] - 1 ));
