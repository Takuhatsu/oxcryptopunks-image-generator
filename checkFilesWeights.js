const fs = require('fs');
const path = require('path');
const folderPath = './assets/alien/neckable'; // path to a folder with weighted files

// The sum of all weights in the folder should always be 100
function calculateSumOfNumbers(fileNames) {
  let sum = 0;

  fileNames.forEach((fileName) => {
    const match = fileName.match(/(\d+)\.png$/);
    if (match) {
      const number = parseInt(match[1], 10);
      sum += number;
    }
  });

  return sum;
}

try {
  const fileNames = fs.readdirSync(folderPath);
  const folderName = path.basename(folderPath);

  // Calculate the sum of numbers in file names
  const totalSum = calculateSumOfNumbers(fileNames);
  console.log(`Total sum weights in ${(folderName).toUpperCase()} folder: ${totalSum}`);
} catch (err) {
  console.error('Error reading folder:', err);
}