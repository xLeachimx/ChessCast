Queen.prototype = new Piece(Point(0,0), false);

Queen.prototype.constructor = Queen;

function Queen(location, isWhite){
    this.location = location;
    this.white = isWhite;
    this.name = "Queen";
};

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
