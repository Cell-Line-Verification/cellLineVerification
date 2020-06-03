//this function takes in an array of queries (queryList) 
//this function takes in algorithm (1 for tanabe, 2 for Masters vs. query, and 3 for Masters vs. reference)
//this function takes in mode (0 for non-empty marker, 1 for query marker. and 2 for reference markers)
//this function takes in amelogenin (true if amelogenin is to be used when comparing the query)
//returns an array of DOM object that contains the corresponding desired tables.
function getClastrResults(queryList, algorithm, mode, amelogenin = true) {

    let baseURL = "https://web.expasy.org/cellosaurus-str-search/api/query";

    let query, markerNames, keyName, algorithmType, scoringMode, includeAmelogenin, outputFormat, fullURL, request;

    for (let i = 0; i < queryList.length; i++) {
        query = queryList[i];

        markerNames = "";

        keyName;
        for (let j = 0; j < Object.keys(query.loci).length; j++) {
           keyName = Object.keys(query.loci)[j];

           if (j == 0) {
               markerNames += "?";
           } else {
               markerNames += "&";
           }

           markerNames += `${keyName}=`;

           let k;
           for (k of query.loci[keyName]) {
               if (k != 0) {
                   markerNames += ",";
               }

               markerNames += `${k}`;
           }
        }

        algorithmType = `&algorithm=${algorithm}`;

        scoringMode = `&scoringMode=${mode + 1}`;

        includeAmelogenin =  `&includeAmelogenin=${amelogenin}`;

        outputFormat = "&outputFormat=json";

        fullURL = baseURL + markerNames + algorithmType + scoringMode + includeAmelogenin + outputFormat;

        request = newXMLHttpRequest();

        request.open('GET', fullURL);
    }
}