class Particle {
    constructor(pos,vel=createVector(0,0),acc=createVector(0,0)){
        this.position = pos;
        this.velocity = vel;
        this.acceleration = acc;

        this.ang_pos = 0;
        this.ang_vel = 0;
        this.ang_acc = 0;
    }

    applyForce(force){
        this.acceleration += force;
    }

    applyTorque(torque){
        this.ang_vel = torque;''
    }

    move(){
        this.velocity = p5.Vector.add(this.velocity, this.acceleration);
        this.position = p5.Vector.add(this.position, this.velocity);
        if (this.position.x > width){
            this.position.x = 0;
        }
        if (this.position.x < 0){
            this.position.x = width;
        }
        if (this.position.y > height){
            this.position.y = 0;
        }
        if (this.position.y < 0){
            this.position.y = height;
        }
        this.acceleration = 0;

        this.ang_vel += this.ang_acc;
        this.ang_pos += this.ang_vel;
        this.ang_acc = 0
    }

   
}