const _ = require('lodash');
const tetris = require('./tetris');
const log = console.log

let livePiece;
const deadCells = [];
const maxX = 10;
const maxY = 20;

const makeView = (gameElem) => {
  const liveCellsGroupElem = gameElem.querySelector('g#live-cells');
  const deadCellsGroupElem = gameElem.querySelector('g#dead-cells');
  const svgns = 'http://www.w3.org/2000/svg';

  gameElem.addEventListener('transitionend', (event) => {
    if (event.target.classList.contains('destroying')) {
      event.target.parentElement.removeChild(event.target);
    }
    // TODO: this will not fire for the cells just appended to deadCellsGroupElem; maybe on next tick it would?  WTF?
  });

  const generateCellSvgRect = (parentElem, [x,y], shapeI) => {
    const rect = document.createElementNS(svgns,'rect');
    rect.setAttribute('width',1);
    rect.setAttribute('height',1);
    rect.setAttribute('x',x);
    rect.setAttribute('y',y);
    rect.setAttribute('class',`shape-${shapeI}`);
    parentElem.appendChild(rect);
    return rect;
  }

  const convertToCells = (parentElem, piece) => _.map(
    tetris.getPieceCellCoordinates(piece),
    (xy) => {
      const elem = generateCellSvgRect(parentElem, xy, piece.shapeI);
      return {
        getY:  () => xy[1],
        getXY: () => xy,
        moveBy: (dxy) => {
          xy = _.zipWith(xy, dxy, (c,dc) => c + dc);
          elem.setAttribute('x', xy[0]);
          elem.setAttribute('y', xy[1]);
        },
        destroy: () => {  // TODO
          elem.setAttribute('transform', `rotate(45 ${xy[0]+0.5} ${xy[1]+0.5})`)
          elem.classList.add('destroying');
        },
      };
    })

  const removeAllChildren = (p) => {
    while (p.firstChild) { p.removeChild(p.firstChild); }
  }

  return {
    renderDeadCells: (piece) => {
      deadCells.push(...convertToCells(deadCellsGroupElem, piece));
    },
    renderLivePiece: () => {
      removeAllChildren(liveCellsGroupElem);
      convertToCells(liveCellsGroupElem, livePiece);
    },
  };
}

const view = makeView(document.querySelector("svg #game"));

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
  view.renderLivePiece();
});

const doStep = () => {
  if (!livePiece) {
    livePiece = tetris.makePiece(_.random(6),0,4,-1);
    log("new livePiece", livePiece)

    if (isPieceOverlapping(livePiece)) {
      log("GAME OVER");
      _.each(deadCells, (o) => o.destroy());
      deadCells.length = 0;
    }
  }

  if (isLivePieceOnBottom() || isPieceOverlapping(livePiece, [0,1])) {
    view.renderDeadCells(livePiece);
    livePiece = null;

    const yCounts = _.countBy(deadCells, (o) => o.getY());
    const killedYs = _.transform(yCounts,
      (r,count,y) => { if (count==10) r.push(+y); },
      []);

    _.remove(deadCells, (deadCell) => {
      if (_.some(killedYs, (killedY) => deadCell.getXY()[1] == killedY)) {
        deadCell.destroy();
        return true;
      }
    });

    _.each(killedYs, (killedY) =>
      _.each(deadCells, (deadCell) => {
        if (deadCell.getY() < killedY) deadCell.moveBy([0,1]);
      }));

    doStep();
  } else {
    livePiece.y += 1;
    view.renderLivePiece();
  }
}

const isLivePieceOnBottom = () =>
  _.some(tetris.getPieceCellCoordinates(livePiece), ([x,y]) => y == maxY-1);

const isPieceOverlapping = (piece, offsetXY=[0,0]) =>
  _.some(tetris.getPieceCellCoordinates(piece), (pieceXY) =>
    _.some(deadCells, (deadCell) =>  // TODO: move to cell
      pieceXY[0] + offsetXY[0] == deadCell.getXY()[0] &&
      pieceXY[1] + offsetXY[1] == deadCell.getXY()[1] ));

const isPieceOutOfBounds = (piece) =>
  _.some(tetris.getPieceCellCoordinates(piece), ([x,y]) =>
    x < 0 || x >= maxX || y >= maxY );


onTick();
