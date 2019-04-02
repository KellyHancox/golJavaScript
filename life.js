
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
 get_grid(temp){
        this.row = temp[0];
        this.col = temp[1];
        let start = 2;

		this.grid = new Array(this.row);
		for (let i = 0; i < this.row; i++) {
            this.grid[i] = new Array(this.col);
            for (let j = 0; j < this.col; j++) {
                this.grid[i][j] = temp[start++];
                //console.log(this.grid[i][j]);
            }
        }
    }

/*
 * print_grid
 */
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
 * according to Conway's rules.  A new grid is returned.
 * @param x width
 * @param y height
 *********************************************************************/
mutate() {
  let newGrid = this.grid;

    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {

            let neighbors = this.get_neighbors(i, j);
            console.log('At ' + i + ', ' + j + ' you have ' + neighbors + ' neighbors');

            if (this.grid[i][j] == 1) {
                //cell is alive

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

    console.log(newGrid);
    return newGrid;

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
get_neighbors(i, j){

   let count = 0;

   //if out of bounds
   if(i < 0 || i > this.rows || j < 0 || j > this.cols){
       return -1;
   }

   //if in the middle
   else if((i > 0 && i < this.rows-1) && (j > 0 && j < this.cols-1)){



     //up left i,j
       if(this.grid[i-1][j-1] == 1){
         count = count + 1;
         console.log(this.grid);
         console.log("i-1, j-1" + i +", " + j + " count: "+ count);
     }
     //above i,j
     if(this.grid[i-1][j] == 1){
           count = count + 1;
           console.log("i-1, j" + i +", " + j + " count: "+ count);
     }
     //up right i,j
     if(this.grid[i-1][j+1] == 1){
           count = count + 1;
           console.log("i-1, j+1" + i +", " + j + " count: "+ count);
     }
     //right i,j
     if(this.grid[i][j+1] == 1){
           count = count + 1;
           console.log("i, j-1" + i +", " + j + " count: "+ count);
     }
     //down right i,j
     if(this.grid[i+1][j+1] == 1){
           count = count + 1;
           console.log("i+1, j+1" + i +", " + j + " count: "+ count);
     }
     //down i,j
     if(this.grid[i+1][j] == 1){
           count = count + 1;
           console.log("i+1, j" + i +", " + j + " count: "+ count);
     }
     //down left i,j
     if(this.grid[i+1][j-1] == 1){
           count = count + 1;
           console.log( "i+1, j-1" + i +", " + j + " count: "+ count);
     }
     //left i,j
     if(this.grid[i][j-1] == 1){
           count = count + 1;
           console.log("[i][j-1]" + i + ", " + j + " count: "+ count);
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
