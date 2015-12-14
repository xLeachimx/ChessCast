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
