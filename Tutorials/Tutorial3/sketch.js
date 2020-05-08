let variable;
let flock = [];

function setup(){
    createCanvas(800,600);
    for(let i=0; i<100; i++){
        flock.push(new Boid(random(width), random(height)));
    }
}

function draw() {
    // Comment 
    background(51);
    flock[0].mainBoid=true;

    flock.forEach((boid, index)=>{
        if (index != 0 && boid.nearBoid(flock[0], 100)){
            boid.nearMainBoid=true;
        } else {
            boid.nearMainBoid = false;
        }
        boid.update();
        boid.show();
        
    })
}