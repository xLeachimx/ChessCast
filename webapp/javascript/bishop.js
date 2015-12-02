Bishop.prototype = new Piece(Point(0,0), false);

Bishop.prototype.constructor = Bishop;

function Bishop(location, isWhite){
    this.location = location;
    this.white = isWhite;
    this.name = "Bishop";
};

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
