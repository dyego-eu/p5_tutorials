class Firework extends Particle {
    constructor(){
        super(1,1)
        this.launch();
    }

    update(){
        this.applyForce(gravity);
        super.update();
        this.show();
    }

    launch(){
        this.pos = createVector(random(width), height);
        this.vel = createVector(random(-.5,.5),-13 + random(1));
    }
}