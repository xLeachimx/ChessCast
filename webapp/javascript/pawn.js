function Pawn(location, isWhite, assetName, space){
    Piece.call(this, location, isWhite, assetName, space);
    this.name = "Pawn";
}

Pawn.prototype = Object.create(Piece.prototype);
Pawn.prototype.constructor = Pawn;

Pawn.prototype.getValidMoveSet = function(board) {
  var result = [];
  var vertAdjust = -1;
  if(this.white){
    vertAdjust = 1;
  }
  var possible = new Point(this.location.x,this.location.y+vertAdjust);
  if (board.inBounds(currentSpeculation) && !board.locationOccupied(possible)){
    result.push(possible);
  }
  if(result.length > 0 && !this.moved){
    possible = new Point(this.location.x,this.location.y+(2*vertAdjust));
    if(board.inBounds(currentSpeculation) && !board.locationOccupied(possible)){
      result.push(possible);
    }
  }
  //test captures
  var cap = new Point(this.location.x+1, this.location.y+vertAdjust);
  if(board.inBounds(cap) && board.locationOccupied(cap)){
    if(board.getPieceAt(cap).isWhite() != this.white){
      result.push(cap);
    }
  }
  cap = new Point(this.location.x-1, this.location.y+vertAdjust);
  if(board.inBounds(cap) && board.locationOccupied(cap)){
    if(board.getPieceAt(cap).isWhite() != this.white){
      result.push(cap);
    }
  }
  return result;
};
