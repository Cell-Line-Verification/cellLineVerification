// This function takes in the parameters for a tanabe-style reference and returns the concordance amount.
// The mode is an int with 0 being non-empty markers, 1 being query markers, and 2 being reference markers.
function tanabe(reference, query, mode, amelogenin = true) {
  
  let numSharedAlleles = 0;
  let numReferenceAlleles = 0;
  let numQueryAlleles = 0;
  
  if (mode == 0) {
    //non-empty marker case
    
    for (let i = 0; i < Object.keys(query.loci).length; i++) {
      let keyName = Object.keys(query.loci)[i];
      
      //strides through all the shared locations
      if (keyName in query.loci && keyName in reference.loci) {
        if (query.loci[keyName].length > 0 && reference.loci[keyName].length > 0) {
          
          //calculates the num of shared alleles
          if (amelogenin == false && keyName == "Amelogenin") {
            numSharedAlleles += 0;
          } else {
            for (let j = 0; j < query.loci[keyName].length; j++) {
              if (reference.loci[keyName].includes(query.loci[keyName][j])) {
                numSharedAlleles++;
              }
            }
          }
          
          //calculates the number of query alleles
          if (amelogenin == false && keyName == "Amelogenin") {
            numQueryAlleles += 0;
          } else {
            numQueryAlleles += query.loci[keyName].length;
          }
          
          //claculates the number of reference alleles
          if (amelogenin == false && keyName == "Amelogenin") {
            numReferenceAlleles += 0;
          } else {
            numReferenceAlleles += reference.loci[keyName].length;
          }
        }
      }
    }
    
  } else if (mode == 1) {
    //query marker case
    
    for (let i = 0; i < Object.keys(query.loci).length; i++) {
      let keyName = Object.keys(query.loci)[i];
      
      //strides through all the shared locations
      if (query.loci[keyName].length > 0) {

        //calculates the num of shared alleles
        if (keyName in reference.loci) {
          if (amelogenin == false && keyName == "Amelogenin") {
            numSharedAlleles += 0;
          } else {
            for (let j = 0; j < query.loci[keyName].length; j++) {
              if (reference.loci[keyName].includes(query.loci[keyName][j])) {
                numSharedAlleles++;
              }
            }
          }
        }

        //calculates the number of query alleles
        if (amelogenin == false && keyName == "Amelogenin") {
          numQueryAlleles += 0;
        } else {
          numQueryAlleles += query.loci[keyName].length;
        }

        //claculates the number of reference alleles
        if (keyName in reference.loci) {
          if (amelogenin == false && keyName == "Amelogenin") {
            numReferenceAlleles += 0;
          } else {
            numReferenceAlleles += reference.loci[keyName].length;
          }
        }
      }
    }
  
  } else if (mode == 2) {
    //reference marker case
    
    for (let i = 0; i < Object.keys(reference.loci).length; i++) {
      let keyName = Object.keys(reference.loci)[i];
      
      //strides through all the shared locations
      if (reference.loci[keyName].length > 0) {

        //calculates the num of shared alleles
        if (keyName in query.loci) {
          if (amelogenin == false && keyName == "Amelogenin") {
            numSharedAlleles += 0;
          } else {
            for (let j = 0; j < reference.loci[keyName].length; j++) {
              if (query.loci[keyName].includes(reference.loci[keyName][j])) {
                numSharedAlleles++;
              }
            }
          }
        }

        //calculates the number of reference alleles
        if (amelogenin == false && keyName == "Amelogenin") {
          numReferenceAlleles += 0;
        } else {
          numReferenceAlleles += reference.loci[keyName].length;
        }

        //claculates the number of query alleles
        if (keyName in query.loci) {
          if (amelogenin == false && keyName == "Amelogenin") {
            numQueryAlleles += 0;
          } else {
            numQueryAlleles += query.loci[keyName].length;
          }
        }
      }
    }
  }
  
  //returns the the tanabe concordance amount in percent
  return (100 * (2 * numSharedAlleles) / (numReferenceAlleles + numQueryAlleles));
  
}

// Masters Concordance Calculations

// Input Paramaters:
// (reference, query, mode, amelogenin = true)
// Modes:
// 0 = non-empty markers, 1 = query markers, 2 = reference markers

// Output:
// float from 0 to 100 (%), representing concordance

// count number of shared alleles between one query locus and one reference locus
function testLoci(testQ, testR) {
  let shared = 0;

  // test if each allele from the query locus is shared in the reference locus
  for (let allele of testQ) {
    if (testR.includes(allele)) {
      shared++; // count shared alleles
    }
  }

  return shared;
}

// concordance: masters vs query
function mastersQuery(reference, query, mode, amelogenin = true) {
  // shared alleles ÷ query alleles
  let shared = 0;
  let queryAlleles = 0;

  if (mode == 0 || mode == 2) {
    // non-empty markers AND reference markers

    for (let key in reference.loci) {
      // only continue if locus exists in both reference and query
      if (Object.keys(query.loci).includes(key)) {
        // ignore amelogenin if set to false
        if (
          amelogenin == false &&
          (query.loci[key].includes("X") ||
            query.loci[key].includes("x") ||
            query.loci[key].includes("Y") ||
            query.loci[key].includes("y"))
        ) {
          continue;
        } else {
          // count query alleles
          queryAlleles += query.loci[key].length;

          // count shared alleles
          shared += testLoci(query.loci[key], reference.loci[key]);
        }
      }
    }
  } else {
    // query markers

    for (let key in query.loci) {
      //ignore amelogenin if set to false
      if (
        amelogenin == false &&
        (query.loci[key].includes("X") ||
          query.loci[key].includes("x") ||
          query.loci[key].includes("Y") ||
          query.loci[key].includes("y"))
      ) {
        continue;
      } else {
        // count query alleles
        queryAlleles += query.loci[key].length;

        // count shared alleles
        if (Object.keys(reference.loci).includes(key)) {
          shared += testLoci(query.loci[key], reference.loci[key]);
        }
      }
    }
  }

  if (queryAlleles == 0) {
    return 0;
  }
  //return the amount as a percentage
  return 100 * (shared / queryAlleles);
}

// concordance masters vs reference
function mastersRef(reference, query, mode, amelogenin = true) {
  // shared alleles ÷ reference alleles
  let shared = 0;
  let refAlleles = 0;

  if (mode == 0 || mode == 1) {
    // non-empty markers AND query markers

    for (let key in query.loci) {
      // only continue if locus exists in both reference and query
      if (Object.keys(reference.loci).includes(key)) {
        // ignore amelogenin if set to false
        if (
          amelogenin == false &&
          (reference.loci[key].includes("X") ||
            reference.loci[key].includes("x") ||
            reference.loci[key].includes("Y") ||
            reference.loci[key].includes("y"))
        ) {
          continue;
        } else {
          // count reference alleles
          refAlleles += reference.loci[key].length;

          // count shared alleles
          shared += testLoci(query.loci[key], reference.loci[key]);
        }
      }
    }
  } else {
    // reference markers

    for (let key in reference.loci) {
      //ignore amelogenin if set to false
      if (
        amelogenin == false &&
        (reference.loci[key].includes("X") ||
          reference.loci[key].includes("x") ||
          reference.loci[key].includes("Y") ||
          reference.loci[key].includes("y"))
      ) {
        continue;
      } else {
        // count reference alleles
        refAlleles += reference.loci[key].length;

        // count shared alleles
        if (Object.keys(query.loci).includes(key)) {
          shared += testLoci(query.loci[key], reference.loci[key]);
        }
      }
    }
  }

  if (refAlleles == 0) {
    return 0;
  }
  //return the amount as a percentage
  return 100 * (shared / refAlleles);
}

//Parses through file uploaded and gets back STR Fingerprint
//file upload for query data 


window.onload = () => {
    //gets input space, adds event listener for on change, should change to on submit once html is finished
    document.getElementById("queryUpload").addEventListener("change", event => {
        fileGrab(event.target.files[0]); //first file selected by user
      });

  };
function fileGrab(file){
    //grabs file info as stringResults
    let fileReader = new FileReader(); //reads content of file
    fileReader.addEventListener("load",event => {
    let stringResults = event.target.result;

    //decide what file type it is
    let fileType  = file.name.split(".").pop();

    //initiates file parsing
    fileParse(stringResults, fileType);
    });
    fileReader.readAsText(file); //reads content as text to activate load for event listener 
}
function fileParse(stringResults, fileType){
        if(fileType === "csv"){
            //if its csv split it into an array based upon new lines, each element of array is a row in file
            let valuesArray = stringResults.split(/\r?\n|\r/);
            //passes it to handeling for csv files
            return csvHandeling(valuesArray);
        }
        else if(fileType === "json"){
            //if its a json file then use built in parsing and return parsed object
            let jsonObj = JSON.parse(stringResults);
            return jsonObj;
        }
        else{
            //yeild error because wrong file type
            alert("incorrect file type: please enter a JSON or CVS file and try again.");
        }
}
//method to replace characters in a string based upon index
String.prototype.replaceAt = function(index, replacement) {
	if (index >= this.length) {
		return this.valueOf();
	}

	return this.substring(0, index) + replacement + this.substring(index + 1);
}

function csvHandeling(array){
    //needs to clean extra commas to keep data together 
    //there are commas within cells so it switches them with "|" to avoid splitting the cells
    let isComma = false;
    for(y = 0; y < array.length; y++){
        for(x = 0; x < array[y].length; x++){
            if(array[y].charAt(x) == "\""  && !isComma){
                isComma = true;
            }
            else if(array[y].charAt(x) == "\""  && isComma){
                isComma = false;
            }
            if(isComma && array[y].charAt(x) == ","){
                array[y] = array[y].replaceAt(x,"^");
            }
        }
    }
    //breaks array into multidimentional array - essentially a grid same as the excel doc
    for(let x = 0; x < array.length; x++){
        array[x] = array[x].split(",");
    }
    //finds which column has mod_id and deletes all the garbage before it, deletes everything between mod_id and AM, deletes everything after the last loci
    let correctColumn = 0;
    while(array[0][correctColumn] != "mod_id"){
        correctColumn ++;
    }
    for(let y = 0; y < array.length; y++){
        array[y].splice(0,correctColumn);
    }
    correctColumn = 0; 
    while(array[0][correctColumn] != "AM"){
        correctColumn ++;
    }

    for(let y = 0; y < array.length; y++){
        array[y].splice(1,correctColumn - 1);
    }
    correctColumn = 0;
    for(x = 0; x < array[0].length; x++){
        if(array[0][x].slice(0,3) == "mod" && array[0][x] != "mod_id"){
            correctColumn = x;
        }
    }
    if(correctColumn > 0){
        for(let y = 0; y < array.length; y++){
            array[y].splice(correctColumn,array[0].length - 1);
        }
    }

    for(y = 0; y < array.length; y++){
        for(x = 0; x < array[y].length; x++){
            for(z = 0; z < array[y][x].length; z++){
                if(array[y][x].charAt(z) == "\""){
                    array[y][x] = array[y][x].substr(1);
                    array[y][x] = array[y][x].substr(0, array[y][x].length - 1);
                }
            }
        }
    }
    for(y = 0; y < array.length; y++){
        for(x = 1; x < array[y].length; x++){
            array[y][x] = array[y][x].split("^");
        }
    }
    //object maker 
    let objArray = [];
    let loci = {};
    for(let y = 1; y < array.length; y++){
        tempObj = {}
        loci  = {};
        for(x = 1; x < array[y].length; x++){
            loci[array[0][x]] = [array[y][x]];
        }
        tempObj.loci = loci;
        tempObj.modelIdentification = array[y][0];
        objArray[y - 1] = tempObj;
    }
    for(let y = 0; y < objArray.length; y++){
        if(objArray[y].modelIdentification === "" || objArray[y].modelIdentification === undefined || objArray[y].modelIdentification === null || objArray[y].modelIdentification === "<empty string>"){
            objArray.splice(y,1);
            y--;
        }
    }
    console.log(objArray);
    return objArray;
}
