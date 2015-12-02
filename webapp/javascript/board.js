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
	}
    }
};
