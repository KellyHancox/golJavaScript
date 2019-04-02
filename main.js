/*
 * Game of Life
 *
 * A version of John Conway's classic Game of Life, written in C.
 * CIS 343 - Winter 2019
 *
 * Author:  Kelly Hancox
 *
 * This program saves and loads games using the following format:
 * The first byte of the file is the height.
 * The second byte of the file is the width.
 * The remaining bytes of the file are either zeros or ones,
 * where a one is a live cell and a zero is no cell.
 * Unlike some versions we will not keep track of where a cell
 * was when it died; i.e. when a cell dies it is just gone.
 * If the height of the file is h and the width is w, the
 * total size of the file in bytes would then be (h x w) + 2.
 */

 	// Import our grid definitions
 	const life = require('./life.js');
	//how to read and update files
 	var fs = require('fs');
  //read lines import
  const readSync = require('readline-sync');
  // Import a synchronous prompt library
  const prompt = require('prompt-sync')();
  var Buffer = require('buffer').Buffer;
  var constants = require('constants');

	function main(){

	// The program requires a file name to start.
	if(process.argv.length != 3){
		console.log("This program requires a file name and no other parameters to start.\n\n");
    process.exit(1);
	}

  // instantiate GameOfLife object
  let myGrid = new life();
  let tempGrid = [];

  console.log('rows is: ' + myGrid.rows);
  console.log('cols is: ' + myGrid.cols);

  fs.open(process.argv[2], 'r', function(error, fd) {
  if (error)
    throw error;
  var buffer = new Buffer.allocUnsafe(1);
  while (true){
    var num = fs.readSync(fd, buffer, 0, 1, null);
    if (num === 0)
      break;

    //console.log('byte read', buffer[0]);
    tempGrid.push(buffer[0]);
    }

  myGrid.rows = tempGrid[0];
  myGrid.cols = tempGrid[1];

  console.log("Beginning with grid size  " + myGrid.rows + " rows by "+ myGrid.cols +" cols\n");

  myGrid.get_grid(tempGrid);
	myGrid.print_grid();

	// Now, we will accept input in a loop until the user
	// asks us to quit.
	while(1){

    let userInput = readSync.question("Press q to quit, w to save to disk,\n" +
  "n to iterate multiple times, or any other\n" + "key to continue to the next generation.\n");

		//console.log("-------------------------\n");

		switch(userInput){

			case 'q':
				// Case 'q' results in exiting the game.  We must free
				// our memory here.
				return process.exit(1);

			case 'w':
				// Case 'w' writes the current board to disk.  Since
				// a file is just a string of bytes, we must first
				// convert our grid to some representation that is
				// a string of bytes.  We will use the representation
				// described in the top of this file.
				let fileName = prompt("Enter a filename: ");

				fs.writeFile(fileName + '.gol', this.myGrid, function (err) {
	  			if (err) throw err;
	  			console.log('There has been an error in saving this.');
					});
          console.log('Saved as: ' + fileName + ".gol");
        break;

			case 'n':
				// 'n' causes us to ask the user how
				// many evolutions to perform in a row,
				// then executes them in a loop.
				let num = prompt("How many iterations? ");

				console.log("Iterating " + num + " times.\n\n");
				for(i=0; i<num; ++i){
					myGrid.mutate();
					myGrid.print_grid();
				}
				break;

			default:
				// Any other key and we evolve one iteration,
				// print, and keep going.
				myGrid.mutate();
				myGrid.print_grid();
		}
	}
    });
}
//console.clear();
main();
