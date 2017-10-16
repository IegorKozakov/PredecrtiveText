const A = "bac";
const B = "aef";
const C = "aabcef";

function is_interleave(a, b, c) {
  const sequenceA = a.split('');
  const sequenceB = b.split('');
  const validationStr = c.split('');
  let isValid = true;
  let prevLetterPositions;

  sequenceA.every((letter, i) => {
    const indexes = [];
    validationStr.forEach((char, j) => {
      if (char === letter) {
        indexes.push(j)
      }
    });

    if (i === 0) {
      prevLetterPositions = indexes;
      return true
    } else if (i < validationStr.length) {
      isValid = indexes.some((current) => {
        return prevLetterPositions.some(prev => {
          if (current > prev) {
            validationStr[prev] = null;
            prevLetterPositions = indexes;

            if (i === sequenceA.length - 1) {
              validationStr[current] = null;
            }

            return true;
          }
          return false;
        });
      });
      return isValid
    }
  });

  if (!isValid) {
    return false;
  }

  sequenceB.every((letter, i) => {
    const indexes = [];
    validationStr.forEach((char, j) => {
      if (char === letter) {
        indexes.push(j)
      }
    });

    if (i === 0) {
      prevLetterPositions = indexes;
      return true
    } else if (i < validationStr.length) {
      isValid = indexes.some((current) => {
        return prevLetterPositions.some(prev => {
          if (current > prev) {
            validationStr[prev] = null;
            prevLetterPositions = indexes;

            if (i === sequenceB.length - 1) {
              validationStr[current] = null;
            }

            return true;
          }
          return false;
        });
      });
      return isValid
    }
  });

  return isValid;
}

const validate = is_interleave(A, B, C);
console.log(validate);



