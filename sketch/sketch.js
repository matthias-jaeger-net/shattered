const SW = 500;
const SH = 650;
const END = 100;

var cells = [];
var cellx = celly = 30;
var cellw, cellh;

var writer;

var svgString = '<svg id="svg" style="width: 500px; height: 650px" viewBox="0 0 500 650" xmlns="http://www.w3.org/2000/svg">';

// Matter JS Namespacing
var Engine = Matter.Engine,
	World = Matter.World,
	Constraint = Matter.Constraint,
	Bodies = Matter.Bodies;
var engine, world, constraint;

function setup() {
	createCanvas(SW, SH);

	// Create Physics Engine & World
	engine = Engine.create();
	world = engine.world;
	Engine.run(engine);

	cellw = width / cellx;
	cellh = height / celly;
	for (var r = 0; r < cellx; r++) {
		for (var c = 0; c < celly; c++) {
			var x = r * cellw;
			var y = c * cellh;
			if (random() < 0.5) {
				cells.push(new Cell(x, y, cellw, cellh));
			}
			rect(x, y, cellw, cellh);
			svgString += '<rect fill="white" stroke="black" x="' + x + '" y="' + y + '" width="' + cellw + '" height="' + cellh + '" />';
		}
	}
	var bottom = Bodies.rectangle(0, height, width, 20, {
		isStatic: true
	});
	World.add(world, bottom);

	writer = createWriter('shatterd-by-matthias-jaeger-net.svg');
}


function draw() {
	// Add Physics
	Engine.update(engine);

	for (var c = 0; c < cells.length; c++) {
		cells[c].render();
	}
	if (frameCount > 100) {
		noLoop();
		svgString += '</svg>';
		writer.print(svgString);
		writer.close();

	}
}