function Cell(x, y, w, h) {
	// get edges of each cell
	this.shape = randomEdgeVectors(w, h);
	this.position = createVector(x, y);
	this.w = w;
	this.h = h;
	this.randomStatic = function() {
		var a = random();
		return a < 0.2;
	}
	var o = {
		friction: 0.1,
		restitution: 0.8,
		isStatic: this.randomStatic()
	};
	this.body = Bodies.rectangle(x, y, w, h, o);
	World.add(world, this.body);

	// DRAWING TO THE SCREEN
	this.render = function() {
		push();
		translate(this.body.position.x, this.body.position.y);
		rotate(this.body.angle);
		//rect(0, 0, this.w, this.h);
		var x = this.body.position.x;
		var y = this.body.position.y;
		// svgString += '<rect fill="white" stroke="black" x="';
		// svgString += x + '" y="' + y + '" width="';
		// svgString += cellw + '" height="' + cellh + '" />';

		beginShape();
		// hack svg
		var poly = '<polygon points="';
		var polyPoints = '';

		for (var i = 0; i < this.shape.length; i++) {
			var x = this.shape[i][0] + this.body.position.x;
			var y = this.shape[i][1] + this.body.position.y;
			vertex(x, y);

			polyPoints += x + ',' + y + ' '
		}
		poly += polyPoints;
		poly += '" fill="white" stroke="black" />';

		svgString += poly
		console.log(poly)
		endShape(CLOSE);
		pop();
	}
}

function randomEdgeVectors(w, h) {
	var vectors = [];
	//top edge
	vectors[0] = [random(0, w), 0];
	//right edge
	vectors[1] = [w, random(0, h)];
	// bottomEdge
	vectors[2] = [random(0, w), h];
	// left edge
	vectors[3] = [0, random(0, h)];
	return vectors;
}