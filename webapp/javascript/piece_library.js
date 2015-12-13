var Point = function(x, y) {
  this.x = x;
  this.y = y;
};

Point.prototype.equal = function(to) {
  return ((this.x === to.x) && (this.y === to.y));
};

var Piece = function(location, isWhite, asset) {
  this.location = location;
  this.white = isWhite;
  this.captured = false;
  this.moved = false;
  this.pointValue = 0;
  this.name = "piece";
  this.asset = asset;
};

Piece.prototype.moveTo = function(to) {
  this.location = to;
  this.moved = true;
  if(asset){
    //put asset movement code here
    var assetX = (this.location.x * 156.5)+831;
    var assetY = (this.location.y * 162)+110;
    asset.transform('0.65T' + String(assetX) + ',' + String(assetY));
  }
};

Piece.prototype.isWhite = function() {
  return this.white;
};

Piece.prototype.isBlack = function() {
  return !this.white;
};

Piece.prototype.designation = function() {
  return this.name;
};

Piece.prototype.validMove = function(to, board) {
  var temp = this.getValidMoveSet(board);
  for(var i = 0;i  < temp.length;i++){
    if(temp[i].equal(to)){
      return true;
    }
  }
  return false;
};

Piece.prototype.getValidMoveSet = function(board) {
  return [];
};

function Rook(location, isWhite, asset){
  Piece.call(this, location, isWhite, asset);
  this.name = "Rook";
}

Rook.prototype = Object.create(Piece.prototype);
Rook.prototype.constructor = Rook;

Rook.prototype.getValidMoveSet = function(board) {
  var result = [];
  var currentX = this.x+1;
  var currentY = this.y;
  var currentSpeculation = new Point(this.x+1,this.y);
  //moving right
  while(board.inBounds(currentSpeculation) && !board.locationOccupied(currentSpeculation)){
    result.push(currentSpeculation);
    currentX += 1;
    currentSpeculation = new Point(currentX, currentY);
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
    currentSpeculation = new Point(currentX, currentY);
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
  currentSpeculation = new Point(this.x,this.y-1);
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
  currentSpeculation = new Point(this.x,this.y+1);
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

function Pawn(location, isWhite, asset){
    Piece.call(this, location, isWhite, asset);
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

function Bishop(location, isWhite, asset){
  Piece.call(this, location, isWhite, asset);
  this.name = "Bishop";
}

Bishop.prototype = Object.create(Piece.prototype);
Bishop.prototype.constructor = Bishop;

Bishop.prototype.getValidMoveSet = function(board) {
  var result = [];
  var currentX = this.x+1;
  var currentY = this.y-1;
  var currentSpeculation = new Point(currentX, currentY);
  //moving right and up
  while(board.inBounds(currentSpeculation) && !board.locationOccupied(currentSpeculation)){
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
  currentX = this.x-1;
  currentY = this.y+1;
  currentSpeculation = new Point(currentX, currentY);
    while(board.inBounds(currentSpeculation) && !board.locationOccupied(currentSpeculation)){
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
  currentX = this.x-1;
  currentY = this.y-1;
  currentSpeculation = new Point(currentX, currentY);
  while(board.inBounds(currentSpeculation) && !board.locationOccupied(currentSpeculation)){
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
  currentX = this.x+1;
  currentY = this.y+1;
  currentSpeculation = new Point(currentX, currentY);
  while(board.inBounds(currentSpeculation) && !board.locationOccupied(currentSpeculation)){
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

function Knight(location, isWhite, asset){
    Piece.call(this, location, isWhite, asset);
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

function Queen(location, isWhite, asset){
  Piece.call(this, location, isWhite, asset);
  this.name = "Queen";
}

Queen.prototype = Object.create(Piece.prototype);
Queen.prototype.constructor = Queen;

Queen.prototype.getValidMoveSet = function(board) {
  var result = [];
  var currentX = this.x+1;
  var currentY = this.y-1;
  var currentSpeculation = new Point(this.x+1,this.y);
  //diagonal
  //moving right and up
  while(board.inBounds(currentSpeculation) && !board.locationOccupied(currentSpeculation)){
    result.push(currentSpeculation);
    currentX += 1;
    currentY -= 1;
    currentSpeculation = new Point(currentX, currentY);
  }
  cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  //moving left and up
  currentX = this.x-1;
  currentY = this.y+1;
  currentSpeculation = new Point(currentX, currentY);
  while(board.inBounds(currentSpeculation) && !board.locationOccupied(currentSpeculation)){
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
  currentX = this.x-1;
  currentY = this.y-1;
  currentSpeculation = new Point(this.x,this.y-1);
  while(board.inBounds(currentSpeculation) && !board.locationOccupied(currentSpeculation)){
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
  currentX = this.x+1;
  currentY = this.y+1;
  currentSpeculation = new Point(this.x,this.y+1);
  while(board.inBounds(currentSpeculation) && !board.locationOccupied(currentSpeculation)){
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
  //straight lines
  currentX = this.x+1;
  currentY = this.y;
  currentSpeculation = new Point(this.x+1,this.y);
  //moving right
  while(board.inBounds(currentSpeculation) && !board.locationOccupied(currentSpeculation)){
    result.push(currentSpeculation);
    currentX += 1;
    currentSpeculation = new Point(currentX, currentY);
  }
  cap = board.getPieceAt(currentSpeculation);
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
    currentSpeculation = new Point(currentX, currentY);
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
  currentSpeculation = new Point(this.x,this.y-1);
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
  currentSpeculation = new Point(this.x,this.y+1);
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

function King(location, isWhite, asset){
  Piece.call(this, location, isWhite, asset);
  this.name = "King";
}

King.prototype = Object.create(Piece.prototype);
King.prototype.constructor = King;

King.prototype.getValidMoveSet = function(board) {
  var result = [];
  var currentX = this.x+1;
  var currentY = this.y;
  var currentSpeculation = new Point(currentX,currentY);
  //right
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
  currentY = this.y;
  currentSpeculation = new Point(currentX, currentY);
  //left
  if(board.inBounds(currentSpeculation) && !board.locationOccupied(currentSpeculation)) {
    result.push(currentSpeculation);
  }
  var cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  currentX = this.x;
  currentY = this.y-1;
  currentSpeculation = new Point(currentX, currentY);
  //up
  if(board.inBounds(currentSpeculation) && !board.locationOccupied(currentSpeculation)) {
    result.push(currentSpeculation);
  }
  cap = board.getPieceAt(currentSpeculation);
  if(cap){
    if(cap.isWhite() !== this.white){
      result.push(currentSpeculation);
    }
  }
  currentX = this.x;
  currentY = this.y+1;
  currentSpeculation = new Point(currentX, currentY);
  //down
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
  currentY = this.y-1;
  currentSpeculation = new Point(currentX, currentY);
  //right and up
  if(board.inBounds(currentSpeculation) && !board.locationOccupied(currentSpeculation)) {
    result.push(currentSpeculation);
  }
  currentX = this.x-1;
  currentY = this.y-1;
  currentSpeculation = new Point(currentX, currentY);
  //left and up
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
  currentY = this.y-1;
  currentSpeculation = new Point(currentX, currentY);
  //right and down
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
  currentY = this.y+1;
  currentSpeculation = new Point(currentX, currentY);
  //left and down
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

//sets up a standard chessboard
var Board = function(){
  this.width = 8;
  this.height = 8;
  this.pieces = [];
  //add pieces in standard format
  //pawns
  for(var i = 0; i < 8; i++) {
    Snap.load('assets/svg/pieces/white.pawn.svg', function(f) {
      var temp = s.group();
      temp.append(f);
      this.pieces.push(new Pawn(new Point(0,0), true ,temp)); //init white pawns
      this.pieces.moveTo(new Point(i,2));
    });
    this.pieces.push(new Pawn(new Point(i,6), false, null)); //init black pawns
  }
  //white rooks
  this.pieces.push(new Rook(new Point(0,0), true, null));
  this.pieces.push(new Rook(new Point(7,0), true, null));
  //black rooks
  this.pieces.push(new Rook(new Point(0,7), false, null));
  this.pieces.push(new Rook(new Point(7,7), false, null));
  //white knights
  this.pieces.push(new Knight(new Point(1,0), true, null));
  this.pieces.push(new Knight(new Point(6,0), true, null));
  //black knights
  this.pieces.push(new Knight(new Point(1,7), false, null));
  this.pieces.push(new Knight(new Point(6,7), false, null));
  //white bishops
  this.pieces.push(new Bishop(new Point(2,0), true, null));
  this.pieces.push(new Bishop(new Point(5,0), true, null));
  //black bishops
  this.pieces.push(new Bishop(new Point(2,7), false, null));
  this.pieces.push(new Bishop(new Point(5,7), false, null));
  //White Queen
  this.pieces.push(new Queen(new Point(3,0), true, null));
  //Black Queen
  this.pieces.push(new Queen(new Point(3,7), false, null));
  //White King
  this.pieces.push(new King(new Point(4,0), true, null));
  //Black King
  this.pieces.push(new King(new Point(4,7), false, null));
};

Board.prototype.occupiedSpace = function(loc){
  for(var i = 0;i < this.pieces.length;i++){
    if(pieces[i].location.equal(loc)){
      return true;
    }
  }
  return false;
};

Board.prototype.getPieceAt = function(loc){
  for(var i = 0;i < this.pieces.length;i++){
    if(pieces[i].location.equal(loc)){
      return pieces[i];
    }
  }
  return null;
};

Board.prototype.canBeMovedTo = function(from, to){
  var mover = this.getPieceAt(from);
  if(mover){
    var moveSet = mover.getValidMoveSet(this);
    for(var i = 0;i < moveSet;i++){
      if(moveSet[i].equal(to)){
        return true;
      }
    }
  }
  return false;
};

//white is a boolean variable which if true means you are looking for
//check of the white king
Board.prototype.check = function(white){
  var king = null;
  for(var i = 0;i < pieces.length;i++){
    if(pieces[i].isWhite() === white && pieces[i].designation === "King"){
      king = pieces[i];
      break;
    }
  }
  if(king){
    for(var i = 0;i < pieces.length;i++){
      if(pieces[i].isWhite() !== white && !pieces.captured){
        var moveSet = pieces[i].getValidMoveSet(this);
        for(var j = 0;j < moveSet.length;j++){
          if(moveSet[j].equal(king.location)){
            return true;
          }
        }
      }
    }
  }
  return false;
};

//filters out all moves that land the (friendly)king in check
Board.prototype.filterMoveList = function(piece){
  var color = piece.isWhite();
  var moveSet = pieces.getValidMoveSet(this);
  var origin = new Point(piece.location.x, piece.location.y);
  var filteredMoveSet = [];
  for(var i = 0;i < moveSet.length;i++){
    piece.moveTo(moveSet[i]);
    var cap = this.getPieceAt(moveSet[i]);
    if(cap){
      cap.captured = true;
    }
    if(!this.check(color)){
      filteredMoveSet.push(moveSet[i]);
    }
    if(cap){
      cap.captured = false;
    }
  }
  return filteredMoveSet;
};


Board.prototype.inBounds = function(loc){
  if(loc.x < 0 || loc.x > this.width){
    return false;
  }
  if(loc.y < 0 || loc.y > this.height){
    return false;
  }
  return true;
};

