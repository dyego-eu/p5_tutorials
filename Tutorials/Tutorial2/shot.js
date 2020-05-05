class Shot extends Particle {
    constructor(pos,vel=createVector(0,0),acc=createVector(0,0), health=30){
        super(pos,vel,acc);
        this.health = health;
        this.pos_prev = this.position;
    }

    move(){
        this.pos_prev = this.position;
        this.velocity = p5.Vector.add(this.velocity, this.acceleration);
        this.position = p5.Vector.add(this.position, this.velocity);
        if (this.position.x > width){
            this.position.x = 0;
            this.pos_prev = this.position;
        }
        if (this.position.x < 0){
            this.position.x = width;
            this.pos_prev = this.position;
        }
        if (this.position.y > height){
            this.position.y = 0;
            this.pos_prev = this.position;
        }
        if (this.position.y < 0){
            this.position.y = height;
            this.pos_prev = this.position;
        }
        this.acceleration = 0;

        this.ang_vel += this.ang_acc;
        this.ang_pos += this.ang_vel;
        this.ang_acc = 0
    }

    draw(){
        this.health -=1;
        push();
            strokeWeight(5);
            stroke(255);
            line(this.pos_prev.x, this.pos_prev.y, this.position.x, this.position.y)
        pop();
    }
}