class Boid {
    constructor(x,y){
        this.pos = createVector(x,y);
        this.vel = p5.Vector.random2D();
        this.vel.setMag(random(3,5))
        this.acc = createVector(0,0);

        this.maxSpeed = 4;
        this.maxForce = .01;
        this.nearMainBoid = false
        this.mainBoid = false;
    }

    nearBoid(boid, perceptionRadius){
        let d = dist(this.pos.x,this.pos.y, boid.pos.x, boid.pos.y);
        return (d < perceptionRadius);
    }

    getNearBoids(boids, perceptionRadius){
        let nearBoids = [];
        boids.forEach((boid)=>{
            let d = dist(this.pos.x,this.pos.y, boid.pos.x, boid.pos.y);
            if (d < perceptionRadius && boid !== this){
                nearBoids.push(boid);
            }
        })
        return nearBoids
    }

    align(boids){
        let steer = createVector(0,0);
        let nearBoids = this.getNearBoids(boids, 50)

        if(nearBoids.length > 0){
            nearBoids.forEach((boid)=>{
                steer.add(boid.vel)
            });
            steer.div(nearBoids.length);
        }
        steer.setMag(this.maxSpeed);
        steer.sub(this.vel);
        steer.limit(this.maxForce);
        return steer;
    }

    cohesion(boids){
        let steer = createVector(0,0);
        let nearBoids = this.getNearBoids(boids, 50)

        if(nearBoids.length > 0){
            nearBoids.forEach((boid)=>{
                steer.add(boid.pos.sub(this.pos))
            });
            steer.div(nearBoids.length);
        }
        steer.sub(this.vel);
        steer.limit(this.maxForce);
        this.applyForce(steer);
    }

    applyForce(force){
        this.acc.add(force)
    }

    update(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

        if(this.pos.x > width){
            this.pos.x = 0;
        } else if(this.pos.y < 0){
            this.pos.x = width;
        }
        if(this.pos.y > height){
            this.pos.y = 0;
        } else if(this.pos.y < 0){
            this.pos.y = height;
        }
    }


    show(){
        stroke(255);
        fill(255, 255,255, 255);
        if(this.nearMainBoid){
            fill(255,0,0);
        } else if (this.mainBoid){
            fill(0,0,255);
        }
        ellipse(this.pos.x, this.pos.y, 10,10);
        
    }
}