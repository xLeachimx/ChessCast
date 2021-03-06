function Knight(loc, isWhite, asset){
    Piece.call(this, loc, isWhite, asset);
    this.name = "Knight";
}

Knight.prototype = Object.create(Piece.prototype);
Knight.prototype.constructor = Knight;


Knight.prototype.getValidMoveSet = function(board) {
  var result = [];
  //move the one square on the x
  var currentX = this.loc.x+1;
  var currentY = this.loc.y+2;
  var currentSpeculation = new Point(currentX, currentY);
  if(board.inBounds(currentSpeculation) && !board.locOccupied(currentSpeculation)) {
    result.push(currentSpeculation);
  }
  var cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  currentX = this.loc.x-1;
  currentY = this.loc.y+2;
  currentSpeculation = new Point(currentX, currentY);
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
  currentY = this.loc.y-2;
  currentSpeculation = new Point(currentX, currentY);
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
  currentY = this.loc.y-2;
  currentSpeculation = new Point(currentX, currentY);
  if(board.inBounds(currentSpeculation) && !board.locOccupied(currentSpeculation)) {
    result.push(currentSpeculation);
  }
  cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  //move the two square on the x  
  currentX = this.loc.x+2;
  currentY = this.loc.y+1;
  currentSpeculation = new Point(currentX, currentY);
  if(board.inBounds(currentSpeculation) && !board.locOccupied(currentSpeculation)) {
    result.push(currentSpeculation);
  }
  cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  currentX = this.loc.x-2;
  currentY = this.loc.y+1;
  currentSpeculation = new Point(currentX, currentY);
  if(board.inBounds(currentSpeculation) && !board.locOccupied(currentSpeculation)) {
    result.push(currentSpeculation);
  }
  cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  currentX = this.loc.x+2;
  currentY = this.loc.y-1;
  currentSpeculation = new Point(currentX, currentY);
  if(board.inBounds(currentSpeculation) && !board.locOccupied(currentSpeculation)) {
    result.push(currentSpeculation);
  }
  cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  currentX = this.loc.x-2;
  currentY = this.loc.y-1;
  currentSpeculation = new Point(currentX, currentY);
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
