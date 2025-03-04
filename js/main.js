const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let counter = 0;
let aux = 0;

let counterTag = document.createElement("p");
counterTag.id = "counter";



// Obtiene las dimensiones de la pantalla actual
const window_height = 300;
const window_width = 300;

// El canvas tiene las mismas dimensiones que la pantalla
canvas.height = window_height;
canvas.width = window_width;

// canvas.style.background = "#ff8";

class Circle {
  constructor(x, y, radius, color, text, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    
    this.speed = speed;
    
    this.dx = 0.3 * this.speed;
    this.dy = 0.3 * this.speed;
  }
  
  draw(context) {
    context.beginPath();
    
    context.strokeStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillText(this.text, this.posX, this.posY);
    
    context.lineWidth = 2;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }
  
  update(context) {
    // Context.clearRect(0, 0, window_width, window_height); // Descomentar si deseas borrar el canvas
    document.getElementById("counter-card").appendChild(counterTag);
    
    this.draw(context);
    aux = counter;

    // Si el círculo supera el margen derecho, se mueve a la izquierda
    if (this.posX + this.radius > window_width) {
      this.dx = -this.dx;
      counter++;
    }

    // Si el círculo supera el margen izquierdo, se mueve a la derecha
    if (this.posX - this.radius < 0) {
      this.dx = -this.dx;
      counter++;
    }

    // Si el círculo supera el margen superior, se mueve hacia abajo
    if (this.posY - this.radius < 0) {
      this.dy = -this.dy;
      counter++;
    }

    // Si el círculo supera el margen inferior, se mueve hacia arriba
    if (this.posY + this.radius > window_height) {
      this.dy = -this.dy;
      counter++;
    }
    

    if(aux != counter) {
      counterTag.innerHTML = counter;
    }

    this.posX += this.dx;
    this.posY += this.dy;
  }
}

let randomRadius = Math.floor(Math.random() * 100 + 30);
let randomX = Math.random() * (window_width - randomRadius * 2) + randomRadius;  // Asegura que el círculo no se salga por los bordes
let randomY = Math.random() * (window_height - randomRadius * 2) + randomRadius;  // Lo mismo para Y



// Crear el círculo con la posición y tamaño calculado
let miCirculo = new Circle(randomX, randomY, randomRadius, "blue", "Tec1", 5);
miCirculo.draw(ctx);

let miCirculo2 = new Circle(randomX, randomY, randomRadius, "red", "Tec2", 2);
miCirculo2.draw(ctx);

// Función para actualizar el círculo
let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, window_width, window_height);
  miCirculo.update(ctx);
  miCirculo2.update(ctx);
};

updateCircle();
