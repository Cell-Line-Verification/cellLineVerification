
window.onload = () => {
    //parse file upon upload
    document.getElementById("queryUpload").addEventListener("change", event => { //query
        fileGrabQuery(event.target.files[0]); //first file selected by user
    });
    document.getElementById("referenceUpload").addEventListener("change", event => { //reference
        fileGrabRef(event.target.files[0]); //first file selected by user
    });

    //compare button
    document.getElementsByTagName("button")[0].addEventListener('click', compare);
};



// compare ref with query
function compare() {
    console.log('cool')
    let tableDiv = document.getElementById("concordanceResults");
    let referenceEquivIndex;
    let referenceIDs = [];
    for (let i in references) {
        referenceIDs.push(references[i].modelIdentification);
    }
    for (let q in queries) {
        referenceEquivIndex = referenceIDs.indexOf(queries[q].modelIdentification);
        if (referenceEquivIndex != -1) {
            tableDiv.appendChild(createResultsTable(references[referenceEquivIndex], queries[q], calculateConcordance(references[referenceEquivIndex], queries[q], settings.mode, settings.algorithm, settings.amelogenin)));
        } else {
            console.log("Query", queries[q].modelIdentification, "lacks a reference equivalent.");
        }
    }
}



// generate single table for one comparison
function createResultsTable(reference, query, concordancePercentage) {

    let table = document.createElement("table");

    let alleles = Object.keys(query.loci);
    for (let key of Object.keys(reference.loci)) {
        if (!alleles.includes(key)) {
            alleles.push(key);
        }
    }

    alleles.unshift("");

    let tempTD, tempData;
    for (let i = 0; i < 3; i++) {
        table.appendChild(document.createElement("tr"));
        for (let allele of alleles) {
            if (i == 0) {
                tempTD = table.lastChild.appendChild(document.createElement("th"));
                tempTD.appendChild(document.createTextNode(allele));
            } else if (i == 1) {
                if (allele == "") {
                    tempTD = table.lastChild.appendChild(document.createElement("th"));
                    tempTD.appendChild(document.createTextNode("Query\n" + query.modelIdentification));
                } else {
                    tempTD = table.lastChild.appendChild(document.createElement("td"));
                    if (Object.keys(query.loci).includes(allele)) {
                        tempData = '';
                        query.loci[allele].sort(function (a, b) {
                            return Number(a) - Number(b);
                        });
                        for (let num of query.loci[allele]) {
                            tempData += num + ',';
                        }
                        tempData = tempData.slice(0, tempData.length - 1);
                    }
                    tempTD.appendChild(document.createTextNode(tempData));
                }
            } else {
                if (allele == "") {
                    tempTD = table.lastChild.appendChild(document.createElement("th"));
                    tempTD.appendChild(document.createTextNode("Reference\n" + reference.modelIdentification));
                } else {
                    tempTD = table.lastChild.appendChild(document.createElement("td"));
                    if (Object.keys(reference.loci).includes(allele)) {
                        tempData = '';
                        reference.loci[allele].sort(function (a, b) {
                            return Number(a) - Number(b);
                        });
                        for (let num of reference.loci[allele]) {
                            tempData += num + ',';
                        }
                        tempData = tempData.slice(0, tempData.length - 1);
                    }
                    tempTD.appendChild(document.createTextNode(tempData));
                }
            }
        }
    }



}
/*
    let data;
    let text;
    let alleleHeader;
    for (let allele of alleles) {
  
      row = document.createElement("tr");
      alleleHeader = document.createElement("th");
      alleleHeader.appendChild(document.createTextNode(allele));
      row.appendChild(alleleHeader);
      data = document.createElement("td");
  
      if (Object.keys(query.loci).includes(allele)) {
        text = '';
        query.loci[allele].sort(function (a, b) {
          return Number(a) - Number(b);
        });
        for (let num of query.loci[allele]) {
          text += num + ', ';
        }
        text = text.slice(0, text.length - 2);
        data.appendChild(document.createTextNode(text));
      }
      row.appendChild(data);
      data = document.createElement("td");
      if (Object.keys(reference.loci).includes(allele)) {
        text = '';
        reference.loci[allele].sort(function (a, b) {
          return Number(a) - Number(b);
        });
        for (let num of reference.loci[allele]) {
          text += num + ', ';
        }
        text = text.slice(0, text.length - 2);
        if (text != row.lastChild.innerHTML) {
          data.style.color = "#ff0000";
        }
        data.appendChild(document.createTextNode(text));
      }
      row.appendChild(data);
      table.appendChild(row);
    }
  }
  */
