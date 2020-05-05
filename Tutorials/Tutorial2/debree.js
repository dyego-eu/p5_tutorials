class Debree extends Particle{
    constructor(pos,vel=createVector(0,0),acc=createVector(0,0), health=60){
        super(pos,vel,acc);
        this.health = health;
        this.pos_prev = this.position;
    }

    draw(){
        this.health -=1;
        push();
            translate(this.position.x,this.position.y);
            stroke(floor(this.health/60.0 * 255));
            strokeWeight(2);
            rotate(this.ang_pos)
            line(-7,0,7,0)
        pop();
    }
}