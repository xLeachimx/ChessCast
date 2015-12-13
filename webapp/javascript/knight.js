function Knight(location, isWhite, assetName){
    Piece.call(this, location, isWhite, assetName);
    this.name = "Knight";
}

Knight.prototype = Object.create(Piece.prototype);
Knight.prototype.constructor = Knight;


Knight.prototype.getValidMoveSet = function(board) {
  var result = [];
  //move the one square on the x
  var currentX = this.x+1;
  var currentY = this.y+2;
  var currentSpeculation = new Point(currentX, currentY);
  if(board.inBounds(currentSpeculation) && !board.locationOccupied(currentSpeculation)) {
    result.push(currentSpeculation);
  }
  var cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  currentX = this.x-1;
  currentY = this.y+2;
  currentSpeculation = new Point(currentX, currentY);
  if(board.inBounds(currentSpeculation) && !board.locationOccupied(currentSpeculation)) {
    result.push(currentSpeculation);
  }
  cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  currentX = this.x+1;
  currentY = this.y-2;
  currentSpeculation = new Point(currentX, currentY);
  if(board.inBounds(currentSpeculation) && !board.locationOccupied(currentSpeculation)) {
    result.push(currentSpeculation);
  }
  cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  currentX = this.x-1;
  currentY = this.y-2;
  currentSpeculation = new Point(currentX, currentY);
  if(board.inBounds(currentSpeculation) && !board.locationOccupied(currentSpeculation)) {
    result.push(currentSpeculation);
  }
  cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  //move the two square on the x  
  currentX = this.x+2;
  currentY = this.y+1;
  currentSpeculation = new Point(currentX, currentY);
  if(board.inBounds(currentSpeculation) && !board.locationOccupied(currentSpeculation)) {
    result.push(currentSpeculation);
  }
  cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  currentX = this.x-2;
  currentY = this.y+1;
  currentSpeculation = new Point(currentX, currentY);
  if(board.inBounds(currentSpeculation) && !board.locationOccupied(currentSpeculation)) {
    result.push(currentSpeculation);
  }
  cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  currentX = this.x+2;
  currentY = this.y-1;
  currentSpeculation = new Point(currentX, currentY);
  if(board.inBounds(currentSpeculation) && !board.locationOccupied(currentSpeculation)) {
    result.push(currentSpeculation);
  }
  cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  currentX = this.x-2;
  currentY = this.y-1;
  currentSpeculation = new Point(currentX, currentY);
  if(board.inBounds(currentSpeculation) && !board.locationOccupied(currentSpeculation)) {
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
