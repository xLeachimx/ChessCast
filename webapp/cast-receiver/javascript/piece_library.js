var Point = function(x, y) {
  this.x = x;
  this.y = y;
};

Point.prototype.equal = function(to) {
  return ((this.x === to.x) && (this.y === to.y));
};

Point.prototype.toBoardSpace = function(){
  return {x: (this.x*156.5) + 831, y: (this.y*162) + 110};
};

var Piece = function(loc, white, asset) {
  this.loc = loc;
  this.white = white;
  this.captured = false;
  this.moved = false;
  this.pointValue = 0;
  this.name = "piece";
  this.asset = asset;
  var boardPoint = this.loc.toBoardSpace();
  this.asset.animate({'transform': 's0.65t' + boardPoint.x + ',' + boardPoint.y}, 4000);
};

Piece.prototype.moveTo = function(to) {
  this.loc = to;
  this.moved = true;
  if(this.asset){
    var boardPoint = this.loc.toBoardSpace();
    this.asset.animate({'transform': 's0.65t' + boardPoint.x + ',' + boardPoint.y}, 1000);
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

function Rook(loc, isWhite, asset){
  Piece.call(this, loc, isWhite, asset);
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

function Pawn(loc, isWhite, asset){
    Piece.call(this, loc, isWhite, asset);
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
  if (board.inBounds(possible) && !board.locOccupied(possible)){
    result.push(possible);
  }
  if(result.length > 0 && !this.moved){
    possible = new Point(this.loc.x,this.loc.y+(2*vertAdjust));
    if(board.inBounds(possible) && !board.locOccupied(possible)){
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

function Bishop(loc, isWhite, asset){
  Piece.call(this, loc, isWhite, asset);
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

function Queen(loc, isWhite, asset){
  Piece.call(this, loc, isWhite, asset);
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

var pieces = [];
var Selector = function(board, loc, space){
  this.loc = loc;
  this.piece = null;
  this.board = board;
  this.asset = space.group();
  var temp = space.rect(-1,-1,156.5,162,5);
  temp.attr({
    'fill-opacity': 0,
    'stroke-width': 10,
    'stroke': 'green'
  });
  this.asset.append(temp);
  var boardPoint = this.loc.toBoardSpace();
  this.asset.animate({'transform': 's0.65t' + boardPoint.x + ',' + boardPoint.y}, 4000);
};

Selector.prototype.moveTo = function(loc){
  this.loc = loc;
  var boardPoint = this.loc.toBoardSpace();
  this.asset.animate({'transform': 's0.65t' + boardPoint.x + ',' + boardPoint.y}, 1000);
};

Selector.prototype.moveLeft = function(){
  var temp = new Point(this.loc.x-1,this.loc.y);
  if(this.board.inBounds(temp)){
    this.moveTo(temp);
  }
};

Selector.prototype.moveRight = function(){
  var temp = new Point(this.loc.x+1,this.loc.y);
  if(this.board.inBounds(temp)){
    this.moveTo(temp);
  }
};

Selector.prototype.moveUp = function(){
  var temp = new Point(this.loc.x,this.loc.y-1);
  if(this.board.inBounds(temp)){
    this.moveTo(temp);
  }
};

Selector.prototype.moveDown = function(){
  var temp = new Point(this.loc.x,this.loc.y+1);
  if(this.board.inBounds(temp)){
    this.moveTo(temp);
  }
};

Selector.prototype.select = function(){
  if(this.piece === null){
    this.piece = this.board.getPieceAt(this.loc);
  }
  else{
    var possibles = this.piece.getValidMoveSet();
    //this.board.filterMoveList(this.piece);
    for(var i = 0;i < possibles.length;i++){
      if(possibles[i].equal(this.loc)){
        this.piece.moveTo(this.loc);
      }
    }
    this.piece = null;
  }
};

//sets up a standard chessboard
var Board = function(space){
  this.width = 8;
  this.height = 8;
  this.pieces = [];
  this.selector = new Selector(this, new Point(3,1), space);
  var hostFolder = 'https://googledrive.com/host/0B4THzRDAkVCGd0FQTUh4S2xHaWc/';
  //add pieces in standard format
  //white pawns
  Snap.load(hostFolder + 'assets/svg/pieces/white.pawn.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Pawn(new Point(0,1), true, temp));
  });
  Snap.load(hostFolder + 'assets/svg/pieces/white.pawn.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Pawn(new Point(1,1), true, temp));
  });
  Snap.load(hostFolder + 'assets/svg/pieces/white.pawn.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Pawn(new Point(2,1), true, temp));
  });
  Snap.load(hostFolder + 'assets/svg/pieces/white.pawn.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Pawn(new Point(3,1), true, temp));
  });
  Snap.load(hostFolder + 'assets/svg/pieces/white.pawn.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Pawn(new Point(4,1), true, temp));
  });
  Snap.load(hostFolder + 'assets/svg/pieces/white.pawn.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Pawn(new Point(5,1), true, temp));
  });
  Snap.load(hostFolder + 'assets/svg/pieces/white.pawn.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Pawn(new Point(6,1), true, temp));
  });
  Snap.load(hostFolder + 'assets/svg/pieces/white.pawn.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Pawn(new Point(7,1), true, temp));
  });


  //black pawns
  Snap.load(hostFolder + 'assets/svg/pieces/black.pawn.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Pawn(new Point(0,6), false, temp));
  });
  Snap.load(hostFolder + 'assets/svg/pieces/black.pawn.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Pawn(new Point(1,6), false, temp));
  });
  Snap.load(hostFolder + 'assets/svg/pieces/black.pawn.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Pawn(new Point(2,6), false, temp));
  });
  Snap.load(hostFolder + 'assets/svg/pieces/black.pawn.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Pawn(new Point(3,6), false, temp));
  });
  Snap.load(hostFolder + 'assets/svg/pieces/black.pawn.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Pawn(new Point(4,6), false, temp));
  });
  Snap.load(hostFolder + 'assets/svg/pieces/black.pawn.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Pawn(new Point(5,6), false, temp));
  });
  Snap.load(hostFolder + 'assets/svg/pieces/black.pawn.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Pawn(new Point(6,6), false, temp));
  });
  Snap.load(hostFolder + 'assets/svg/pieces/black.pawn.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Pawn(new Point(7,6), false, temp));
  });

  

  //white rooks
  Snap.load(hostFolder + 'assets/svg/pieces/white.rook.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Rook(new Point(0,0), true, temp));
  });

  Snap.load(hostFolder + 'assets/svg/pieces/white.rook.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Rook(new Point(7,0), true, temp));
  });

  //black rooks
  Snap.load(hostFolder + 'assets/svg/pieces/black.rook.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Rook(new Point(0,7), false, temp));
  });

  Snap.load(hostFolder + 'assets/svg/pieces/black.rook.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Rook(new Point(7,7), false, temp));
  });

  //white knights
  Snap.load(hostFolder + 'assets/svg/pieces/white.knight.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Knight(new Point(1,0), true, temp));
  });

  Snap.load(hostFolder + 'assets/svg/pieces/white.knight.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Knight(new Point(6,0), true, temp));
  });

  //black knights
  Snap.load(hostFolder + 'assets/svg/pieces/black.knight.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Knight(new Point(1,7), false, temp));
  });

  Snap.load(hostFolder + 'assets/svg/pieces/black.knight.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Knight(new Point(6,7), false, temp));
  });
  
  //white bishops
  Snap.load(hostFolder + 'assets/svg/pieces/white.bishop.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Bishop(new Point(2,0), true, temp));
  });

  Snap.load(hostFolder + 'assets/svg/pieces/white.bishop.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Bishop(new Point(5,0), true, temp));
  });

  //black bishops
  Snap.load(hostFolder + 'assets/svg/pieces/black.bishop.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Bishop(new Point(2,7), false, temp));
  });

  Snap.load(hostFolder + 'assets/svg/pieces/black.bishop.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Bishop(new Point(5,7), false, temp));
  });
  
  //white queen
  Snap.load(hostFolder + 'assets/svg/pieces/white.queen.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Queen(new Point(3,0), true, temp));
  });

  //black queen
  Snap.load(hostFolder + 'assets/svg/pieces/black.queen.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new Queen(new Point(3,7), false, temp));
  });
  
  //white king
  Snap.load(hostFolder + 'assets/svg/pieces/white.king.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new King(new Point(4,0), true, temp));
  });

  //black king
  Snap.load(hostFolder + 'assets/svg/pieces/black.king.svg', function(f){
    var temp = space.group();
    temp.append(f);
    pieces.push(new King(new Point(4,7), false, temp));
  });
};

Board.prototype.locOccupied = function(loc){
  for(var i = 0;i < pieces.length;i++){
    if(this.pieces[i].loc.equal(loc)){
      return true;
    }
  }
  return false;
};

Board.prototype.getPieceAt = function(loc){
  for(var i = 0;i < this.pieces.length;i++){
    if(this.pieces[i].loc.equal(loc)){
      return this.pieces[i];
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
  for(var i = 0;i < this.pieces.length;i++){
    console.log(this.pieces[i].name);
    if(this.pieces[i].isWhite() === white && this.pieces[i].name === "King"){
      king = this.pieces[i];
      break;
    }
  }
  //console.log(king);
  if(king){
    for(var j = 0;j < this.pieces.length;i++){
      if(this.pieces[j].isWhite() !== white && !this.pieces[j].captured){
        var moveSet = this.pieces[j].getValidMoveSet(this);
        for(var k = 0;k < moveSet.length;k++){
          if(moveSet[k].equal(king.loc)){
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
  console.log('Filetering');
  var color = piece.isWhite();
  var moveSet = piece.getValidMoveSet(this);
  var origin = new Point(piece.loc.x, piece.loc.y);
  var filteredMoveSet = [];
  for(var i = 0;i < moveSet.length;i++){
    console.log('i:',i);
    var cap = this.getPieceAt(moveSet[i]);
    if(cap){
      cap.captured = true;
    }
    piece.loc = moveSet[i];
    if(!this.check(color)){
      filteredMoveSet.push(moveSet[i]);
    }
    if(cap){
      cap.captured = false;
    }
  }
  piece.loc = origin;
  console.log('Done filtering');
  return filteredMoveSet;
};


Board.prototype.inBounds = function(loc){
  if(loc.x < 0 || loc.x >= this.width){
    return false;
  }
  if(loc.y < 0 || loc.y >= this.height){
    return false;
  }
  return true;
};

