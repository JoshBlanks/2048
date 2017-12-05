var grid = [];
var psuedoGrid = [
                  0, 0, 0, 0, // 1 -> 4
                  0, 0, 0, 0, // 5 -> 8
                  0, 0, 0, 0, // 9 -> 12
                  0, 0, 0, 0 // 13 -> 16
                 ];

function setup() {
    createCanvas(500, 500);
    for(var x = 0; x < 4; x++) {
        for(var y = 0; y < 4; y++) {
            grid.push(new Grid(x, y));
        }
    } 
    
    // Each game starts with 2 tiles
    generateTile();
    generateTile();
    
    printGrid();
}

function draw() {
    background(255);
    for (var b = 0; b < grid.length; b++) {
        grid[b].show();
    }
  
}

function Grid(x, y) {
    this.x = x;
    this.y = y;
    
    this.show = function() {
        fill(255);
        stroke(0);
        rect(this.x * 100, this.y * 100, 100, 100)
    }
}

function generateTile() {
    var placedTile = false;
    while(placedTile == false) {
        var tile = Math.floor(Math.random() * 16);
        var percentage = Math.random();
        if(psuedoGrid[tile] === 0){
            if(percentage >= 0.9) {
                psuedoGrid[tile] = 4;
            } else {
                psuedoGrid[tile] = 2;
            }
            
            placedTile = true;  
        } 
    }
}

// Check if furthest block in direction is populated
// if not, slide number all the way
// if numbers equal, slide all the way and add
// if numbers not equal, slide number to furthest open block
//
// Generate a random tile after moving
function keyPressed() {
    if (keyCode === LEFT_ARROW ) {
        checkLeft();
    } else if (keyCode === RIGHT_ARROW) {
        checkRight();
    } else if (keyCode === UP_ARROW) {
        checkUp();
    } else if (keyCode === DOWN_ARROW) {
        checkDown();
    }
}

function checkLeft() {
    // rows are blocks: 0, 4, 8, 12
    /*
    for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++) {
            
        }
    }
    */
    
    // first row is empty, move tile to left side
    if((psuedoGrid[0] == 0) && (psuedoGrid[1] == 0) && (psuedoGrid[2] == 0) && (psuedoGrid[3] > 0)) {
        psuedoGrid[0] = psuedoGrid[3];
        psuedoGrid[3] = 0;
    } else if ((psuedoGrid[0] == 0) && (psuedoGrid[1] == 0) && (psuedoGrid[3] == 0) && (psuedoGrid[2] > 0)) {
        psuedoGrid[0] = psuedoGrid[2];
        psuedoGrid[2] = 0;
    } else if ((psuedoGrid[0] == 0) && (psuedoGrid[1] > 0)) {
        psuedoGrid[0] = psuedoGrid[1];
        psuedoGrid[1] = 0;
    }
    
    if((psuedoGrid[0] > 0) && (psuedoGrid[1] == 0) && (psuedoGrid[2] > 0) && (psuedoGrid[0] != psuedoGrid[3])) {
        psuedoGrid[1] = psuedoGrid[2];
        psuedoGrid[2] = 0;
    } else if((psuedoGrid[0] > 0) && (psuedoGrid[1] == 0) && (psuedoGrid[2] == 0) && (psuedoGrid[3] > 0) && (psuedoGrid[0] != psuedoGrid[3])) {
        psuedoGrid[1] = psuedoGrid[3];
        psuedoGrid[3] = 0;
    } else if((psuedoGrid[0] > 0) && (psuedoGrid[1] > 0) && (psuedoGrid[2] == 0) && (psuedoGrid[3] > 0) && (psuedoGrid[3] != psuedoGrid[2])) {
        psuedoGrid[2] = psuedoGrid[3];
        psuedoGrid[3] = 0;
    }
    
    
    // tiles are same, add them together
    if(psuedoGrid[0] == psuedoGrid[1]) {
        psuedoGrid[0] += psuedoGrid[1];
        psuedoGrid[1] = 0;
    } else if (psuedoGrid[1] == psuedoGrid[2]) {
        psuedoGrid[1] += psuedoGrid[2];
        psuedoGrid[2] = 0;
    } else if (psuedoGrid[2] == psuedoGrid[3]) {
        psuedoGrid[2] += psuedoGrid[3];
        psuedoGrid[3] = 0;
    } 
    
    if((psuedoGrid[0] == psuedoGrid[3]) && (psuedoGrid[1] == 0) && (psuedoGrid[2] == 0)) {
        psuedoGrid[0] += psuedoGrid[3];
        psuedoGrid[3] = 0;
    }
    
    
    generateTile();
    printGrid();
    boardFull();
}

function checkRight() {
    generateTile();
    printGrid();
    boardFull();
}

function checkUp() {
    generateTile();
    printGrid();
    boardFull();
}

function checkDown() {
    generateTile();
    printGrid();
    boardFull();
}

// Check to see if the board is full
// if yes, check to see if there's any moves left
// if no, resume
function boardFull() {
    var count = 0;
    for(var i = 0; i < 16; i++) {
        if(psuedoGrid[i] > 0) count++;
    }
    
    // board is full, check if moves left
    if(count == 16) {
        print("Game is potentially over, check if there's any moves left.");
    }
}

function checkMoves() {
    
}

function printGrid(){
    print("2048 Game Grid: ");
    print(psuedoGrid[0] + " " + psuedoGrid[1] + " " + psuedoGrid[2] + " " + psuedoGrid[3]);
    print(psuedoGrid[4] + " " + psuedoGrid[5] + " " + psuedoGrid[6] + " " + psuedoGrid[7]);
    print(psuedoGrid[8] + " " + psuedoGrid[9] + " " + psuedoGrid[10] + " " + psuedoGrid[11]);
    print(psuedoGrid[12] + " " + psuedoGrid[13] + " " + psuedoGrid[14] + " " + psuedoGrid[15]);
    print("================");
}