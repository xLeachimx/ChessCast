var Point = function(x, y) {
  this.x = x;
  this.y = y;
};

Point.prototype.equal = function(to) {
  return ((this.x === to.x) && (this.y === to.y));
};

var Piece = function(loc, white, assetName, space) {
  this.loc = loc;
  this.white = white;
  this.captured = false;
  this.moved = false;
  this.pointValue = 0;
  this.name = "piece";
  this.asset = null;
  if(assetName){
    this.asset = space.group();
    Snap.load(assetName, function(f){
      this.asset = s.group();
      var assetX = (loc.x * 156.5)+831;
      var assetY = (loc.y * 162)+110;
      this.asset.append(f);
      this.asset.transform('s0.65t' + assetX + ',' + assetY);
    });
  }
  else{
    this.asset = null;
  }
};

Piece.prototype.moveTo = function(to) {
  this.loc = to;
  this.moved = true;
  if(asset){
    var assetX = (to.x * 156.5)+831;
    var assetY = (to.y * 162)+110;
    asset.transform('s0.65t' + String(assetX) + ',' + String(assetY));
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
