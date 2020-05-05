let angle = 0;

function setup(){
    createCanvas(650,480, WEBGL);
    rectMode(CENTER);
}

function draw() {
    let v = createVector(mouseX-200 ,mouseY-200, 0)
    v.normalize()

    directionalLight(250, 250, 255, v)
    background(175);
    push()
    specularMaterial(200,20,20);
    translate(0,0,0)
    rotateY(angle);
    stroke(0);
    sphere(50);
    pop();


    push();
    translate(0,0,0);
    rotateY(-angle);
    
    strokeWeight(2);
    ambientMaterial(10,10,255);
    stroke(0);
    torus(100,50);
    pop()

    
    angle += .01;
}
