function Bishop(loc, isWhite, assetName, space){
  Piece.call(this, loc, isWhite, assetName, space);
  this.name = "Bishop";
}

Bishop.prototype = Object.create(Piece.prototype);
Bishop.prototype.constructor = Bishop;

Bishop.prototype.getValidMoveSet = function(board) {
  var result = [];
  var currentX = this.loc.x+1;
  var currentY = this.loc.y-1;
  var currentSpeculation = new Point(currentX, currentY);
  //moving right and up
  while(board.inBounds(currentSpeculation) && !board.locOccupied(currentSpeculation)){
    result.push(currentSpeculation);
    currentX += 1;
    currentY -= 1;
    currentSpeculation = new Point(currentX, currentY);
  }
  var cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  //moving left and up
  currentX = this.loc.x-1;
  currentY = this.loc.y+1;
  currentSpeculation = new Point(currentX, currentY);
    while(board.inBounds(currentSpeculation) && !board.locOccupied(currentSpeculation)){
    result.push(currentSpeculation);
    currentX -= 1;
    currentY += 1;
    currentSpeculation = new Point(currentX, currentY);
  }
  cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  //moving left and up
  currentX = this.loc.x-1;
  currentY = this.loc.y-1;
  currentSpeculation = new Point(currentX, currentY);
  while(board.inBounds(currentSpeculation) && !board.locOccupied(currentSpeculation)){
    result.push(currentSpeculation);
    currentX -= 1;
    currentY -= 1;
    currentSpeculation = new Point(currentX, currentY);
  }
  cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  //moving right and down
  currentX = this.loc.x+1;
  currentY = this.loc.y+1;
  currentSpeculation = new Point(currentX, currentY);
  while(board.inBounds(currentSpeculation) && !board.locOccupied(currentSpeculation)){
    result.push(currentSpeculation);
    currentX += 1;
    currentY += 1;
    currentSpeculation = new Point(currentX, currentY);
  }
  cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  return result;
};
