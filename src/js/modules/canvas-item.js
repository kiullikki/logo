export class CanvasItem {
  constructor(canvasData) {
    this.canvas = canvasData.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.colors = canvasData.colors;
    this.sizes = canvasData.drawElemSizes;
  }

  init() {
    return new Promise((resolve) => {
      this.draw();
      resolve();
    });
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw() {
    this.canvas.width = +this.canvas.getAttribute('data-width');
    this.canvas.height = +this.canvas.getAttribute('data-height');
  }
}
