var i;
var j;
var k;

function setup(){
    createCanvas(650,480);
    i = 0;
    j = 0;
    k = 0;
}

function draw() {
    i+=11;
    j+=12;
    k+=13
    strokeWeight(20);
    stroke(10,10,100);
    fill(
        i%512 < 255 ? i%512 : 512 - i%512, 
        j%512 < 255 ? j%512 : 512 - j%512,
        k%512 < 255 ? k%512 : 512 - k%512
    );
    rect(0,0,100,100)
}