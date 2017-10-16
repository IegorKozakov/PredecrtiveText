const A = "bac";
const B = "aef";
const C = "aabcef";

function is_interleave(a, b, c) {
  const sequenceA = a.split('');
  const sequenceB = b.split('');
  const validationStr = c.split('');
  let isValid = true;
  let prevLetterPositions;

  sequenceA.forEach((letter, i) => {
    const indexes = [];
    validationStr.forEach((char, j) => {
      if (char === letter) {
        indexes.push(j)
      }
    });

    if (i === 0) {
      prevLetterPositions = indexes;
    } else {
      indexes.some((position, k) => {

      });
    }

  });

  return isValid;
}

const validate = is_interleave(A, B, C);
console.log(validate);



