class Ship extends Particle{

    constructor(pos,vel=createVector(0,0),acc=createVector(0,0)){
        super(pos,vel,acc);
        this.thrusting = false;
        this.wrecked = false;
    }

    steer(increment){
        this.ang_pos += increment;
    }
    
    thrust(intensity){
        this.acceleration = p5.Vector.fromAngle(this.ang_pos - PI/2, intensity);
        this.thrusting = true;
    }

    shoot(){
        if (!this.wrecked){
            return new Shot(this.position, p5.Vector.fromAngle(this.ang_pos - PI/2, 20));
        }
    }

    amIWrecked(asteroid){
        let asteroid_poly = [];
        asteroid.shape.forEach((point)=>{
            asteroid_poly.push(p5.Vector.add(point, asteroid.position));
        })
        let ship_poly = [
            createVector(ship.position.x - 10, ship.position.y + 10),
            createVector(ship.position.x + 10, ship.position.y + 10),
            createVector(ship.position.x + 0 , ship.position.y - 20)
        ]
        this.wrecked = this.wrecked || collidePolyPoly(asteroid_poly, ship_poly);
    }

    createDebree(){
        let piece1 = new Debree(this.position, p5.Vector.fromAngle(this.ang_pos + TWO_PI/3, 3));
        piece1.ang_vel = (random(-PI/10, PI/10))
        let piece2 = new Debree(this.position, p5.Vector.fromAngle(this.ang_pos + 2*TWO_PI/3, 3));
        piece2.ang_vel = (random(-PI/10, PI/10))
        let piece3 = new Debree(this.position, p5.Vector.fromAngle(this.ang_pos + TWO_PI, 3));
        piece3.ang_vel = (random(-PI/10, PI/10))
        return [piece1, piece2, piece3];
    }

    draw(){
        push();
            translate(this.position.x,this.position.y);
            rotate(this.ang_pos)
            if (!this.wrecked){
                fill(0)
                stroke(255);
                strokeWeight(2);
                beginShape();
                vertex(-10, 10);
                vertex(10, 10);
                vertex(0, -20);
                endShape(CLOSE);
                if(this.thrusting && frameCount % 4 in [0,1]){
                    fill(255,0,0);
                    beginShape();
                    vertex(-5, 10);
                    vertex(5, 10);
                    vertex(0, 20);
                    endShape(CLOSE);
                }
            }
        pop();
    }
}