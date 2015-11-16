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
