//Parses through file uploaded and gets back STR Fingerprint

//file upload for query data 



window.onload = () => {
    document.getElementById("upload").addEventListener("change", event => {
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
    fileReader.readAsText(file); //reads content as text
}
function fileParse(stringResults, fileType){
        //should convert file data into array for formating 
        if(fileType === "csv"){
            let valuesArray = stringResults.split(/\r?\n|\r/);
            return csvHandeling(valuesArray);
        }
        else if(fileType === "json"){
            let jsonObj = JSON.parse(stringResults);
            return jsonObj;
        }
        else{
            //yeild error because wrong file type 
        }
}
String.prototype.replaceAt = function(index, replacement) {
	if (index >= this.length) {
		return this.valueOf();
	}

	return this.substring(0, index) + replacement + this.substring(index + 1);
}

function csvHandeling(array){
    //needs to clean extra commas to keep data together 
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
                array[y] = array[y].replaceAt(x,"|");
            }
        }
    }
    //breaks array into multidimentional array - essentially a grid same as the excel doc
    for(let x = 0; x < array.length; x++){
        array[x] = array[x].split(",");
    }
    
    // for(let y = 0; y < array.length; y++){
    //     console.log(array.length, y);
    //     console.log(array);
    //     for(let x = 0; x < array[0].length; y++){
    //         array[y][x].replace("\"","");
    //         array[y][x].replace("\\","");
    //     }
    // }

    let correctColumn = 0;
    while(array[0][correctColumn] != "AM"){
        correctColumn ++;
    }
    console.log(correctColumn);

    for(let y = 0; y < array.length; y++){
        array[y].splice(1,correctColumn);
    }
    console.log(array);

    //object maker 
    let objArray = [];
    let loci = {};
    for(let y = 1; y < array.length; y++){
        tempObj = {}
        loci  = {};
        for(x = 1; x < array[y].length; x++){
            loci[array[0][x]] = array[y][x];
        }
        tempObj.loci = loci
        tempObj.modelIdentification = array[y][0]
        objArray[y - 1] = tempObj;
    }
    console.log(objArray);
}

