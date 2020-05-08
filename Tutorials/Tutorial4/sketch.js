let cols, rows;
let size=20;
let cells = [];
let current;
let stack = [];

function setup(){
    createCanvas(640,480);
    cols=floor(width/size);
    rows=floor(height/size);
    for(let i=0; i < cols; i++){
        for(let j=0; j < rows; j++){
            let cell=new Cell(i, j);
            cells.push(cell);
        }
    }
    current = cells[2+4*rows];
}

function draw() {
    background(51);

    let next = current.checkNeighbors();

    if(next){
        stack.push(current);
        Cell.removeWalls(current, next);
        current.state = 'visited';
        current = next;
    } else {
        current.state = 'visited';
        if(stack.length > 0){
            current = stack.pop();
        } else {
            recolor();
        }
    }
    current.state = 'here';


    cells.forEach((cell)=>{
        cell.show();
    })
}

function recolor(){
    cells.forEach((cell)=>{
        cell.state = 'finished';
    })
}
