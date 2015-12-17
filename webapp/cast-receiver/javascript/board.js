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
  this.asset.transform('s0.65t' + boardPoint.x + ',' + boardPoint.y);
};

Selector.prototype.moveTo = function(loc){
  this.loc = loc;
  var boardPoint = this.loc.toBoardSpace();
  this.asset.transform('s0.65t' + boardPoint.x + ',' + boardPoint.y);
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
  if(this.board.gameOver){
    return;
  }
  if(this.piece === null){
    this.piece = this.board.getPieceAt(this.loc);
    if(this.piece !== null && this.piece.isWhite() !== this.board.whiteTurn){
      this.piece = null;
    }
  }
  else{
    var possibles = this.board.filterMoveList(this.piece);
    for(var i = 0;i < possibles.length;i++){
      if(possibles[i].equal(this.loc)){
        var cap = this.board.getPieceAt(this.loc);
        if(cap !== null){
          //send to graveyard
          if(cap.isWhite()){
            this.board.whiteGrave.addPiece(cap);
          }
          else{
            this.board.blackGrave.addPiece(cap);
          }
        }
        this.piece.moveTo(this.loc);
        this.board.changeTurn();
        break;
      }
    }
    this.piece = null;
  }
};

//graveyards
var Graveyard = function(board, startSpace, columns){
  this.board = board;
  this.startSpace = new Point(startSpace.x, startSpace.y);
  this.nextSpace = new Point(0,0);
  this.columns = columns;
  this.units = 0;
};

Graveyard.prototype.addPiece = function(piece){
  var translatedX = this.nextSpace.x + this.startSpace.x;
  var translatedY = this.nextSpace.y + this.startSpace.y;
  var translation = new Point(translatedX, translatedY);
  piece.moveTo(translation);
  piece.captured = true;
  this.nextSpace.x += 1;
  if(this.nextSpace.x >= this.columns){
    this.nextSpace.y += 1;
    this.nextSpace.x = 0;
  }
};

//sets up a standard chessboard
var Board = function(space){
  this.width = 8;
  this.height = 8;
  this.pieces = [];
  this.gameOver = false;
  this.whiteTurn = true;
  this.selector = new Selector(this, new Point(3,1), space);
  this.whiteGrave = new Graveyard(this, new Point(9,3), 4);
  this.blackGrave = new Graveyard(this, new Point(-5,3), 4);
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
    if(this.pieces[i].isWhite() === white && this.pieces[i].name === "King"){
      king = this.pieces[i];
      break;
    }
  }
  if(king){
    for(var j = 0;j < this.pieces.length;j++){
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
  var color = piece.isWhite();
  var moveSet = piece.getValidMoveSet(this);
  var origin = new Point(piece.loc.x, piece.loc.y);
  var filteredMoveSet = [];
  for(var i = 0;i < moveSet.length;i++){
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
  return filteredMoveSet;
};

Board.prototype.checkmate = function(white){
  for(var i = 0;i < this.pieces.length;i++){
    if(this.pieces[i].isWhite() === white){
      var moveSet = this.filterMoveList(this.pieces[i]);
      if(moveSet.length > 0){
        return false;
      }
    }
  }
  return true;
};

Board.prototype.changeTurn = function(){
  this.whiteTurn = !this.whiteTurn;
  if(this.checkmate(this.whiteTurn)){
    this.gameOver = true;
  }
  if(this.whiteTurn){
    console.log("White");
  }
  else{
    console.log("Black");
  }
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
