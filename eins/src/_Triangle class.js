class Triangle {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.isUp = this.pointsUp();
    this.center = this.triCenter();
    this.corners = this.triCorners();
    this.neighbors = [];
    this.randomValue = floor(random(1, 5)); // Initialiser med en tilfeldig verdi mellom 1 og 4
    this.growthCycles = []; // Holder styr på starttiden for hver vekstsyklus
  }

  randomizeValue() {
    this.randomValue = floor(random(1, 5)); // Oppdater med en ny tilfeldig verdi
  }

  pointsUp() {
    return this.a + this.b + this.c === 2;
  }

  triCenter() {
    return {
      x: (0.5 * this.a - 0.5 * this.c) * edge_length,
      y: (sqrt3 / 6 * this.a - sqrt3 / 3 * this.b + sqrt3 / 6 * this.c) * edge_length
    };
  }

  triCorners() {
    if (this.pointsUp()) {
      return [
        { x: this.center.x - edge_length / 2, y: this.center.y + (sqrt3 / 6) * edge_length },
        { x: this.center.x + edge_length / 2, y: this.center.y + (sqrt3 / 6) * edge_length },
        { x: this.center.x, y: this.center.y - (sqrt3 / 3) * edge_length }
      ];
    } else {
      return [
        { x: this.center.x - edge_length / 2, y: this.center.y - (sqrt3 / 6) * edge_length },
        { x: this.center.x + edge_length / 2, y: this.center.y - (sqrt3 / 6) * edge_length },
        { x: this.center.x, y: this.center.y + (sqrt3 / 3) * edge_length }
      ];
    }
  }

 findNeighbors() {
    const potentialNeighbors = this.isUp ? [
      { a: this.a - 1, b: this.b, c: this.c },
      { a: this.a, b: this.b - 1, c: this.c },
      { a: this.a, b: this.b, c: this.c - 1 }
    ] : [
      { a: this.a + 1, b: this.b, c: this.c },
      { a: this.a, b: this.b + 1, c: this.c },
      { a: this.a, b: this.b, c: this.c + 1 }
    ];

    // Update this to directly store references to neighbor Triangle objects
    this.neighbors = gridManager.triangles.filter(triangle =>
      potentialNeighbors.some(neighbor =>
        neighbor.a === triangle.a && neighbor.b === triangle.b && neighbor.c === triangle.c
      )
    );
}

getNeighborsStatus() {
  return this.neighbors.map(neighbor => ({
      coordinates: { a: neighbor.a, b: neighbor.b, c: neighbor.c },
      isVisible: showTriangles // Assuming visibility depends on showTriangles for simplicity
  }));
}

updateImageIndex() {
  this.currentImageIndex = floor(random(1, 5));
}

drawGeometry() {
  push(); // Start en ny tegningstilstand
  // Tegn trekanten
  if (showTriangles) {
    noFill(); // Ingen fyllfarge for trekanten
    stroke(0); // Svart kantlinje
    strokeWeight(4); // Tykkelse på kantlinjen
    beginShape();
    this.corners.forEach(corner => vertex(corner.x, corner.y)); // Definerer hjørnene i trekanten
    endShape(CLOSE); // Avslutt og lukk formen
  }

  // Forbered midtpunkter for tegning av linjer og sirkler
 let leftMidpoint = this.getMidpoint(this.corners[0], this.corners[2]);
  let rightMidpoint = this.getMidpoint(this.corners[1], this.corners[2]);
  let underOrAboveMidpoint = this.getMidpoint(this.corners[0], this.corners[1]);

  // Tegn linjer hvis showLines er true
  if (showLines) {
    stroke(255, 0, 0,80); // Rød farge for linjene
    strokeWeight(4); // Tykkere linje
    
    if (this.hasLeftNeighbor()) {
      // Linje fra venstre midtpunkt til det motsatte hjørnet (høyre)
      line(leftMidpoint.x, leftMidpoint.y, this.corners[1].x, this.corners[1].y);
    }

    if (this.hasRightNeighbor()) {
      // Linje fra høyre midtpunkt til det motsatte hjørnet (venstre)
      line(rightMidpoint.x, rightMidpoint.y, this.corners[0].x, this.corners[0].y);
    }

    if (this.hasUnderOrAboveNeighbor()) {
      // Bruk den betingede operatøren for å velge det korrekte motstående hjørnet
      let oppositeCorner = this.isUp ? this.corners[2] : this.corners[2];
      line(underOrAboveMidpoint.x, underOrAboveMidpoint.y, oppositeCorner.x, oppositeCorner.y);
    }
  }

  // Tegn sirkler hvis showCircles er true
  if (showCircles) {
    // noFill()
    fill(0); // Svart fyll for sirkelen
    stroke(0); // Hvit kantlinje for sirkelen
    strokeWeight(2); // Tykkelse på sirkelens kantlinje
    // let circleDiameter = edge_length; // Diameteren til sirkelen
   
    if (this.hasLeftNeighbor()) {
      circle(leftMidpoint.x, leftMidpoint.y, circleDiameter);
    }
    if (this.hasRightNeighbor()) {
      circle(rightMidpoint.x, rightMidpoint.y, circleDiameter);
    }
    if (this.hasUnderOrAboveNeighbor()) {
      circle(underOrAboveMidpoint.x, underOrAboveMidpoint.y, circleDiameter);
    }
  }
  pop(); // Gjenopprett tidligere tegningstilstand
}

showImages() {
  if (!showSpecialImages) return; // Hvis visning av spesielle bilder ikke er aktivert, gjør ingenting

  let img, imgX, imgY;
  // Bruker this.randomValue istedenfor å generere et nytt tilfeldig tall
  const imageIndex = this.randomValue;

  if (!this.isUp) {
    // Nedoverpekende trekant logikk
    const hasLeft = this.hasLeftNeighbor();
    const hasRight = this.hasRightNeighbor();
    const hasAbove = this.hasUnderOrAboveNeighbor();
    let imageName = "down_";

    if (!hasLeft && !hasRight && hasAbove) imageName += "above_neighbor";
    else if (hasLeft && hasRight && hasAbove) imageName += "left_right_above_neighbors";
    else if (hasLeft && !hasRight && hasAbove) imageName += "left_above_neighbors";
    else if (!hasLeft && hasRight && hasAbove) imageName += "right_above_neighbors";
    else if (hasLeft && hasRight && !hasAbove) imageName += "left_right_neighbors";
    else if (hasLeft && !hasRight && !hasAbove) imageName += "left_neighbor";
    else if (!hasLeft && hasRight && !hasAbove) imageName += "right_neighbor";

    imageName += `_${imageVariant}`; // Bruker this.randomValue for å velge bilde
    img = images[imageName];

    imgX = this.corners[0].x;
    imgY = this.corners.find(corner => corner.y === Math.max(...this.corners.map(c => c.y))).y - imgHeight;
  } else {
    // Oppoverpekende trekant logikk
    const hasLeft = this.hasLeftNeighbor();
    const hasRight = this.hasRightNeighbor();
    const hasUnder = this.hasUnderOrAboveNeighbor();
    let imageName = "up_";

    if (hasLeft && hasRight && hasUnder) imageName += "left_right_under_neighbors";
    // Legg til flere betingelser om nødvendig

    imageName += `_${imageVariant}`; // Bruker this.randomValue for å velge bilde
    img = images[imageName];

    imgX = this.center.x - imgWidth / 2;
    imgY = this.corners[2].y;
  }

  if (img) {
    imageMode(CORNER);
    image(img, imgX, imgY, imgWidth, imgHeight);
  }
}

drawSierpinski(depth) {
  this.drawRekursiv(this.corners[0].x, this.corners[0].y, 
                    this.corners[1].x, this.corners[1].y, 
                    this.corners[2].x, this.corners[2].y, depth);
}

drawRekursiv(x1, y1, x2, y2, x3, y3, depth) {
  if (depth === 0) {
    // Tegn trekanten hvis vi har nådd ønsket dybde
    noFill();
    stroke(0);
    strokeWeight(0.5)
    triangle(x1, y1, x2, y2, x3, y3);
  } else {
    // Finn midtpunktene på hver side av trekanten
    let midX12 = (x1 + x2) / 2;
    let midY12 = (y1 + y2) / 2;
    let midX23 = (x2 + x3) / 2;
    let midY23 = (y2 + y3) / 2;
    let midX31 = (x3 + x1) / 2;
    let midY31 = (y3 + y1) / 2;

    // Rekursivt tegn tre nye trekanter
    this.drawRekursiv(x1, y1, midX12, midY12, midX31, midY31, depth - 1);
    this.drawRekursiv(midX12, midY12, x2, y2, midX23, midY23, depth - 1);
    this.drawRekursiv(midX31, midY31, midX23, midY23, x3, y3, depth - 1);
  }
}

drawLineRecursiveTree(depth, branchLength) {
  if (showLines) {
    stroke(255, 0, 0, 60); // Red color for lines
    strokeWeight(2); // Thicker line

    if (this.hasLeftNeighbor()) {
      this.recursiveBranch(this.getMidpoint(this.corners[0], this.corners[2]), this.corners[1], depth, branchLength);
    }

    if (this.hasRightNeighbor()) {
      this.recursiveBranch(this.getMidpoint(this.corners[1], this.corners[2]), this.corners[0], depth, branchLength);
    }

    if (this.hasUnderOrAboveNeighbor()) {
      let oppositeCornerIndex = this.isUp ? 2 : 0;
      this.recursiveBranch(this.getMidpoint(this.corners[0], this.corners[1]), this.corners[oppositeCornerIndex], depth, branchLength);
    }
  }
}

recursiveBranch(start, end, depth, branchLength) {
  if (depth === 0) return;

  // Draw the line
  line(start.x, start.y, end.x, end.y);

  if (depth === 1) return; // Stop recursion after drawing the original line if depth is 1

  // Calculate the direction of the line
  let angle = atan2(end.y - start.y, end.x - start.x);

  // For more dramatic effect, increase the number of branches with depth
  let angles = [60, -60]; // Base angles for triangular degrees
  let nextBranchLength = branchLength / 3; // Decrease length for each recursion

  angles.forEach(a => {
    let newAngle = angle + radians(a);
    let newEnd = {
      x: end.x + nextBranchLength * cos(newAngle),
      y: end.y + nextBranchLength * sin(newAngle)
    };
    this.recursiveBranch(end, newEnd, depth - 1, nextBranchLength);
  });

  // Additional branches for increased complexity
  if (depth > 2) {
    angles.forEach(a => {
      let extraAngle = angle + radians(a + (depth % 2 === 0 ? 30 : -30)); // Alternate the angle slightly for each depth level
      let extraEnd = {
        x: end.x + nextBranchLength * cos(extraAngle),
        y: end.y + nextBranchLength * sin(extraAngle)
      };
      this.recursiveBranch(end, extraEnd, depth - 2, nextBranchLength); // Start these branches at a shallower depth for variety
    });
  }
}


updateGrowthCycles() {
  const currentTime = millis();
  // Beregn intervall basert på musens X-posisjon (f.eks. fra 100 ms til 500 ms)
  const interval = map(mouseX, 0, width, 100, 500, true);

  // Legg til en ny syklus basert på beregnet intervall
  if (this.growthCycles.length === 0 || currentTime - this.growthCycles[this.growthCycles.length - 1] >= interval) {
    this.growthCycles.push(currentTime);
  }

  // Fjern sykluser som er eldre enn 3000 ms
  this.growthCycles = this.growthCycles.filter(cycleStartTime => currentTime - cycleStartTime < 3000);
}

drawGrowingTriangle() {
  this.updateGrowthCycles(); // Oppdaterer listen over vekstsykluser

  push(); // Start en ny tegningstilstand
  translate(this.center.x, this.center.y); // Flytter origo til sentrum av trekanten

  this.growthCycles.forEach(cycleStartTime => {
    const cycleTime = millis() - cycleStartTime; // Tiden siden denne syklusen startet
    const scaleFactor = min(cycleTime / 3000, 1); // Skaleringsfaktor for nåværende syklus

    // Beregn størrelse basert på musens Y-posisjon (f.eks. fra edge_length til edge_length * 3)
    const maxSize = map(mouseY, 0, height, edge_length, edge_length * 6, true);
    const size = maxSize * scaleFactor; // Beregner størrelsen basert på skaleringsfaktoren

    // Beregn opasiteten slik at den falmer ut mot slutten av syklusen
    const alpha = map(cycleTime, 0, 3000, 255, 0, true); // Opasiteten starter på 255 og går til 0

    stroke(0, 0, 0, alpha); // Bruker den beregnede alpha-verdien for gjennomsiktighet
    strokeWeight(1);
    noFill();

    // Bestemmer orientering basert på om trekanten peker opp eller ned
    if (this.isUp) {
      triangle(
        0, -size / sqrt(3),
        -size / 2, size / (2 * sqrt(3)),
        size / 2, size / (2 * sqrt(3))
      );
    } else {
      triangle(
        0, size / sqrt(3),
        -size / 2, -size / (2 * sqrt(3)),
        size / 2, -size / (2 * sqrt(3))
      );
    }
  });

  pop(); // Gjenopprett tidligere tegningstilstand
}

getMidpoint(point1, point2) {
  return {
    x: (point1.x + point2.x) / 2,
    y: (point1.y + point2.y) / 2
  };
}

  label() {
    if (showLabels) {
      // Calculate the center of the triangle
      const center = this.triCenter();
  
      // Set text properties
      textSize(18); // Set the text size
      fill(0); // Set the text color to black
      noStroke(); // Ensure there is no stroke around the text
      textAlign(CENTER, CENTER); // Center the text alignment
  
      // Draw the text at the center of the triangle
      text(`${this.a}, ${this.b}, ${this.c}`, center.x, center.y);
    }
  }

  hasNeighborWithCoords(a, b, c) {
    return this.neighbors.some(neighbor => 
      neighbor.a === a && neighbor.b === b && neighbor.c === c);
  }

  hasLeftNeighbor() {
    // Koordinatene for en venstre nabo avhenger av om trekanten peker opp eller ned
    return this.isUp
      ? this.hasNeighborWithCoords(this.a - 1, this.b, this.c)
      : this.hasNeighborWithCoords(this.a, this.b, this.c + 1);
  }

  hasRightNeighbor() {
    // Koordinatene for en høyre nabo avhenger av om trekanten peker opp eller ned
    return this.isUp
      ? this.hasNeighborWithCoords(this.a, this.b, this.c - 1)
      : this.hasNeighborWithCoords(this.a + 1, this.b, this.c);
  }

  hasUnderOrAboveNeighbor() {
    if (this.isUp) {
      // For oppoverpekende trekanter, sjekker vi for nabo under med b-1
      return this.neighbors.some(neighbor => 
        neighbor.a === this.a && neighbor.b === this.b - 1 && neighbor.c === this.c);
    } else {
      // For nedoverpekende trekanter, sjekker vi for nabo over med b+1
      return this.neighbors.some(neighbor => 
        neighbor.a === this.a && neighbor.b === this.b + 1 && neighbor.c === this.c);
    }
  }



}
