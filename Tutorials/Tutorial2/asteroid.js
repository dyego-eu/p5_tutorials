class Asteroid extends Particle{
    constructor(pos,vel=createVector(0,0),acc=createVector(0,0), size=50, immunity = 8){
        super(pos,vel,acc);
        this.size = size;
        this.shape = new Array(15);
        this.generateShape();
        this.ang_vel = random(-PI/80, PI/80)
        this.isShot = false;
        this.immunity = immunity;
    }

    generateShape(){
        for (let index = 0; index < 15; index++) {
           this.shape[index] = p5.Vector.fromAngle(TWO_PI / 15 * index, this.size*.5 + random(this.size*.5));
        }
    }

    amIShot(shot){
        this.isShot = (this.isShot || collideLinePoly(
                -shot.position.x + this.position.x,
                -shot.position.y + this.position.y,
                -shot.pos_prev.x + this.position.x,
                -shot.pos_prev.y + this.position.y,
                this.shape 
            )) && (this.immunity <= 0)
    }

    crackAsteroid(dir){
        let left_asteroid = new Asteroid(this.position, p5.Vector.add(this.velocity,dir.rotate(PI/4)), createVector(0,0), this.size/2);
        let right_asteroid = new Asteroid(this.position, p5.Vector.add(this.velocity,dir.rotate(-PI/4)), createVector(0,0), this.size/2);
        
        return [left_asteroid, right_asteroid]
    }

    draw(){
        this.immunity -= this.immunity > 0 ? 1 : 0 ;
        push();
            fill(0);
            stroke(255);
            strokeWeight(1.5);
            translate(this.position.x,this.position.y);
            rotate(this.ang_pos)
            beginShape();
            this.shape.forEach((v) => {
                vertex(v.x, v.y)
            })
            endShape(CLOSE);
        pop()
    }
}