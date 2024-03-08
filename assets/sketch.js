let edge_length = 100; // Length of the triangle's edge
const sqrt3 = Math.sqrt(3); // Square root of 3, a constant used in calculations



// Function to calculate the center of a triangle
function triCenter(a, b, c) {
  return {
    x: (0.5 * a - 0.5 * c) * edge_length,
    // Invert the y-coordinate calculation to orient the triangles correctly
    y: (sqrt3 / 6 * a - sqrt3 / 3 * b + sqrt3 / 6 * c) * edge_length
  };
}

// Function to check if a triangle points up
function pointsUp(a, b, c) {
  return a + b + c === 2;
}

// Function to calculate the corners of a triangle
function triCorners(a, b, c) {
  if (pointsUp(a, b, c)) {
    return [
      triCenter(1 + a, b, c),
      triCenter(a, b, 1 + c),
      triCenter(a, 1 + b, c),
    ];
  } else {
    return [
      triCenter(-1 + a, b, c),
      triCenter(a, b, -1 + c),
      triCenter(a, -1 + b, c),
    ];
  }
}

// Draw a single triangle based on its a, b, c coordinates
function drawTriangle(a, b, c) {
  const corners = triCorners(a, b, c);
  beginShape();
  corners.forEach(corner => vertex(corner.x, corner.y));
  endShape(CLOSE);
}

// Setup function
function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop(); // Static sketch, no need to loop
}

// Draw function
function draw() {
  background(255);
  stroke(255);
  strokeWeight(2)
  translate(width / 2, height / 2); // Centering the drawing on the canvas
  fill(0); // Semi-transparent fill

  // Example: Draw a triangle and its neighbors
  //øverste:
  drawTriangle(-3, 4, 0); // Drawing an example triangle
 drawTriangle(-2, 4, 0); // Drawing an example triangle
 drawTriangle(-2, 4, -1); // Drawing an example triangle
 drawTriangle(-1, 4, -1); // Drawing an example triangle
 drawTriangle(-1, 4, -2); // Drawing an example triangle
 drawTriangle(0, 4, -2); // Drawing an example triangle
 drawTriangle(0, 4, -3); // Drawing an example triangle

  drawTriangle(0, 3, -1); // Drawing an example triangle
  drawTriangle(-1, 3, -1); // Drawing an example triangle
  drawTriangle(-1, 3, 0); // Drawing an example triangle
  drawTriangle(-2, 3, 0); // Drawing an example triangle
  drawTriangle(0, 3, -2); // Drawing an example triangle
  

  drawTriangle(0, 2, 0); // Drawing an example triangle
  drawTriangle(-1, 2, 1); // Drawing an example triangle
  drawTriangle(-2, 2, 1); // Drawing an example triangle
  drawTriangle(0, 2, -1); // Drawing an example triangle
  drawTriangle(1, 2, -2); // Drawing an example triangle

  //andre linje: 
  drawTriangle(0, 1, 0); // Drawing an example triangle
  drawTriangle(1, 1, 0); // Drawing an example triangle
  drawTriangle(1, 1, -1); // Drawing an example triangle
  drawTriangle(0, 1, 1); // Drawing an example triangle
  drawTriangle(-1, 1, 1); // Drawing an example triangle
  drawTriangle(0, 2, -1); // Drawing an example triangle
  drawTriangle(1, 2, -1); // Drawing an example triangle
  drawTriangle(-1, 2, 0); // Drawing an example triangle

  drawTriangle(1, 0, 1); // Drawing an example triangle
  drawTriangle(1, 0, 0); // Drawing an example triangle
  drawTriangle(2, 0, 0); // Drawing an example triangle
  drawTriangle(2, 0, -1); // Drawing an example triangle
  drawTriangle(0, 0, 1); // Drawing an example triangle
  drawTriangle(0, 0, 2); // Drawing an example triangle
  drawTriangle(-1, 0, 2); // Drawing an example triangle


  drawTriangle(1, -1, 1); // midten rad 6 ovenfra
  
  drawTriangle(2, -1, 1); // til høyre fra midten
  drawTriangle(2, -1,0); // helt høyre rad 6

  drawTriangle(1, -1, 2); // til venstre frea midten
  
  drawTriangle(0, -1, 2); // helt venstre rad 6

  drawTriangle(2, -2, 1); // til høyre fra midten rad 7
  drawTriangle(1, -2, 2); // til venstre fre midten rad 7
  drawTriangle(2, -2, 2); // midten rad 7 

  drawTriangle(2, -3, 2); // midten rad 8 

}
