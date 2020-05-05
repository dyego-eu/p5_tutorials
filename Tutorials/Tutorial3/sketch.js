
let fireworks = [];
let gravity;

function setup(){
    createCanvas(650,480);
    stroke(255);
    strokeWeight(5);
    gravity = createVector(0,.2);
    
    fireworks.forEach((firework)=>{
        firework.launch();
    })
}

function draw() {
    background(0,0,0,20);

    if(random(1)<.05){
        fireworks.push(new Firework());
    }

    fireworks.forEach((firework)=>{
        firework.update();
    })
    checkRelaunch();
}

function checkRelaunch(){
    fireworks.forEach((firework, index, obj)=>{
        if(firework.pos.y > height){
            obj.splice(index,1);
        }
    })
}