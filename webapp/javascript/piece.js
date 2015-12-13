var Point = function(x, y) {
  this.x = x;
  this.y = y;
};

Point.prototype.equal = function(to) {
  return ((this.x === to.x) && (this.y === to.y));
};

var Piece = function(location, white, assetName, space) {
  this.location = location;
  this.white = white;
  this.captured = false;
  this.moved = false;
  this.pointValue = 0;
  this.name = "piece";
  if(assetName){
    this.asset = space.group();
    Snap.load(assetName, function(f){
      this.asset.append(f);
      this.moveTo(location);
    });
  }
  else{
    this.asset = null;
  }
  this.moveTo(location);
};

Piece.prototype.moveTo = function(to) {
  this.location = to;
  this.moved = true;
  if(asset){
    //put asset movement code here
    var assetX = (this.location.x * 156.5)+831;
    var assetY = (this.location.y * 162)+110;
    asset.transform('0.65T' + String(assetX) + ',' + String(assetY));
  }
};

Piece.prototype.isWhite = function() {
  return this.white;
};

Piece.prototype.isBlack = function() {
  return !this.white;
};

Piece.prototype.designation = function() {
  return this.name;
};

Piece.prototype.validMove = function(to, board) {
  var temp = this.getValidMoveSet(board);
  for(var i = 0;i  < temp.length;i++){
    if(temp[i].equal(to)){
      return true;
    }
  }
  return false;
};

Piece.prototype.getValidMoveSet = function(board) {
  return [];
};
