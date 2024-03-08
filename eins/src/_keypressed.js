
function keyPressed() {
  // Toggle visning av trekanter
  if (key === 'T' || key === 't') {
    showTriangles = !showTriangles;
    redraw(); // Oppdaterer skjermen uten å re-randomisere
  }

  if (key === 'e' || key === 'E') {
    showLabels = !showLabels;
    redraw(); // Oppdaterer skjermen uten å re-randomisere
  }

  // Toggle visning av linjer
  if (key === 'L' || key === 'l') {
    showLines = !showLines;
    redraw(); // Oppdaterer skjermen uten å re-randomisere
  }

  // Toggle visning av sirkler
  if (key === 'C' || key === 'c') {
    showCircles = !showCircles;
    redraw(); // Oppdaterer skjermen uten å re-randomisere
  }

  // Toggle tilstandsbasert bildevisning
  if (key === 'A' || key === 'a') {
    showSpecialImages = ! showSpecialImages; // Toggler visningen
    redraw(); // Be om ny tegning uten å re-randomisere
  }

  if (key === 'S' || key === 's') {
    // Øk dybden med 1 hver gang tasten trykkes
    sierpinskiDepth = (sierpinskiDepth + 1) % (maxDepth + 1); // +1 for å inkludere tilstanden der ingen tegning vises

    // Tilbakestill til 0 hvis vi når maks dybde + 1 (ingen tegning vises)
    if (sierpinskiDepth > maxDepth) {
      sierpinskiDepth = 0;
    }
    redraw(); // Be om ny tegning for å reflektere endringen
  }

 if (key === 'N' || key === 'n') {
    imageVariant = (imageVariant % 4) + 1; // Sykle gjennom 1-4
    console.log('Current Image Variant:', imageVariant); // For feilsøking
    redraw(); // Be om ny tegning
  }
 
    if (key === 'q') {
      saveGif('mySketch', 5);
    }

  // Randomisering av tilstandsbasert bilde
  if (key === 'R' || key === 'r') {
    // Bruk randomizeValue-metoden for hvert triangel i gridManager
    gridManager.triangles.forEach(triangle => {
      triangle.randomizeValue(); // Bruk metoden istedenfor direkte tilordning
    });
    redraw(); // Oppdaterer skjermen med nye randomiserte verdier
  }

  if (key === 'F' || key === 'f') {
    showGrowingTriangle = !showGrowingTriangle; // Toggle visning av den voksende trekanten
    redraw(); // Be om ny tegning
  }

   // Toggle recursive tree display
   if (key === 'Z' || key === 'z') {
    showRecursiveTree = !showRecursiveTree;
  }

  // Increase recursion depth
   if (key === '2') {
    recursiveTreeDepth++; // Increase the depth for more complexity
    redraw(); // Redraw the canvas with the updated depth
  }

  // Decrease recursion depth
  if (key === '1') {
    recursiveTreeDepth = max(recursiveTreeDepth - 1, 0); // Limit min depth to 0
  }


  redraw(); // Redraw the canvas whenever a key is pressed

}
