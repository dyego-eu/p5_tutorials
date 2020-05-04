var ballSize;

function setup(){
    createCanvas(650,480);
    ballSize=100;
}

function draw() {
    background(200);
    stroke(0);
    strokeWeight(3);
    ellipse(mouseX, mouseY, ballSize, ballSize);
}

function mouseWheel(event){
    ballSize += event.delta;
}