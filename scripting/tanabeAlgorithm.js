

// This function takes in the parameters for a tanabe-style reference and returns the concordance amount.
// The mode is an int with 0 being non-empty markers, 1 being query markers, and 2 being reference markers.
function tanabe(reference, query, mode, amelogenin = true) {
  
  //calculates the number of reference and query alleles.
  let numReferenceAlleles = 0;
  let numQueryAlleles = 0;
  
  //calculates the number of alleles in the reference
  for (let location of reference.loci) {
    numReferenceAlleles += location.length;
  }
  if (!amelogenin) {
    numReferenceAlleles -= reference.loci.Amelogenin.length; //removes the extra 
  }
  
  //calculates the number of alleles in the query
  for (let location of query.loci) {
    numQueryAlleles += location.length;
  }
  if (!amelogenin) {
    numQueryAlleles -= query.loci.Amelogenin.length; //removes the extra 
  }
   
  //calculates the number of shared alleles.
  let numSharedAlleles = 0;
  if (mode == 0) {
    //non-empty marker case
    
    
  } else if (mode == 1) {
    //query marker case
    
    
  } else if (mode == 2) {
    //reference marker case
    
    
  }
  
  //returns the the tanabe concordance amount.
  return ((2 * numSharedAlleles) / (numReferenceAlleles + numQueryAlleles));
  
}
