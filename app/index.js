const _ = require('lodash');
const tetris = require('./tetris');
const log = console.log

let livePiece;
let deadCells = [];
const maxX = 10;
const maxY = 20;

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
    rect.setAttribute("class",`shape-${shapeI}`);
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
  if (event.key == 'ArrowDown') {
    onTick();
    return;
  }
  const maybeLivePiece = _.clone(livePiece);
  if (event.key == 'ArrowUp') {
    maybeLivePiece.orientation += 1;
  }
  if (event.key == 'ArrowLeft') {
    maybeLivePiece.x -= 1;
  }
  if (event.key == 'ArrowRight') {
    maybeLivePiece.x += 1;
  }
  if (!isPieceOverlapping(maybeLivePiece) && !isPieceOutOfBounds(maybeLivePiece)) {
    livePiece = maybeLivePiece;
  }
  render();
});

const doStep = () => {
  if (!livePiece) {
    livePiece = tetris.makePiece(_.random(6),0,4,-1);
    log("new livePiece", livePiece)
    if (isPieceOverlapping(livePiece)) {
      log("GAME OVER");
      deadCells = [];
    }
  }

  if (isLivePieceOnBottom() || isPieceOverlapping(livePiece, [0,1])) {
    deadCells.push(..._.map(tetris.getPieceCellCoordinates(livePiece), (coords)=>[coords,livePiece.shapeI]));
    livePiece = null;

    const yCounts = _.countBy(deadCells, ([[x,y], __]) => y);
    const killedYs = _.transform(yCounts,
      (r,count,y) => { if (count==10) r.push(+y); },
      []);
    _.remove(deadCells, ([[ign1,y],ign2]) => _.some(killedYs, (killedY) => y == killedY));
    _.each(killedYs, (killedY) =>
      _.each(deadCells, (deadCell) => {
        if (deadCell[0][1] < killedY) deadCell[0][1]++
      }));

    doStep();
  } else {
    livePiece.y += 1;
    render();
  }
}

const isLivePieceOnBottom = () =>
  _.some(tetris.getPieceCellCoordinates(livePiece), ([x,y]) => y == maxY-1);

const isPieceOverlapping = (piece, offsetXY=[0,0]) =>
  _.some(tetris.getPieceCellCoordinates(piece), (pieceXY) =>
    _.some(deadCells, ([deadXY], ignore) =>
      pieceXY[0] + offsetXY[0] == deadXY[0] &&
      pieceXY[1] + offsetXY[1] == deadXY[1] ));

const isPieceOutOfBounds = (piece) =>
  _.some(tetris.getPieceCellCoordinates(piece), ([x,y]) =>
    x < 0 || x >= maxX || y >= maxY );


onTick();
