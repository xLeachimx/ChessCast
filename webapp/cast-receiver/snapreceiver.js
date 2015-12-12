 document.body.style.backgroundColor = '#53599a';
      //preserveAspectRatio = "xMinYMin meet";

      var s = Snap("#svg");

      // Titles for player names 
      var player1 = s.text(35,100,'Player 1');
      player1.attr({
        fill: "#fff",
        "font-size": "100px",
        "font-family": "Axis, Droid Sans, serif"
      });

      var player2 = s.text(1475,100,'Player 2');
      player2.attr({
        fill: "#fff",
        "font-size": "100px",
        "font-family": "Axis, Droid Sans, serif"
      });

      //Image aligns when set to resolution of actual design, desired TV's
      s.attr ({ viewBox: "0 0 1920 1080" });
  
      // Load stand in 
      var stand = s.group();
      Snap.load("assets/svg/ui/stand-only.svg", function(f) {
        stand.append(f);
      } );

      // Load board in, on top of stand
      Snap.load("assets/svg/ui/board-only-full.svg", function(f) {
        stand.append(f);
      });

      //// Pieces:

      // One x coordinate increment = 156.5 points, y = 162, scale by 65%
      var incrx = 156.5;
      incry = 162;
      var scale = "s0.65";

      // Object for pieces of 2 colors and 2 pieces/color,
      // where on the board:
      // p1 = left piece, p2 = right piece
      var piece = {
        rook: { 
          white : { p1: s.group(), p2: s.group() },
          black : { p1: s.group(), p2: s.group() }
        },
        knight: { 
          white : { p1: s.group(), p2: s.group() },
          black : { p1: s.group(), p2: s.group() }
        },
        bishop: { 
          white : { p1: s.group(), p2: s.group() },
          black : { p1: s.group(), p2: s.group() }
        }
      };

      /// Rooks 
      // white: 
      Snap.load("assets/svg/pieces/white.rook.svg", function(f) {
        piece.rook.white.p1.append(f);
        piece.rook.white.p1.transform(scale + "t831,110");
      });
      Snap.load("assets/svg/pieces/white.rook.svg", function(f) {
        piece.rook.white.p2.append(f);
        piece.rook.white.p2.transform(scale + "t" + (831 + incrx * 7) + ",110");
      });
      // black: 
      Snap.load("assets/svg/pieces/black.rook.svg", function(f) {
        piece.rook.black.p1.append(f);
        piece.rook.black.p1.transform(scale + "t831," + (110 + incry * 7));
      });
      Snap.load("assets/svg/pieces/black.rook.svg", function(f) {
        piece.rook.black.p2.append(f);
        piece.rook.black.p2.transform(scale + "t" + (831 + incrx * 7) + "," + (110 + incry * 7));
      });

      /// Knights
      // white:
      Snap.load("assets/svg/pieces/white.knight.svg", function(f) {
        piece.knight.white.p1.append(f);
        piece.knight.white.p1.transform(scale + "t" + (831 + incrx * 1) + ",110");
      });
      Snap.load("assets/svg/pieces/white.knight.svg", function(f) {
        piece.knight.white.p2.append(f);
        piece.knight.white.p2.transform(scale + "t" + (831 + incrx * 6) + ",110");
      }); 
      //black: 
      Snap.load("assets/svg/pieces/black.knight.svg", function(f) {
        piece.knight.black.p1.append(f);
        piece.knight.black.p1.transform(scale + "t" + (831 + incrx * 1) + "," + (110 + incry * 7) );
      });
      Snap.load("assets/svg/pieces/black.knight.svg", function(f) {
        piece.knight.black.p2.append(f);
        piece.knight.black.p2.transform(scale + "t" + (831 + incrx * 6) + "," + (110 + incry * 7) );
      }); 

      /// Bishop
      // white:
      Snap.load("assets/svg/pieces/white.bishop.svg", function(f) {
        piece.bishop.white.p1.append(f);
        piece.bishop.white.p1.transform(scale + "t" + (831 + incrx * 2) + ",110");
      }); 
      Snap.load("assets/svg/pieces/white.bishop.svg", function(f) {
        piece.bishop.white.p2.append(f);
        piece.bishop.white.p2.transform(scale + "t" + (831 + incrx * 5) + ",110");
      }); 
      // black:
      Snap.load("assets/svg/pieces/black.bishop.svg", function(f) {
        piece.bishop.black.p1.append(f);
        piece.bishop.black.p1.transform(scale + "t" + (831 + incrx * 2) + "," + (110 + incry * 7));
      }); 
      Snap.load("assets/svg/pieces/black.bishop.svg", function(f) {
        piece.bishop.black.p2.append(f);
        piece.bishop.black.p2.transform(scale + "t" + (831 + incrx * 5) + "," + (110 + incry * 7));
      }); 

      /// Kings
      // white:
      var whiteKing = s.group();
      Snap.load("assets/svg/pieces/white.king.svg", function(f) {
        whiteKing.append(f);
        whiteKing.transform(scale + "t" + (831 + incrx * 3) + "," + (110 + incry * 0));
      });  
      //black:
      var blackKing = s.group();
        Snap.load("assets/svg/pieces/black.king.svg", function(f) {
          blackKing.append(f);
          blackKing.transform(scale + "t" + (831 + incrx * 3) + "," + (110 + incry * 7));
      });  

      /// Queens
      // white:
      var whiteQueen = s.group();    
      Snap.load("assets/svg/pieces/white.queen.svg", function(f) {
        whiteQueen.append(f);
        whiteQueen.transform(scale + "t" + (831 + incrx * 4) + "," + (110 + incry * 0));
      });
      // black:
      var blackQueen = s.group();    
      Snap.load("assets/svg/pieces/black.queen.svg", function(f) {
        blackQueen.append(f);
        blackQueen.transform(scale + "t" + (831 + incrx * 4) + "," + (110 + incry * 7));
      });

      /// Pawns: 
      var pawn = {
        white : { 
          a: s.group(),
          b: s.group(),
          c: s.group(),
          d: s.group(),
          e: s.group(),
          f: s.group(),
          g: s.group(), 
          h: s.group()
        },
        black : {
          a: s.group(),
          b: s.group(),
          c: s.group(),
          d: s.group(),
          e: s.group(),
          f: s.group(),
          g: s.group(), 
          h: s.group()
        }
      };

      // Arrays of pawn object for each color
      var whiteCoords = [pawn.white.a,pawn.white.b,pawn.white.c,pawn.white.d,pawn.white.e,pawn.white.f,pawn.white.g,pawn.white.h];
      var blackCoords = [pawn.black.a,pawn.black.b,pawn.black.c,pawn.black.d,pawn.black.e,pawn.black.f,pawn.black.g,pawn.black.h];

      // Load and place the pawns
      function pawns(coords,color,index) {
        var scale = "s0.65";
        var incrx = 156.5;
        var incry = 163;
        Snap.load("assets/svg/pieces/" + color + ".pawn.svg", function(f) {
          coords.append(f);
          // Set # to multiply by incr: 
          if (color == "white") {
            coords.transform(scale + "t" + (831 + incrx * index) + "," + (110 + (incry *1)) );
          }
          if (color == "black") {
            coords.transform(scale + "t" + (831 + incrx * index) + "," + (110 + (incry *6)) );
          }
        }); 
      };

      // place each of the 8 pawns in a loop
      for (i=0; i<8; i++) {
        pawns(whiteCoords[i],"white",i);
        pawns(blackCoords[i],"black",i);
      }

      //Graveyard piece banks
      var blackBank = s.group();
      Snap.load("assets/svg/ui/bank.black.svg", function(f){
        blackBank.append(f);
        // scale to fit pieces 4x4 
        blackBank.transform('s0.55t-225,150');
      });

      var whiteBank = s.group();
      Snap.load("assets/svg/ui/bank.white.svg", function(f){
        whiteBank.append(f);
        whiteBank.transform('s0.55t2395,150');
      });