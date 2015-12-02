Pawn.prototype = new Piece(Point(0,0), false);

Pawn.prototype.constructor = Pawn;

function Pawn(location, isWhite){
    this.location = location;
    this.white = isWhite;
    this.name = "Pawn";
};

Pawn.prototype.getValidMoveSet = function(board) {
    var result = [];
    var possible = new Point(this.x+1,this.y);
    if (!board.locationOccupied(possible)){
	result.push(possible);
    }
    if(result.length > 0 && !this.moved){
	possible = new Point(this.x+2,this.y);
	if (!board.locationOccupied(possible)){
	    result.push(possible);
	}
    }
    return result;
};
