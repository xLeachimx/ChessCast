var Point = function(x, y) {
  this.x = x;
  this.y = y;
};

Point.prototype.equal = function(to) {
  return ((this.x === to.x) && (this.y === to.y));
};

var Piece = function(loc, white, assetName, space) {
  this.loc = loc;
  this.white = white;
  this.captured = false;
  this.moved = false;
  this.pointValue = 0;
  this.name = "piece";
  this.asset = null;
  if(assetName){
    this.asset = space.group();
    Snap.load(assetName, function(f){
      this.asset = s.group();
      var assetX = (loc.x * 156.5)+831;
      var assetY = (loc.y * 162)+110;
      this.asset.append(f);
      this.asset.transform('s0.65t' + assetX + ',' + assetY);
    });
  }
  else{
    this.asset = null;
  }
};

Piece.prototype.moveTo = function(to) {
  this.loc = to;
  this.moved = true;
  if(asset){
    var assetX = (to.x * 156.5)+831;
    var assetY = (to.y * 162)+110;
    asset.transform('s0.65t' + String(assetX) + ',' + String(assetY));
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

function Knight(loc, isWhite, assetName, space){
    Piece.call(this, loc, isWhite, assetName, space);
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

function Queen(loc, isWhite, assetName, space){
  Piece.call(this, loc, isWhite, assetName, space);
  this.name = "Queen";
}

Queen.prototype = Object.create(Piece.prototype);
Queen.prototype.constructor = Queen;

Queen.prototype.getValidMoveSet = function(board) {
  var result = [];
  var currentX = this.loc.x+1;
  var currentY = this.loc.y-1;
  var currentSpeculation = new Point(currentX,currentY);
  //diagonal
  //moving right and up
  while(board.inBounds(currentSpeculation) && !board.locOccupied(currentSpeculation)){
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
  currentSpeculation = new Point(currentX,currentY);
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
  currentSpeculation = new Point(currentX,currentY);
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
  //straight lines
  currentX = this.loc.x+1;
  currentY = this.loc.y;
  currentSpeculation = new Point(currentX,currentY);
  //moving right
  while(board.inBounds(currentSpeculation) && !board.locOccupied(currentSpeculation)){
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
  currentX = this.loc.x-1;
  currentY = this.loc.y;
  currentSpeculation = new Point(currentX, currentY);
  while(board.inBounds(currentSpeculation) && !board.locOccupied(currentSpeculation)){
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
  currentX = this.loc.x;
  currentY = this.loc.y-1;
  currentSpeculation = new Point(currentX,currentY);
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
  currentSpeculation = new Point(currentX,currentY);
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

function King(loc, isWhite, assetName, space){
  Piece.call(this, loc, isWhite, assetName, space);
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

//sets up a standard chessboard
var Board = function(space){
  this.width = 8;
  this.height = 8;
  this.pieces = [];
  //add pieces in standard format
  //pawns
  for(var i = 0; i < 8; i++) {
    this.pieces.push(new Pawn(new Point(i,0), true,
                              'assets/svg/pieces/white.pawn.svg', space)); //init white pawns
    this.pieces.push(new Pawn(new Point(i,6), false,
                              'assets/svg/pieces/black.pawn.svg', space)); //init black pawns
  }

  //white rooks
  this.pieces.push(new Rook(new Point(0,0), true, null, space));
  this.pieces.push(new Rook(new Point(7,0), true, null, space));
  //black rooks
  this.pieces.push(new Rook(new Point(0,7), false, null, space));
  this.pieces.push(new Rook(new Point(7,7), false, null, space));
  
  //white knights
  this.pieces.push(new Knight(new Point(1,0), true, null, space));
  this.pieces.push(new Knight(new Point(6,0), true, null, space));
  //black knights
  this.pieces.push(new Knight(new Point(1,7), false, null, space));
  this.pieces.push(new Knight(new Point(6,7), false, null, space));
  
  //white bishops
  this.pieces.push(new Bishop(new Point(2,0), true, null, space));
  this.pieces.push(new Bishop(new Point(5,0), true, null, space));
  //black bishops
  this.pieces.push(new Bishop(new Point(2,7), false, null, space));
  this.pieces.push(new Bishop(new Point(5,7), false, null, space));
  
  //White Queen
  this.pieces.push(new Queen(new Point(3,0), true, null, space));
  //Black Queen
  this.pieces.push(new Queen(new Point(3,7), false, null, space));
  
  //White King
  this.pieces.push(new King(new Point(4,0), true, null, space));
  //Black King
  this.pieces.push(new King(new Point(4,7), false, null, space));
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

