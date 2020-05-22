

// This function takes in the parameters for a tanabe-style reference and returns the concordance amount.
// The mode is an int with 0 being non-empty markers, 1 being query markers, and 2 being reference markers.
function tanabe(reference, query, mode, amelogenin = true) {
  let numSharedAlleles = 0;
  
  //calculates the number of reference and query alleles.
  
  
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
