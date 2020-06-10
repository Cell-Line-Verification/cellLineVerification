
function createResultsTable(reference, query, concordancePercentage) {

  let table = document.getElementById("resultsTable");
  document.getElementById("results").style.display = "block";
  document.getElementById("queryModel").innerHTML = query.modelIdentification;
  document.getElementById("referenceModel").innerHTML = reference.modelIdentification;
  document.getElementById("concordance").innerHTML = concordancePercentage;

  let alleles = Object.keys(query.loci);
  for (let key of Object.keys(reference.loci)) {
    if (!alleles.includes(key)) {
      alleles.push(key);
    }
  }

  let row;
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
