function King(loc, isWhite, asset){
  Piece.call(this, loc, isWhite, asset);
  this.name = "King";
}

King.prototype = Object.create(Piece.prototype);
King.prototype.constructor = King;

King.prototype.getValidMoveSet = function(board) {
  var result = [];
  var currentX = this.loc.x+1;
  var currentY = this.loc.y;
  var currentSpeculation = new Point(currentX,currentY);
  //right
  if(board.inBounds(currentSpeculation) && !board.locOccupied(currentSpeculation)) {
    result.push(currentSpeculation);
  }
  cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  currentX = this.loc.x-1;
  currentY = this.loc.y;
  currentSpeculation = new Point(currentX, currentY);
  //left
  if(board.inBounds(currentSpeculation) && !board.locOccupied(currentSpeculation)) {
    result.push(currentSpeculation);
  }
  var cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  currentX = this.loc.x;
  currentY = this.loc.y-1;
  currentSpeculation = new Point(currentX, currentY);
  //up
  if(board.inBounds(currentSpeculation) && !board.locOccupied(currentSpeculation)) {
    result.push(currentSpeculation);
  }
  cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  currentX = this.loc.x;
  currentY = this.loc.y+1;
  currentSpeculation = new Point(currentX, currentY);
  //down
  if(board.inBounds(currentSpeculation) && !board.locOccupied(currentSpeculation)) {
    result.push(currentSpeculation);
  }
  cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  currentX = this.loc.x+1;
  currentY = this.loc.y-1;
  currentSpeculation = new Point(currentX, currentY);
  //right and up
  if(board.inBounds(currentSpeculation) && !board.locOccupied(currentSpeculation)) {
    result.push(currentSpeculation);
  }
  currentX = this.loc.x-1;
  currentY = this.loc.y-1;
  currentSpeculation = new Point(currentX, currentY);
  //left and up
  if(board.inBounds(currentSpeculation) && !board.locOccupied(currentSpeculation)) {
    result.push(currentSpeculation);
  }
  cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  currentX = this.loc.x+1;
  currentY = this.loc.y-1;
  currentSpeculation = new Point(currentX, currentY);
  //right and down
  if(board.inBounds(currentSpeculation) && !board.locOccupied(currentSpeculation)) {
    result.push(currentSpeculation);
  }
  cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  currentX = this.loc.x-1;
  currentY = this.loc.y+1;
  currentSpeculation = new Point(currentX, currentY);
  //left and down
  if(board.inBounds(currentSpeculation) && !board.locOccupied(currentSpeculation)) {
    result.push(currentSpeculation);
  }
  cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  return result;
};
