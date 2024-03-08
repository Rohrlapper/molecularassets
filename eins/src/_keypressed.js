
function keyPressed() {

  if (key === '1') {
    showGrowingTriangle = !showGrowingTriangle; // Toggle visning av den voksende trekanten
    redraw(); // Be om ny tegning
  }

  // Toggle visning av trekanter
  if (key === '2') {
    showTriangles = !showTriangles;
    redraw(); // Oppdaterer skjermen uten å re-randomisere
  }

  if (key === '3') {
    // Øk dybden med 1 hver gang tasten trykkes
    sierpinskiDepth = (sierpinskiDepth + 1) % (maxDepth + 1); // +1 for å inkludere tilstanden der ingen tegning vises

    // Tilbakestill til 0 hvis vi når maks dybde + 1 (ingen tegning vises)
    if (sierpinskiDepth > maxDepth) {
      sierpinskiDepth = 0;
    }
    redraw(); // Be om ny tegning for å reflektere endringen
  }

   // Toggle visning av linjer
   if (key === '4' || key === 'l') {
    showLines = !showLines;
    redraw(); // Oppdaterer skjermen uten å re-randomisere
  }

 // Toggle recursive tree display
 if (key === '5' || key === 'z') {
  showRecursiveTree = !showRecursiveTree;
}

  // Toggle visning av sirkler
  if (key === '6') {
    showCircles = !showCircles;
    redraw(); // Oppdaterer skjermen uten å re-randomisere
  }

  // Toggle tilstandsbasert bildevisning
  if (key === '7') {
    showSpecialImages = ! showSpecialImages; // Toggler visningen
    redraw(); // Be om ny tegning uten å re-randomisere
  }

 

 if (key === 'r' || key === 'R') {
    imageVariant = (imageVariant % 4) + 1; // Sykle gjennom 1-4
    console.log('Current Image Variant:', imageVariant); // For feilsøking
    redraw(); // Be om ny tegning
  }

  

  if (key === '9') {
    showLabels = !showLabels;
    redraw(); // Oppdaterer skjermen uten å re-randomisere
  }
 
    if (key === 's') {
      saveGif('mySketch', 5);
    }

  // Randomisering av tilstandsbasert bilde
  if (key === 'r' || key === 'R') {
    // Bruk randomizeValue-metoden for hvert triangel i gridManager
    gridManager.triangles.forEach(triangle => {
      triangle.randomizeValue(); // Bruk metoden istedenfor direkte tilordning
    });
    redraw(); // Oppdaterer skjermen med nye randomiserte verdier
  }

  

   
  // Increase recursion depth
   if (key === 'w') {
    recursiveTreeDepth++; // Increase the depth for more complexity
    redraw(); // Redraw the canvas with the updated depth
  }

  // Decrease recursion depth
  if (key === 'q') {
    recursiveTreeDepth = max(recursiveTreeDepth - 1, 0); // Limit min depth to 0
  }

  

  redraw(); // Redraw the canvas whenever a key is pressed

}
