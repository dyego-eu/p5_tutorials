let ship;
const FORCE = 0.2;
const SPIN = 0.1;
const SHOT_LIMIT = 1;
const INIT_ASTEROID = 3;
let shots;
let asteroids;
let debree_pieces;


function setup(){
    let canvas = createCanvas(800,600);
    canvas.parent('sketch-holder');
    shots = [];
    asteroids = [];
    debree_pieces = [];
    frameRate(30);
    ship = new Ship(createVector(400,300));
    for (let index = 0; index < INIT_ASTEROID; index++){
        asteroids.push(new Asteroid(createVector(random(width),random(height)), createVector(random(-4,4),random(-4,4))))

    }
}

function draw(){
    background(0);

    checkKeys();

    collisionCheck();

    moveShots();

    moveAsteroids();

    if (ship.wrecked){
        moveDebree();
    } else {
        moveShip();
    }
}

function collisionCheck(){
    let new_asteroids = [];

    asteroids.forEach((asteroid, ast_ind, ast_obj)=>{
        shots.forEach((shot, shot_ind, shot_obj)=>{
            asteroid.amIShot(shot);
            if (asteroid.isShot){
                shot_obj.splice(shot_ind, 1);
                new_asteroids = new_asteroids.concat(asteroid.crackAsteroid(
                    createVector(
                        shot.position.x - shot.pos_prev.x, 
                        shot.position.y - shot.pos_prev.y
                    ).setMag(2)
                ))
            }
        })
        current_status = ship.wrecked;
        ship.amIWrecked(asteroid);
        if (current_status !=ship.wrecked){
            debree_pieces = ship.createDebree();
        }
    })
    
    asteroids = asteroids.concat(new_asteroids)
}

function checkKeys(){
    if (keyIsDown(87)){
        ship.thrust(FORCE);
    } else if (keyIsDown(83)){
        ship.thrust(-FORCE);
    } else {
        ship.thrusting = false;
    }
    if (keyIsDown(68)){
        ship.steer(SPIN);
    }
    if (keyIsDown(65)){
        ship.steer(-SPIN);
    }
    if (keyIsDown(82)){
        setup();
    }
}

function keyPressed(){
    if (key==' ' && shots.length < SHOT_LIMIT){
        let shot = ship.shoot();
        if (shot){
            shots.push(shot);
        }
    }
}

function moveShots(){
    shots.forEach((shot, index, obj)=>{
        if (shot.health <=0){
            obj.splice(index,1);
        }
        shot.move();
        shot.draw();
    })
}

function moveDebree(){
    debree_pieces.forEach((debree, index, obj)=>{
        if (debree.health <=0){
            obj.splice(index,1);
        }
        debree.move();
        debree.draw();
    })
}

function moveAsteroids(){
    asteroids.forEach((asteroid, index, obj)=>{
        if(asteroid.isShot || asteroid.size  < 10){
            obj.splice(index, 1)
        } else {
            asteroid.move();
            asteroid.draw();
        }
    })
}

function moveShip(){
    ship.move();
    ship.draw();
}