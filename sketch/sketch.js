var cells = [];
var cell = 400;

// Matter JS Namespacing
var Engine = Matter.Engine,
   World = Matter.World,
   Constraint = Matter.Constraint,
   Bodies = Matter.Bodies;

var engine,
   world,
   constraint;

function setup() {
   createCanvas(800, 800);
   //noStroke();
   //fill(0);

   // Create Physics Engine & World
   engine = Engine.create();
   world = engine.world;
   Engine.run(engine);



   // draw grid
   for (var w = 0; w < width; w += cell) {
      for (var h = 0; h < height; h += cell) {
         rect(w, h, cell, cell);
         cells.push(new Cell(w, h, cell));
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

   // clear bg
   //background(255);

   for (var c = 0; c < cells.length; c++) {
      cells[c].render();
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


function Cell(x, y, s) {
   // get edges of each cell
   this.shape = randomEdgeVectors(s, s);

   this.randomStatic = function() {
      var a = random();
      return a > 0.8;
   }

   var o = {
      friction: 0.6,
      restitution: 0.7,
      isStatic: this.randomStatic()
   };


   this.body = Bodies.fromVertices(x, y, this.shape, o);
   World.add(world, this.body);

   this.render = function() {
      push();

      translate(this.body.position.x, this.body.position.y);
      rotate(this.body.angle);

      beginShape();
      for (var i = 0; i < this.shape.length; i++) {
         vertex(this.shape[i].x, this.shape[i].y);
      }
      endShape(CLOSE);

      pop();
   }
}
