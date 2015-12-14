function Pawn(loc, isWhite, assetName, space){
    Piece.call(this, loc, isWhite, assetName, space);
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
  var possible = new Point(this.loc.x,this.loc.y+vertAdjust);
  if (board.inBounds(currentSpeculation) && !board.locOccupied(possible)){
    result.push(possible);
  }
  if(result.length > 0 && !this.moved){
    possible = new Point(this.loc.x,this.loc.y+(2*vertAdjust));
    if(board.inBounds(currentSpeculation) && !board.locOccupied(possible)){
      result.push(possible);
    }
  }
  //test captures
  var cap = new Point(this.loc.x+1, this.loc.y+vertAdjust);
  if(board.inBounds(cap) && board.locOccupied(cap)){
    if(board.getPieceAt(cap).isWhite() != this.white){
      result.push(cap);
    }
  }
  cap = new Point(this.loc.x-1, this.loc.y+vertAdjust);
  if(board.inBounds(cap) && board.locOccupied(cap)){
    if(board.getPieceAt(cap).isWhite() != this.white){
      result.push(cap);
    }
  }
  return result;
};
