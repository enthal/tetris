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

let currentTimeout;
const onTick = () => {
  clearTimeout(currentTimeout);
  doStep();
  currentTimeout = setTimeout(onTick, 1000);
};

document.addEventListener('keydown', (event) => {
  log('keydown', event.key);
  if (event.key == 'ArrowDown') onTick();
});

const doStep = () => {
  if (!livePiece) {
    livePiece = tetris.makePiece(_.random(6),0,4,-1);
    log("new livePiece", livePiece)
    if (isLivePieceOverlapping()) {
      log("GAME OVER");
      deadCells.length = 0;
    }
  }
  livePiece.y += 1;
  render();
  if (isLivePieceOnBottom() || isLivePieceOverlapping([0,1])) {
    deadCells.push(..._.map(tetris.getPieceCellCoordinates(livePiece), (coords)=>[coords,livePiece.shapeI]));
    livePiece = null;
  }
}

const isLivePieceOnBottom = () =>
  livePiece.y + tetris.getPieceSize(livePiece)[1] + 1 == 20;

const isLivePieceOverlapping = (offsetCoord = [0,0]) =>
  _.some(tetris.getPieceCellCoordinates(livePiece), (liveCoord) =>
    _.some(deadCells, ([deadCoord], ignore) =>
      liveCoord[0] + offsetCoord[0] == deadCoord[0] &&
      liveCoord[1] + offsetCoord[1] == deadCoord[1] ));

onTick();
