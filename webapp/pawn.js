var piece_base = require('./piece.js');
var piece_class = piece_base.Piece;
var point_class = piece_base.Point;

Pawn.prototype = new piece.Piece(Point(0,0), false);

Pawn.prototype.constructor = Pawn;

function Pawn(location, isWhite){
  this.location = location;
  this.white = isWhite;
};

Pawn.prototype.getValidMoveSet = function(board) {
  var result = [];
  var possible = new Point(this.x+1,this.y);
  if (!board.locationOccupied(possible)){
    result.push(possible);
  }
  if(result.length > 0 && !this.moved){
    possible = new Point(this.x+2,this.y);
    if (!board.locationOccupied(possible)){
      result.push(possible);
    }
  }
  return result;
};

module.exports = Pawn;
