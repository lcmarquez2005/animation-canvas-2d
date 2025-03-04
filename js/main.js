const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Obtiene las dimensiones de la pantalla actual
const window_height = 300;
const window_width = 300;

// El canvas tiene las mismas dimensiones que la pantalla
canvas.height = window_height;
canvas.width = window_width;

class Circle {
  constructor(x, y, radius, color, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
    this.bounceCount = 0; // Contador de rebotes individual
  }

  draw(context) {
    context.beginPath();
    context.strokeStyle = this.color;
    context.lineWidth = 2;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();

    // Dibujar el contador de rebotes dentro del círculo
    context.fillStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "16px Arial";
    context.fillText(this.bounceCount, this.posX, this.posY);
  }

  update(context) {
    this.draw(context);

    // Verificar colisiones y actualizar contador de rebotes
    if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
      this.dx = -this.dx;
      this.bounceCount++;
    }

    if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
      this.dy = -this.dy;
      this.bounceCount++;
    }

    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// Crear dos círculos con posiciones aleatorias
let circle1 = new Circle(
  Math.random() * (window_width - 60) + 30,
  Math.random() * (window_height - 60) + 30,
  Math.random() * 30 + 30,
  "blue",
  5
);

/* let circle2 = new Circle(
  Math.random() * (window_width - 60) + 30,
  Math.random() * (window_height - 60) + 30,
  Math.random() * 30 + 10,
  "red",
  2
); */

// Función para actualizar los círculos
function updateCircles() {
  requestAnimationFrame(updateCircles);
  ctx.clearRect(0, 0, window_width, window_height);
  circle1.update(ctx);
  circle2.update(ctx);
}

updateCircles();
