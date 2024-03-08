let showBasedOnState = true; // Standard er 'false'

let imageVariant = 1; // Start med variant _1

let showGrowingTriangle = false; // Initialt deaktivert

let showSierpinski 
let sierpinskiDepth = 0 // Startdybde
const maxDepth = 6; // Maksimal dybde


let shouldRandomizeImages = false;

let edge_length = 150; // Default length of the triangle's edge

let circleDiameter =edge_length/7//Dynamisk størrelse på sirkler

let showRecursiveTree = false; // Controls whether to show the recursive trees
let recursiveTreeDepth = 3; // How deep the recursion goes
let initialBranchLength = edge_length; // Starting length of branches


let showLabels = false; // Initially, labels are not shown

const sqrt3 = Math.sqrt(3); // Square root of 3 for geometric calculations
let imgWidth = edge_length; // Image width based on the triangle's edge length
let imgHeight = edge_length * sqrt3 / 2; // Image height based on geometric properties
// let trekantbilde; // Will be assigned an image in preload()
let gridManager; // Will be initialized in setup() with the triangle data
let showTriangles = true; // Initially, triangles are shown

let showCircles = false; // Initialt satt til å vise sirkler
let showLines = false; // Initialt satt til å vise linjer
let showSpecialImages = false; // Denne variabelen kontrollerer visningen av spesielle bilder



let images = {}; // Object to hold all your images

function preload() {
  const baseNames = [
    "down_above_neighbor",
    "down_left_above_neighbors",
    "down_left_neighbor",
    "down_left_right_above_neighbors",
    "down_left_right_neighbors",
    "down_right_above_neighbors",
    "down_right_neighbor",
    "up_left_right_under_neighbors"
  ];

  baseNames.forEach(baseName => {
    for (let i = 1; i <= 4; i++) {
      const imageName = `${baseName}_${i}`;
      const imagePath = `../../assets/gen3svg/${imageName}.png`; // Correct path included
      images[imageName] = loadImage(imagePath, img => {
        // img.filter(INVERT); // Apply invert filter to each image
      }, error => {
        console.error("Failed to load image:", error, imagePath);
      });
    }
  });
}






function setup() {
  console.log('Setter opp');
  createCanvas(windowWidth, windowHeight);
  hueSlider = select('#hueSlider');

  
  // noLoop(); // Static sketch, no need to loop
  
  gridManager = new GridManager(triangles); // Initialize the grid with Triangle objects
 // triangles = triangles.map(tri => new Triangle(tri.a, tri.b, tri.c));
frameRate(25)
}



function draw() {
  background(255);
  translate(width / 2, height / 2);

  
  gridManager.drawGeometry(); 
  gridManager.showImages(); // 
  gridManager.label(); // Keep the label drawing if necessary

  if (sierpinskiDepth > 0) { // Tegn kun hvis dybden er større enn 0
    gridManager.triangles.forEach(triangle => {
      triangle.drawSierpinski(sierpinskiDepth);
    });
  }
  
  if (showGrowingTriangle) {
    gridManager.triangles.forEach(triangle => {
      triangle.drawGrowingTriangle(); // Tegner en voksende trekant for hver aktiv trekant
    });

  }
  if (showRecursiveTree) {
    gridManager.triangles.forEach(triangle => {
      triangle.drawLineRecursiveTree(recursiveTreeDepth, edge_length * 2);
    });
  }

}
