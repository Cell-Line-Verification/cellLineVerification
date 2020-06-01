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
