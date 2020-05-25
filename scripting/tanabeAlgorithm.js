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
