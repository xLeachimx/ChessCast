Knight.prototype = new Piece(Point(0,0), false);

Knight.prototype.constructor = Knight;

function Knight(location, isWhite){
    this.location = location;
    this.white = isWhite;
    this.name = "Knight";
};

Knight.prototype.getValidMoveSet = function(board) {
    var result = [];
    //move the one square on the x
    var currentX = this.x+1;
    var currentY = this.y+2;
    var currentSpeculation = new Point(currentX, currentY);
    if(!board.locationOccupied(currentSpeculation)) {
	result.push(currentSpeculation);
    }
    
    currentX = this.x-1;
    currentY = this.y+2;
    currentSpeculation = new Point(currentX, currentY);
    if(!board.locationOccupied(currentSpeculation)) {
	result.push(currentSpeculation);
    }
    
    currentX = this.x+1;
    currentY = this.y-2;
    currentSpeculation = new Point(currentX, currentY);
    if(!board.locationOccupied(currentSpeculation)) {
	result.push(currentSpeculation);
    }
    
    currentX = this.x-1;
    currentY = this.y-2;
    currentSpeculation = new Point(currentX, currentY);
    if(!board.locationOccupied(currentSpeculation)) {
	result.push(currentSpeculation);
    }

    //move the two square on the x  
    currentX = this.x+2;
    currentY = this.y+1;
    currentSpeculation = new Point(currentX, currentY);
    if(!board.locationOccupied(currentSpeculation)) {
	result.push(currentSpeculation);
    }

    currentX = this.x-2;
    currentY = this.y+1;
    currentSpeculation = new Point(currentX, currentY);
    if(!board.locationOccupied(currentSpeculation)) {
	result.push(currentSpeculation);
    }

    currentX = this.x+2;
    currentY = this.y-1;
    currentSpeculation = new Point(currentX, currentY);
    if(!board.locationOccupied(currentSpeculation)) {
	result.push(currentSpeculation);
    }

    currentX = this.x-2;
    currentY = this.y-1;
    currentSpeculation = new Point(currentX, currentY);
    if(!board.locationOccupied(currentSpeculation)) {
	result.push(currentSpeculation);
    }

    return result;
};
