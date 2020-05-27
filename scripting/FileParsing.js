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
            //if its cvs split it into an array based upon new lines, each element of array is a row in file
            let valuesArray = stringResults.split(/\r?\n|\r/);
            //passes it to handeling for cvs files
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
    for(let y = 0; y < array.length; y++){
        array[y].splice(correctColumn,array[0].length - 1);
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
        }
    }
    for(let y = 0; y < objArray.length; y++){
        if(objArray[y].modelIdentification === "" || objArray[y].modelIdentification === undefined || objArray[y].modelIdentification === null || objArray[y].modelIdentification === "<empty string>"){
            objArray.splice(y,1);
        }
    }
    console.log(objArray);
    return objArray;
}

