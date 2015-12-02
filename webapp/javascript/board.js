var Board = function(){
    this.length = 8;
    this.height = 8;
    this.pieces = [];
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
    return null
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
    var king = null
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
    var origin = Point(piece.location.x, piece.location.y);
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
