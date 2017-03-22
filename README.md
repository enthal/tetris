# Tetris

What if we had no grid?

## things
- a **shape**
  - has a list of occupied cell coordinates (by x,y) at reference *orientation*
  - has presentation info (like color)
  - has a name?
- the basic shapes: line, square, left-s, right-s, left-l, right-l
- a **piece**
  - is of a *shape*
  - at an *orientation* (0-3)
  - at a *position* (x:0-10; y:0-20; 0,0 at top left)
- a **game**
  - has a list of *pieces*
  - has a *live piece*  (could be 1st/last in list?)

## events
- on *start*:
  - add/make live piece:
    - random shape
    - x *position* near middle
    - if *overlap*, do *end*
- on *tick* or *down move*:
  - move down 1
  - handle *potential landing*
- on *lateral move* (left/right):
  - unless *would violate*
  - move piece 1 left/right
- on *rotate*:
  - unless *would violate*
  - increment *live piece* *orientation* 1, modulo 4
  - handle *potential landing*

## functions
- **would violate**: given a candidate piece whether:
  - piece *extent* would exceed *x-boundary* (0,10)
  - piece would *overlap* another piece in the (non-live) list
- **potential landing**:
  - if *live piece* *did land*:
    - add it to piece list
    - do *start*
- **did land**: whether any:
  - any cell of *live piece* is directly above (y-1) that of any other piece
  - *live piece* is on bottom
- **overlap**:

## presentation
- on any change, render grid of cells:
  - for each x,y, display for shape in that x,y
- *tick* every second or so
