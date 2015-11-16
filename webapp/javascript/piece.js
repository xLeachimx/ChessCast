
var Point = function(x, y) {
  this.x = x;
  this.y = y;
};

Point.prototype.equal = function(to){
  return ((this.x === to.x) && (this.y === to.y));
}

var Piece = function(location, isWhite) {
  this.location = location
  this.white = isWhite;
  this.captured = false;
  this.moved = false;
  this.pointValue = 0;
};

Piece.prototype.moveTo = function(to){
  this.location = to;
  this.moved = true;
};

Piece.prototype.isWhite = function() {
  return this.white;
};

Piece.prototype.isBlack = function() {
  return !this.white;
};

Piece.prototype.validMove = function(to, board){
  var temp = this.getValidMoveSet(board);
  for var i = 0;i  < temp.length;i++ {
    if(temp[i].equal(to)){
      return true;
    }
  }
  return false;
};

Piece.prototype.getValidMoveSet = function(board) {
  return [];
};

module.exports = {
  Piece: Piece,
  Point: Point
}
