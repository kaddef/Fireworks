var fireworks = new Array();
var particles = new Array();

let fCount = 1;
let pCount = 30;
let size = 10;
let gravity = 0.01;

const fCountInput = document.getElementById("fCountInput")
const pCountInput = document.getElementById("pCountInput")
const sizeInput = document.getElementById("sizeInput")
const gravityInput = document.getElementById("gravityInput")


fCountInput.addEventListener('input', updateValues);
pCountInput.addEventListener('input', updateValues);
sizeInput.addEventListener('input', updateValues);
gravityInput.addEventListener('input', updateValues);

function updateValues() {
    var newCount = parseInt(fCountInput.value);
    if (!isNaN(newCount)) {
        if (newCount > 10) {
            newCount = 10;
            fCountInput.value = 10;
        }
        if (newCount !== fCount) {
            updateRaindropCount(newCount);
        }
    }
    pCount = parseInt(pCountInput.value);
    size = parseInt(sizeInput.value);
    gravity = parseFloat(gravityInput.value); 
}

function updateRaindropCount(newCount) {
    fCount = newCount;
    if (fireworks.length < fCount) {
        while (fireworks.length < fCount) {
            fireworks.unshift(new Firework);
        }
    } else if (fireworks.length > fCount) {
        fireworks.splice(fCount);
    }
}

function setup() {
    frameRate(60)
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < fCount; i++) {
        fireworks.unshift(new Firework)
    }
}

function draw() {
    background(0,10);
    fireworks.forEach(firework => {
        firework.move()
        firework.draw()
    });
    particles.forEach((particle, i) => {
        particle.move()
        particle.draw()
        if(particle.horizonalSpeed == 0 || particle.verticalSpeed == 0 || particle.lifespan <= 0){
            particles.splice(i,1)
        }
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Firework {
    posX = Math.random() * windowWidth;
    posY = windowHeight + Math.random()*100+200;
    color = color(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255));
    horizonalSpeed = 25;
    direction = this.posX < windowWidth/2 ? 1 : -1
    verticalSpeed = Math.random() * 3 * this.direction;
    gravity = 0.4;
    disabled = false;

    constructor() {
        
    }
    reset() {
        this.posX = Math.random() * windowWidth;
        this.posY = windowHeight + Math.random()*200 - 100;
        this.color = color(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255));
        this.horizonalSpeed = 25;
        this.direction = this.posX < windowWidth/2 ? 1 : -1
        this.verticalSpeed = Math.random() * 3 * this.direction;
        this.gravity = 0.4;
        this.disabled = false;
    }

    move() {
        this.posY -= this.horizonalSpeed;
        this.posX += this.verticalSpeed;
        this.horizonalSpeed -= this.gravity;
        //console.log(this.horizonalSpeed)
        if (this.horizonalSpeed <= -1) {
            this.explode();
        }
    }

    explode() {
        this.horizonalSpeed = 0;
        this.verticalSpeed = 0;
        this.gravity = 0;
        for (let i = 0; i < pCount; i++) {
            particles.unshift(new Particle(this.posX, this.posY, this.color));
        }
        this.disabled = true;
        setTimeout(() => {
            this.reset();
        }, 2000);  // 2 seconds delay before resetting
    }

    draw() {
        if (!this.disabled) {
            noStroke();
            fill(this.color);
            ellipse(this.posX, this.posY, size, size);
        }
    }
}

class Particle {
    posX;
    posY;
    color;
    horizonalSpeed = Math.random() * 12 - 6;
    verticalSpeed = Math.random() * 12 - 6;
    gravity = gravity;
    drag = 0.8
    disabled = false
    lifespan;

    constructor(x,y,color,lifespan = 100) {
        this.posX = x;
        this.posY = y;
        this.color = color;
        this.lifespan = lifespan;
    }

    move() {
        this.posY -= this.horizonalSpeed;
        this.posX += this.verticalSpeed;
        
        this.horizonalSpeed -= this.gravity;
        //console.log(this.horizonalSpeed)
        if(this.posY >= windowHeight - 0 || this.posX <= 0 || this.posX >= windowWidth - 0) {
            this.horizonalSpeed = 0;
            this.verticalSpeed = 0;
            this.gravity = 0;
        }

        this.lifespan--;
    }

    draw() {
        if(!this.disabled && this.lifespan > 0){
            noStroke();
            fill(this.color);
            ellipse(this.posX, this.posY, size, size)
        }
    }
}