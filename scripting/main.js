// Main Javascript

let settings = {};

window.onload = () => {
    //parse file upon upload
    document.getElementById("queryUpload").addEventListener("change", event => { //query
        fileGrabQuery(event.target.files[0]); //first file selected by user
    });
    document.getElementById("referenceUpload").addEventListener("change", event => { //reference
        fileGrabRef(event.target.files[0]); //first file selected by user
    });

    //compare button
    document.getElementById("compareButton").addEventListener("click",() => {
        settings = settingsGrab();
        compare();
    });
};


// compare ref with query
function compare() {
    let tableDiv = document.getElementById("concordanceResults");
    let referenceEquivIndex;
    let referenceIDs = [];
    document.getElementById("results").style.display = "block";
    for (let i in references) {
        referenceIDs.push(references[i].modelIdentification);
    }
    for (let q in queries) {
        referenceEquivIndex = referenceIDs.indexOf(queries[q].modelIdentification);
        if (referenceEquivIndex != -1) {
            tableDiv.appendChild(createResultsTable(references[referenceEquivIndex], queries[q], Math.round(calculateConcordance(references[referenceEquivIndex], queries[q], settings.mode, settings.algorithm, settings.amelogenin) * 100) / 100));
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
                    tempData = '';
                    if (Object.keys(query.loci).includes(allele)) {
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
                    tempData = '';
                    if (Object.keys(reference.loci).includes(allele)) {
                        reference.loci[allele].sort(function (a, b) {
                            return Number(a) - Number(b);
                        });
                        for (let num of reference.loci[allele]) {
                            tempData += num + ',';
                        }
                        tempData = tempData.slice(0, tempData.length - 1);

                        // if ref doesn't match query
                        if (tempData != table.children[table.children.length - 2].children[alleles.indexOf(allele)].innerHTML) {
                            tempTD.style.color = "#ff0000";
                            table.children[table.children.length - 2].children[alleles.indexOf(allele)].style.color = "#ff0000";
                        }
                    }
                    tempTD.appendChild(document.createTextNode(tempData));
                }
            }
        }
    }

    let percentage = table.firstChild.appendChild(document.createElement('th'));
    percentage.appendChild(document.createTextNode(concordancePercentage + "%"));
    percentage.rowSpan = 3;

    return table;
}
