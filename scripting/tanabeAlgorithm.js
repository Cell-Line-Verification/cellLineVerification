// This function takes in the parameters for a tanabe-style reference and returns the concordance amount.
// The mode is an int with 0 being non-empty markers, 1 being query markers, and 2 being reference markers.
function tanabe(reference, query, mode, amelogenin = true) {
  
  //figures out which name for amelogenin is being used in the refernce
  let referenceAmelogeninName = " ";
  for (let i = 0; i < Object.keys(reference.loci).length; i++) {
    if (Object.keys(reference.loci)[i] in ["Am", "AM", "am", "Amelogenin", "amelogenin"]) {
      referenceAmelogeninName = Object.keys(reference.loci)[i];
    }
  }
  
  //figures out which name for amelogenin is being used in the refernce
  let queryAmelogeninName = " ";
  for (let i = 0; i < Object.keys(query.loci).length; i++) {
    if (Object.keys(query.loci)[i] in ["Am", "AM", "am", "Amelogenin", "amelogenin"]) {
      queryAmelogeninName = Object.keys(query.loci)[i];
    }
  }

  
  let numSharedAlleles = 0;
  let numReferenceAlleles = 0;
  let numQueryAlleles = 0;
  
  if (mode == 0) {
    //non-empty marker case
    
    for (let i = 0; i < Object.keys(query.loci).length; i++) {
      let keyName = Object.keys(query.loci)[i];
      
      //strides through all the shared locations but not amelogenin
      if (keyName in query.loci && keyName in reference.loci && keyName != queryAmelogeninName) {
        if (query.loci[keyName].length > 0 && reference.loci[keyName].length > 0) {
          
          //calculates the num of shared alleles
          for (let j = 0; j < query.loci[keyName].length; j++) {
            if (reference.loci[keyName].includes(query.loci[keyName][j])) {
              numSharedAlleles++;
            }
          }
          
          //calculates the number of query alleles
          numQueryAlleles += query.loci[keyName].length;
          
          //claculates the number of reference alleles
          numReferenceAlleles += reference.loci[keyName].length;
        }
      } else if (keyName == queryAmelogeninName && referenceAmelogeninName != " " && amelogenin) {
        //in the case that we consider amelogenin
        if (query.loci[keyName].length > 0 && reference.loci[referenceAmelogeninName].length > 0) {
          
          //calculates the num of shared alleles
          for (let j = 0; j < query.loci[keyName].length; j++) {
            if (reference.loci[referenceAmelogeninName].includes(query.loci[keyName][j])) {
              numSharedAlleles++;
            }
          }
          
          //calculates the number of query alleles
          numQueryAlleles += query.loci[keyName].length;
          
          //claculates the number of reference alleles
          numReferenceAlleles += reference.loci[referenceAmelogeninName].length;
        }
      }
    }
    
  } else if (mode == 1) {
    //query marker case
    
    for (let i = 0; i < Object.keys(query.loci).length; i++) {
      let keyName = Object.keys(query.loci)[i];
      
      //strides through all the query specific locations but not amelogenin
      if (query.loci[keyName].length > 0 && keyName != queryAmelogeninName) {
        //calculates the num of shared alleles
        if (keyName in reference.loci) {
          for (let j = 0; j < query.loci[keyName].length; j++) {
            if (reference.loci[keyName].includes(query.loci[keyName][j])) {
              numSharedAlleles++;
            }
          }
        }

        //calculates the number of query alleles
        numQueryAlleles += query.loci[keyName].length;

        //claculates the number of reference alleles
        numReferenceAlleles += reference.loci[keyName].length;
      } else if (keyName == queryAmelogeninName && amelogenin) {
        //in the case that we consider amelogenin
        if (referenceAmelogeninName != " " && query.loci[keyName].length > 0 && reference.loci[referenceAmelogeninName].length > 0) {
          
          if (keyName in reference.loci) {
            for (let j = 0; j < query.loci[keyName].length; j++) {
              if (reference.loci[keyName].includes(query.loci[keyName][j])) {
                numSharedAlleles++;
              }
            }
          }
          
          //calculates the number of query alleles
          numQueryAlleles += query.loci[keyName].length;

          //calculates the number of reference alleles
          if (referenceAmelogeninName != " ") {
            numReferenceAlleles += reference.loci[referenceAmelogeninName].length;
          }
        }
      }
    }
  
  } else if (mode == 2) {
    //reference marker case
    
    for (let i = 0; i < Object.keys(reference.loci).length; i++) {
      let keyName = Object.keys(reference.loci)[i];
      
      //strides through all the reference specific locations but not amelogenin
      if (reference.loci[keyName].length > 0 && keyName != referenceAmelogeninName) {
        //calculates the num of shared alleles
        if (keyName in query.loci) {
          for (let j = 0; j < reference.loci[keyName].length; j++) {
            if (query.loci[keyName].includes(reference.loci[keyName][j])) {
              numSharedAlleles++;
            }
          }
        }

        //calculates the number of reference alleles
        numReferenceAlleles += reference.loci[keyName].length;

        //claculates the number of query alleles
        numQueryAlleles += query.loci[keyName].length;
      } else if (keyName == queryAmelogeninName && amelogenin) {
        //in the case that we consider amelogenin
        if (queryAmelogeninName != " " && reference.loci[keyName].length > 0 && query.loci[queryAmelogeninName].length > 0) {
          
          if (keyName in query.loci) {
            for (let j = 0; j < reference.loci[keyName].length; j++) {
              if (query.loci[keyName].includes(reference.loci[keyName][j])) {
                numSharedAlleles++;
              }
            }
          }
          
          //calculates the number of reference alleles
          numReferenceAlleles += reference.loci[keyName].length;

          //calculates the number of query alleles
          if (queryAmelogeninName != " ") {
            numQueryAlleles += query.loci[queryAmelogeninName].length;
          }
        }
      }
    }
  }
  //returns the the tanabe concordance amount in percent
  return (100 * (2 * numSharedAlleles) / (numReferenceAlleles + numQueryAlleles));
  
}
