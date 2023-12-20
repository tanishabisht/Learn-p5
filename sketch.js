let hourParticles = [];
let minParticles = [];
let secParticles = [];
let isHourParticlesColored = true; 
let isMinParticlesColored = true; 
let isSecParticlesColored = true; 

const hourSpeed = 0.003;
const minSpeed = 0.006;
const secSpeed = 0.009;

function setup() {
    createCanvas(800, 600);
    stroke('#2B303A');
    createParticles();
}

function draw() {
    background(isAM() ? '#EDE7E3' : '#2B303A');

    let t = new Date();
    let currHour = t.getHours();
    let currMin = t.getMinutes();
    let currSec = t.getSeconds();

    updateParticles(currHour, currMin, currSec);
    displayParticles();

    fill(255);
    textSize(16);
    textAlign(RIGHT, BOTTOM);
    text(nf(currHour, 2) + ':' + nf(currMin, 2) + ':' + nf(currSec, 2), width - 10, height - 10);
}

function createParticles() {
    createParticlesArray(hourParticles, 12, hourSpeed);
    createParticlesArray(minParticles, 12, minSpeed);
    createParticlesArray(secParticles, 60, secSpeed);
}

function updateParticles(currHour, currMin, currSec) {
    updateParticlesArray(hourParticles, currHour, hourSpeed);
    updateParticlesArray(minParticles, Math.ceil(currMin/5), minSpeed);
    updateParticlesArray(secParticles, currSec, secSpeed);
}

function createParticlesArray(particleArray, maxParticles, speed) {
    for (let i = 0; i < maxParticles; i++) {
        particleArray.push(new Particle(speed));
    }
}

function updateParticlesArray(particleArray, value, speed) {
    let diff = value - particleArray.length;

    if (diff > 0) {
        createParticlesArray(particleArray, diff, speed);
    } else if (diff < 0) {
        for (let i = 0; i < abs(diff); i++) {
        particleArray.pop();
        }
    }

    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update(value, particleArray.length);
    }
}

function displayParticles() {
    let hourColor = isAM() ? '#16697A' : '#0C7C59';
    let minColor = isAM() ? '#FFA62B' : '#58A4B0';
    let secColor = isAM() ? '#82C0CC' : '#BAC1B8';
    let grayColor = isAM() ? '#CFC6C1' : '#484D58'

    for (let i = 0; i < hourParticles.length; i++) {
        fill(isHourParticlesColored ? hourColor : grayColor);
        hourParticles[i].display(40);
    }

    for (let i = 0; i < minParticles.length; i++) {
        fill(isMinParticlesColored ? minColor : grayColor);
        minParticles[i].display(25);
    }

    for (let i = 0; i < secParticles.length; i++) {
        fill(isSecParticlesColored ? secColor : grayColor);
        secParticles[i].display(14);
    }
}

function isAM() {
    let t = new Date();
    let currHour = t.getHours();
    return currHour < 12;
}

function mousePressed() {
    for (let i = 0; i < hourParticles.length; i++) {
        let d = dist(mouseX, mouseY, hourParticles[i].x, hourParticles[i].y);
        if (d < 20) {
            isHourParticlesColored = true;
            isMinParticlesColored = false;
            isSecParticlesColored = false;
            return;
        }
    }

    for (let i = 0; i < minParticles.length; i++) {
        let d = dist(mouseX, mouseY, minParticles[i].x, minParticles[i].y);
        if (d < 12.5) {
            isHourParticlesColored = false;
            isMinParticlesColored = true;
            isSecParticlesColored = false;
            return;
        }
    }

    for (let i = 0; i < secParticles.length; i++) {
        let d = dist(mouseX, mouseY, secParticles[i].x, secParticles[i].y);
        if (d < 7) {
            isHourParticlesColored = false;
            isMinParticlesColored = false;
            isSecParticlesColored = true;
            return;
        }
    }
    isHourParticlesColored = true;
    isMinParticlesColored = true;
    isSecParticlesColored = true;
}


class Particle {
    constructor(speed) {
        this.x = random(width);
        this.y = random(height);
        this.angle = random(TWO_PI);
        this.radius = random(50, 250);
        this.speed = speed;
    }

    update(value, modulo) {
        let timeAngle = map(value % modulo, 0, modulo, 0, TWO_PI);
        this.angle += this.speed;
        this.x = width / 2 + this.radius * cos(this.angle + timeAngle);
        this.y = height / 2 + this.radius * sin(this.angle + timeAngle);
    }

    display(size) {
        ellipse(this.x, this.y, size, size);
    }
}
