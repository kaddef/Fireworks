let BACKGROUNDCOLOR;
var firework
var fireworks = new Array();
var particles = new Array();
function setup() {
    createCanvas(windowWidth, windowHeight);
    BACKGROUNDCOLOR = color(0,0,0);
    firework = new Firework()
    for (let i = 0; i < 3; i++) {
        fireworks.unshift(new Firework)
    }
}

function draw() {
    background(0,10);
    fireworks.forEach(firework => {
        firework.move()
        firework.draw()
    });
    particles.forEach(particle => {
        particle.move()
        particle.draw()
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Firework {
    posX = Math.random() * windowWidth;
    posY = windowHeight + Math.random()*200 - 100;
    color = color(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255));
    horizonalSpeed = 25;
    direction = this.posX < windowWidth/2 ? 1 : -1
    verticalSpeed = Math.random() * 3 * this.direction;
    gravity = 0.4;

    constructor() {
        console.log(this.verticalSpeed)
    }
    reset() {
        this.posX = Math.random() * windowWidth;
        this.posY = windowHeight + Math.random()*200 - 100;
        this.color = color(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255));
        this.horizonalSpeed = 25;
        this.direction = this.posX < windowWidth/2 ? 1 : -1
        this.verticalSpeed = Math.random() * 3 * this.direction;
        this.gravity = 0.4;
    }

    move() {
        this.posY -= this.horizonalSpeed;
        this.posX += this.verticalSpeed;
        this.horizonalSpeed -= this.gravity;
        //console.log(this.horizonalSpeed)
        if(this.horizonalSpeed <= -10) {
            this.horizonalSpeed = 0;
            this.verticalSpeed = 0;
            this.gravity = 0;
            //EXPLODE
            for (let i = 0; i < 30; i++) {
                particles.unshift(new Particle(this.posX,this.posY,this.color))
            }
            //console.log(this)
            this.reset();
        }
    }

    draw() {
        noStroke();
        fill(this.color);
        ellipse(this.posX, this.posY, 10, 10)
    }
}

class Particle {
    posX;
    posY;
    color;
    horizonalSpeed = Math.random() * 12 - 6;
    verticalSpeed = Math.random() * 12 - 6;
    gravity = 0.1;
    disabled = false

    constructor(x,y,color) {
        this.posX = x;
        this.posY = y;
        this.color = color;
    }

    move() {
        this.posY -= this.horizonalSpeed;
        this.posX += this.verticalSpeed;
        this.horizonalSpeed -= this.gravity;
        //console.log(this.horizonalSpeed)
        if(this.posY >= windowHeight - 30 || (this.posX <= 30 && this.posX >= windowWidth - 30)) {
            this.horizonalSpeed = 0;
            this.verticalSpeed = 0;
            this.gravity = 0;
        }
    }

    draw() {
        if(!this.disabled){
            noStroke();
            fill(this.color);
            ellipse(this.posX, this.posY, 10, 10)
        }
    }
}