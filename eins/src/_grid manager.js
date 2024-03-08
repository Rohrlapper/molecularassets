class GridManager {
  constructor(trianglesData) {
    this.triangles = trianglesData.map(data => new Triangle(data.a, data.b, data.c));
    this.updateNeighbors(); // Initialize neighbors for all triangles
  }

  randomizeTriangleValues() {
    this.triangles.forEach(triangle => triangle.randomizeValue());
  }

  drawGeometry() {
    // Tegner kun geometrien for hver trekant
    this.triangles.forEach(triangle => triangle.drawGeometry());
  }

  showImages() {
    // Tegner bilder for hver trekant hvis aktivert
    if (showSpecialImages) { // Anta at `showSpecialImages` er en global variabel som kontrollerer visningen
      this.triangles.forEach(triangle => triangle.showImages());
    }
  }

  label() {
    if (showLabels) {
      this.triangles.forEach(triangle => triangle.label());
    }
  }

  updateNeighbors() {
    this.triangles.forEach(triangle => {
      const isUp = triangle.pointsUp();
      let neighbors = [];

      if (isUp) {
        neighbors = [
          {a: triangle.a - 1, b: triangle.b, c: triangle.c},
          {a: triangle.a, b: triangle.b - 1, c: triangle.c},
          {a: triangle.a, b: triangle.b, c: triangle.c - 1}
        ];
      } else {
        neighbors = [
          {a: triangle.a + 1, b: triangle.b, c: triangle.c},
          {a: triangle.a, b: triangle.b + 1, c: triangle.c},
          {a: triangle.a, b: triangle.b, c: triangle.c + 1}
        ];
      }

      triangle.neighbors = neighbors.filter(neighbor =>
        this.triangles.some(tri => tri.a === neighbor.a && tri.b === neighbor.b && tri.c === neighbor.c)
      );
    });
  }
}
