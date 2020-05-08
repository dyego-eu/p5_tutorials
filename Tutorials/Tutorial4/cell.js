class Cell {
    constructor(column, row){
        this.col = column;
        this.row = row;
        this.top=true;
        this.bot=true;
        this.left=true;
        this.right=true;
        this.state = 'clean';
    }

    static removeWalls(current, next){
        if(current.col == next.col + 1){
            current.left = false;
            next.right = false;
        } else if(current.col == next.col-1){
            current.right = false;
            next.left = false;
        } else if(current.row == next.row+1){
            current.top = false;
            next.bot = false;
        } else if(current.row == next.row-1){
            current.bot = false;
            next.top = false;
        }
    }

    checkNeighbors(){
        let neighbors = [];
        if(this.row != 0 && cells[this.row + rows*this.col - 1].state == "clean"){
            neighbors.push(cells[this.row + rows*this.col - 1])
        }
        if(this.row != rows-1 && cells[this.row + rows*this.col + 1].state == "clean"){
            neighbors.push(cells[this.row + rows*this.col + 1])
        }
        if(this.col != 0 && cells[this.row + rows*(this.col - 1)].state == 'clean'){
            neighbors.push(cells[this.row + rows*(this.col - 1)])
        }
        if(this.col != cols-1 && cells[this.row + rows*(this.col + 1)].state == 'clean'){
            neighbors.push(cells[this.row + rows*(this.col + 1)])
        }
        if (neighbors.length > 0){
            return neighbors[floor(random(0,neighbors.length))]
        } else {
            return undefined;
        }
    }

    show(){
        noStroke();
        if (this.state=='clean'){
            fill(51)
        } else if(this.state=='visited'){
            fill(255,0,255,100)
        } else if(this.state=='here'){
            fill(200,40,40)
        } else if(this.state=='finished'){
            noFill();
        }
        rect(this.col*size,this.row*size, size,size);
        
        stroke(255)
        strokeWeight(4)
        if(this.top){
            line(this.col*size, this.row*size, (this.col+1)*size, this.row*size);
        }
        if(this.bot){
            line(this.col*size, (this.row+1)*size, (this.col+1)*size, (this.row+1)*size);
        }
        if(this.left){
            line(this.col*size, this.row*size, this.col*size, (this.row+1)*size);
        }
        if(this.right){
            line((this.col+1)*size, this.row*size, (this.col+1)*size, (this.row+1)*size);
        }
        
    }
}