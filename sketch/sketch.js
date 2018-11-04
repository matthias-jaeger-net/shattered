const SW = 500;
const SH = 650;
const END = 100;

var cells = [];
var cellx = celly = 30;
var cellw, cellh;

const svg = document.getElementById('svg');

var svgString = '<rect fill="plum" x="0" y="0" width="500" height="650" />';

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
}


function draw() {
	// Add Physics
	Engine.update(engine);

	for (var c = 0; c < cells.length; c++) {
		cells[c].render();
	}
	if (frameCount > 100) {
		noLoop();

		svg.innerHTML = svgString;

	}
}