var pawn = require('pawn.js');
var rook = require('pawn.js');
var bishop = require('pawn.js');
var knight = require('pawn.js');
var queen = require('pawn.js');
var king = require('pawn.js');
var base = require('piece.js');

module.exports = {
  Pawn: pawn,
  Rook: rook,
  Bishop: bishop,
  Knight: knight,
  Queen: queen,
  King: king,
  Point: base.Point
};
