var piece_base = require('./piece.js');
var piece_class = piece_base.Piece;
var point_class = piece_base.Point;

Rook.prototype = new piece.Piece(Point(0,0), false);

Rook.prototype.constructor = Rook;

function Rook(location, isWhite){
  this.location = location;
  this.white = isWhite;
};

Rook.prototype.getValidMoveSet = function(board) {
  var result = [];
  var currentX = this.x+1;
  var currentY = this.y;
  var currentSpeculation = new Point(this.x+1,this.y);
  //moving right
  while(!board.locationOccupied(currentSpeculation)){
    result.push(currentSpeculation);
    currentX += 1;
    currentSpeculation = new Point(currentX, currentY);
  }
  //moving left
  currentX = this.x-1;
  currentY = this.y;
  currentSpeculation = new Point(currentX, currentY);
  while(!board.locationOccupied(currentSpeculation)){
    result.push(currentSpeculation);
    currentX -= 1;
    currentSpeculation = new Point(currentX, currentY);
  }
  //moving up
  currentX = this.x;
  currentY = this.y-1;
  currentSpeculation = new Point(this.x,this.y-1);
  while(!board.locationOccupied(currentSpeculation)){
    result.push(currentSpeculation);
    currentY -= 1;
    currentSpeculation = new Point(currentX, currentY);
  }
  //moving down
  currentX = this.x;
  currentY = this.y+1;
  currentSpeculation = new Point(this.x,this.y+1);
  while(!board.locationOccupied(currentSpeculation)){
    result.push(currentSpeculation);
    currentY += 1;
    currentSpeculation = new Point(currentX, currentY);
  }
  return result;
};

module.exports = Rook;
