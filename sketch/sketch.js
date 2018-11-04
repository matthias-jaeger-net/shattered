var cells = [];

// Matter JS Namespacing
var Engine = Matter.Engine,
   World = Matter.World,
   Constraint = Matter.Constraint,
   Bodies = Matter.Bodies;

var engine,
   world,
   constraint;

function setup() {
   createCanvas(windowWidth, windowHeight);
   // Create Physics Engine & World
   engine = Engine.create();
   world = engine.world;
   Engine.run(engine);

   var rows = 30;
   var cols = 30;
   var row = width / rows;
   var col = height / cols;
   for(var r = 0; r < rows; r++) {
      for(var c = 0; c < cols; c++) {
         var x = r * row;
         var y = c * col;
         if( random() < 0.5) {
            cells.push(new Cell(x, y, row, col));
         }
         rect(x, y, row, col);
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
   this.render = function() {
      push();
      translate(this.body.position.x, this.body.position.y);
      rotate(this.body.angle);
      //rect(0, 0, this.w, this.h);

      beginShape();
      for (var i = 0; i < this.shape.length; i++) {
         vertex(this.shape[i][0], this.shape[i][1]);
      }
      endShape(CLOSE);

      pop();

   }
}
