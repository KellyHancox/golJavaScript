
module.exports = class life{

/**********************************************************************
 * Creates new grid with 0 rows and 0 cols
 **********************************************************************/
constructor(rows, cols){

  this.grid = [];
  this.rows = rows;
  this.cols = cols;

}

/**********************************************************************
 * get_grid gets a grid after file is read
 * @param temp is the temporary grid read from file
 **********************************************************************/
 get_grid(temp){
        this.row = temp[0];
        this.col = temp[1];
        let reference = 2;

    //puts temp values into the empty array
		this.grid = new Array(this.row);
		for (let i = 0; i < this.row; i++) {
            this.grid[i] = new Array(this.col);
            for (let j = 0; j < this.col; j++) {
                this.grid[i][j] = temp[reference++];
            }
        }
    }


/**********************************************************************
 * print_grid prints to console
 **********************************************************************/
print_grid(){

    console.log("---------------------------------");
    //Prints a human-readable grid.
    for(let i=0; i<this.rows; ++i){
	    for(let j=0; j<this.cols; ++j){
	        if(this.grid[i][j] == '1'){
            process.stdout.write('1');
          }else{
            process.stdout.write('0');
          }
	    }
        console.log("\n");
    }

    console.log("---------------------------------");

}


/*********************************************************************
 * Mutate takes a grid and mutates that grid
 * according to Conway's rules. The current grid becomes the new one
 *********************************************************************/
mutate() {

    //creating new grid
    let newGrid = new Array(this.rows);

    //this creates space for the new grid
    for (let p = 0; p < this.rows; p++) {
        newGrid[p] = new Array(this.cols);
        for (let q = 0; q< this.cols; q++){
           newGrid[p][q]=0;
        }
    }

    //iterates through the old board
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {

            // gets number of neighbors that are 1 for
            //each cell
            let neighbors = this.get_neighbors(i, j);

            //cell is alive
            if (this.grid[i][j] == 1) {

                //conway's rules
                if (neighbors < 2 || neighbors > 3) {
                    newGrid[i][j] = 0;

                } else if (neighbors == 2 || neighbors == 3) {
                    newGrid[i][j] = 1;
                }
            }

            //cell is dead
            if (this.grid[i][j] == 0) {
                if (neighbors == 3) {
                    newGrid[i][j] = 1;
                }
            }

        }
    }

    this.grid = newGrid;

}


/********************************************************************
 * Helper method that returns the number of live neighbors a cell has
 * @param i given coordinate row
 * @param j given coordinate column
 ********************************************************************/
get_neighbors(i, j){

   let count = 0;

   //if out of bounds
   if(i < 0 || i > this.rows || j < 0 || j > this.cols){
       return -1;
   }

   //if in the middle
   else if((i > 0 && i < this.rows-1) && (j > 0 && j <
     this.cols-1)){


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
   else if(i == this.rows-1 && j == this.cols-1){
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
   else if(i == 0 && j == this.cols-1){
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
   else if(i == this.rows-1 && j == 0){
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
   else if(i == this.rows-1){
       //right i,j
       if(this.grid[i][j+1] == 1){
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
   else if(j == this.cols-1){
       //above i,j
       if(this.grid[i-1][j] == 1){
           count = count + 1;
       }
       //down i,j
       if(this.grid[i+1][j] == 1){
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
