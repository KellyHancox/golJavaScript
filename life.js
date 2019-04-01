
module.exports = class life{

/**********************************************************************
 * Creates new grid with 0 rows and 0 cols
 **********************************************************************/
constructor(){

  this.grid = [];
  this.rows = 0;
  this.cols = 0;

}

/**********************************************************************
 * get_grid gets a grid after file is read
 * @param x the number of rows
 * @param y the number of columns
 * @param temp the grid read by file
 **********************************************************************/
 get_grid(temp, x, y){

    let start = 2;

    this.grid = new Array(this.x);
    for (let i = 0; i < this.rows; i++) {
        this.grid[i] = new Array(this.y);
          for (let j = 0; j < this.cols; j++) {
              this.grid[i][j] = temp[start++];
          }
      }
      
  }

/*
 * print_grid
 */
print_grid(x, y){

    console.log("---------------------------------");
    //Prints a human-readable grid.
    for(let i=0; i<x; ++i){
	    for(let j=0; j<y; ++j){
	        if(this.grid == '1'){
            console.log('1');
          }else{
            console.log('0');
          }
	    }
        console.log("\n");
    }

    console.log("---------------------------------");

}


/*********************************************************************
 * Mutate takes a grid and mutates that grid
 * according to Conway's rules.  A new grid is returned.
 * @param x width
 * @param y height
 *********************************************************************/
mutate(x, y) {
  this.newGrid = this.grid;

    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {

            neighbors = get_neighbors(i, j, x, y);
            console.log('At ' + i + ', ' + j + 'you have ' + neighbors + ' neighbors');

            if (this.grid[i][j] == 1) {
                //cell is alive

                if (neighbors < 2 || neighbors > 3) {
                    this.newGrid[i][j] = 0;

                } else if (neighbors == 2 || neighbors == 3) {
                    this.newGrid[i][j] = 1;
                }
            }

            //cell is dead
            if (this.grid[i][j] == 0) {
                if (neighbors == 3) {
                    this.newGrid[i][j] = 1;
                }
            }

        }
    }

    return ths.newGrid;

}

/*

 */
/********************************************************************
 * Helper method that returns the number of live neighbors a cell has
 * @param i given coordinate row
 * @param j given coordinate column
 * @param x number of rows
 * @param y number of columns
 * @param grid board
 * @return returns how many neighbors from i,j are alive
 ********************************************************************/
get_neighbors(i, j, x, y){

   count = 0;

   //if out of bounds
   if(i < 0 || i > x || j < 0 || j > y){
       return -1;
   }

   //if in the middle
   else if((i > 0 && i < x-1) && (j > 0 && j < y-1)){
     //up left i,j
       if(this.grid[i-1][j-1] == 1){
         count = count + 1;
     }
     //above i,j
     if(this.grid[i-1][j] == 1){
           count = count + 1;
     }
     //up right i,j
     if(this.grid[i-1][j+1] == 1){
           count = count + 1;
     }
     //right i,j
     if(this.grid[i][j+1] == 1){
           count = count + 1;
     }
     //down right i,j
     if(this.grid[i+1][j+1] == 1){
           count = count + 1;
     }
     //down i,j
     if(this.grid[i+1][j] == 1){
           count = count + 1;
     }
     //down left i,j
     if(this.grid[i+1][j-1] == 1){
           count = count + 1;
     }
     //left i,j
     if(this.grid[i][j-1] == 1){
           count = count + 1;
     }

     return count;
   }

   //checking bottom right corner
   else if(i == x-1 && j == y-1){
       //above i,j
       if(this.grid[i-1][j] == 1){
           count = count + 1;
       }
       //up left i,j
       if(this.grid[i-1][j-1] == 1){
           count = count + 1;
       }
       //left i,j
       if(this.grid[i][j-1] == 1){
           count = count + 1;
       }
       return count;
   }

   //check top right corner
   else if(i == 0 && j == y-1){
       //left i,j
       if(this.grid[i][j-1] == 1){
           count = count + 1;
       }
       //down i,j
       if(this.grid[i+1][j] == 1){
           count = count + 1;
       }
       //down left i,j
       if(this.grid[i+1][j-1] == 1){
           count = count + 1;
       }
       return count;
   }

   //check top left corner
   else if(i == 0 && j == 0){
       //right i,j
       if(this.grid[i][j+1] == 1){
           count = count + 1;
       }
       //down right i,j
       if(this.grid[i+1][j+1] == 1){
           count = count + 1;
       }
       //down i,j
       if(this.grid[i+1][j] == 1){
           count = count + 1;
       }
       return count;
   }

   //checking bottom Left corner
   else if(i == x-1 && j == 0){
       //above i,j
       if(this.grid[i-1][j] == 1){
           count = count + 1;
       }
       //up right i,j
       if(this.grid[i-1][j+1] == 1){
           count = count + 1;
       }
       //right i,j
       if(this.grid[i][j+1] == 1){
           count = count + 1;
       }
       return count;
   }

       //if we're from the bottom row but not in a corner
   else if(i == x-1){
       //right i,j
       if(this.this.grid[i][j+1] == 1){
           count = count + 1;
       }
       //left i,j
       if(this.grid[i][j-1] == 1){
           count = count + 1;
       }
       //up left i,j
       if(this.grid[i-1][j-1] == 1){
           count += 1;
       }
       //above i,j
       if(this.grid[i-1][j] == 1){
           count +=1;
       }
       //up right i,j
       if(this.grid[i-1][j+1] == 1){
           count += 1;
       }
       return count;
   }

   //if we're from the top row but not in a corner
   else if(i == 0){
       //right i,j
       if(this.grid[i][j+1] == 1){
           count = count + 1;
       }
       //left i,j
       if(this.grid[i][j-1] == 1){
           count = count + 1;
       }
       //down right i,j
       if(this.grid[i+1][j+1] == 1){
           count += 1;
       }
       //down i,j
       if(this.grid[i+1][j] == 1){
           count +=1;
       }
       //down left i,j
       if(this.grid[i+1][j-1] == 1){
           count += 1;
       }
       return count;
   }

   //if we're in furthest left row but not in a corner
   else if(j == 0){
       //above i,j
       if(this.grid[i-1][j] == 1){
           count = count + 1;
       }
       //down i,j
       if(this.grid[i+1][j] == 1){
           count = count + 1;
       }
       //up right i,j
       if(this.grid[i-1][j+1] == 1){
           count += 1;
       }
       //right i,j
       if(this.grid[i][j+1] == 1){
           count += 1;
       }
       //down right i,j
       if(this.grid[i+1][j+1] == 1){
          count += 1;
       }
       return count;
   }

   //if we're in furthest right row but not in a corner
   else if(j == y-1){
       //above i,j
       if(this.grid[i-1][j] == 1){
           count = count + 1;
       }
       //down i,j
       if(this.this.grid[i+1][j] == 1){
           count = count + 1;
       }
       //up left i,j
       if(this.grid[i-1][j-1] == 1){
           count += 1;
       }
       //down left i,j
       if(this.grid[i+1][j-1] == 1){
           count += 1;
       }
       //left i,j
       if(this.grid[i][j-1] == 1){
           count += 1;
       }
       return count;
   }

   //in case any checks failed
   else{
       return -1;
   }

  }

}
