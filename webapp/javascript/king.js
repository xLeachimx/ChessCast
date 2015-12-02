King.prototype = new Piece(Point(0,0), false);

King.prototype.constructor = King;

function King(location, isWhite){
    this.location = location;
    this.white = isWhite;
    this.name = "King";
};

King.prototype.getValidMoveSet = function(board) {
    var result = [];
    var currentX = this.x+1;
    var currentY = this.y;
    var currentSpeculation = new Point(currentX,currentY);
    //right
    if(!board.locationOccupied(currentSpeculation)) {
	result.push(currentSpeculation);
    }
    currentX = this.x-1;
    currentY = this.y;
    currentSpeculation = new Point(currentX, currentY);
    //left
    if(!board.locationOccupied(currentSpeculation)) {
	result.push(currentSpeculation);
    }
    currentX = this.x;
    currentY = this.y-1;
    currentSpeculation = new Point(currentX, currentY);
    //up
    if(!board.locationOccupied(currentSpeculation)) {
	result.push(currentSpeculation);
    }
    currentX = this.x;
    currentY = this.y+1;
    currentSpeculation = new Point(currentX, currentY);
    //down
    if(!board.locationOccupied(currentSpeculation)) {
	result.push(currentSpeculation);
    }
    currentX = this.x+1;
    currentY = this.y-1;
    currentSpeculation = new Point(currentX, currentY);
    //right and up
    if(!board.locationOccupied(currentSpeculation)) {
	result.push(currentSpeculation);
    }
    currentX = this.x-1;
    currentY = this.y-1;
    currentSpeculation = new Point(currentX, currentY);
    //left and up
    if(!board.locationOccupied(currentSpeculation)) {
	result.push(currentSpeculation);
    }
    currentX = this.x+1;
    currentY = this.y-1;
    currentSpeculation = new Point(currentX, currentY);
    //right and down
    if(!board.locationOccupied(currentSpeculation)) {
	result.push(currentSpeculation);
    }
    currentX = this.x-1;
    currentY = this.y+1;
    currentSpeculation = new Point(currentX, currentY);
    //left and down
    if(!board.locationOccupied(currentSpeculation)) {
	result.push(currentSpeculation);
    }
    return result;
};
