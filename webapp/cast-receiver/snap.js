// Chess Cast Receiver App UI 
// Erik Mudrak 2015

// Initialize the screen canvas
var s = Snap();
s.fill 

bigCircle = s.circle(150, 150, 100);


Snap.load("assets/svg/ui/board-only.svg", function(f) {
	g = f.select("g");
	g.drag();
)};