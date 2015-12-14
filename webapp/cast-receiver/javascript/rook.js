function Rook(loc, isWhite, assetName, space){
  Piece.call(this, loc, isWhite, assetName, space);
  this.name = "Rook";
}

Rook.prototype = Object.create(Piece.prototype);
Rook.prototype.constructor = Rook;

Rook.prototype.getValidMoveSet = function(board) {
  var result = [];
  var currentX = this.loc.x+1;
  var currentY = this.loc.y;
  var currentSpeculation = new Point(currentX, currentY);
  //moving right
  while(board.inBounds(currentSpeculation) && !board.locOccupied(currentSpeculation)){
    result.push(currentSpeculation);
    currentX += 1;
    currentSpeculation = new Point(currentX, currentY)(currentX, currentY);
  }
  var cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  //moving left
  currentX = this.loc.x-1;
  currentY = this.loc.y;
  currentSpeculation = new Point(currentX, currentY);
  while(board.inBounds(currentSpeculation) && !board.locOccupied(currentSpeculation)){
    result.push(currentSpeculation);
    currentX -= 1;
    currentSpeculation = new Point(currentX, currentY)(currentX, currentY);
  }
  cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  //moving up
  currentX = this.loc.x;
  currentY = this.loc.y-1;
  currentSpeculation = new Point(currentX, currentY);
  while(board.inBounds(currentSpeculation) && !board.locOccupied(currentSpeculation)){
    result.push(currentSpeculation);
    currentY -= 1;
    currentSpeculation = new Point(currentX, currentY);
  }
  cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  //moving down
  currentX = this.loc.x;
  currentY = this.loc.y+1;
  currentSpeculation = new Point(currentX, currentY);
  while(board.inBounds(currentSpeculation) && !board.locOccupied(currentSpeculation)){
    result.push(currentSpeculation);
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
