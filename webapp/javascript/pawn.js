function Pawn(location, isWhite){
    Piece.call(this, location, isWhite);
    this.name = "Pawn";
}

Pawn.prototype = Object.create(Piece.prototype);
Pawn.prototype.constructor = Pawn;

Pawn.prototype.getValidMoveSet = function(board) {
  var result = [];
  var possible = new Point(this.x+1,this.y);
  if (board.inBounds(currentSpeculation) && !board.locationOccupied(possible)){
    result.push(possible);
  }
  if(result.length > 0 && !this.moved){
    possible = new Point(this.x+2,this.y);
    if (board.inBounds(currentSpeculation) && !board.locationOccupied(possible)){
      result.push(possible);
    }
  }
  return result;
};
