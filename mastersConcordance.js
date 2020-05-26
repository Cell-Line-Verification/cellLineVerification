// Team 2: David + Austin
// Masters Concordance Calculations

// Input Paramaters:
// (reference, query, mode, amelogenin = true)
// Modes:
// 0 = non-empty markers, 1 = query markers, 2 = reference markers

// Output:
// floating point (0 to 1), representing concordance

// count number of shared alleles between one query locus and one reference locus
function testLoci(testQ, testR) {
  let shared = 0;

  // transform alleles to number (int/float) values OR, for amelogenin, to uppercase
  testQ = testQ.map(x => (isNaN(Number(x)) ? x.toUpperCase() : Number(x)));
  testR = testR.map(x => (isNaN(Number(x)) ? x.toUpperCase() : Number(x)));

  // filter out all non-unique values within each locus
  // in case the input does not conform with the CLASTR format (no repeated values)
  let distinct = (value, index, self) => self.indexOf(value) === index;
  testQ.filter(distinct);
  testR.filter(distinct);

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
  return shared / queryAlleles;
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
  return shared / refAlleles;
}
