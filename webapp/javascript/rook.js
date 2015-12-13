function Rook(location, isWhite, assetName){
  Piece.call(this, location, isWhite, assetName);
  this.name = "Rook";
}

Rook.prototype = Object.create(Piece.prototype);
Rook.prototype.constructor = Rook;

Rook.prototype.getValidMoveSet = function(board) {
  var result = [];
  var currentX = this.x+1;
  var currentY = this.y;
  var currentSpeculation = new Point(currentX, currentY);
  //moving right
  while(board.inBounds(currentSpeculation) && !board.locationOccupied(currentSpeculation)){
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
  currentX = this.x-1;
  currentY = this.y;
  currentSpeculation = new Point(currentX, currentY);
  while(board.inBounds(currentSpeculation) && !board.locationOccupied(currentSpeculation)){
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
  currentX = this.x;
  currentY = this.y-1;
  currentSpeculation = new Point(currentX, currentY);
  while(board.inBounds(currentSpeculation) && !board.locationOccupied(currentSpeculation)){
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
  currentX = this.x;
  currentY = this.y+1;
  currentSpeculation = new Point(currentX, currentY)(this.x,this.y+1);
  while(board.inBounds(currentSpeculation) && !board.locationOccupied(currentSpeculation)){
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
