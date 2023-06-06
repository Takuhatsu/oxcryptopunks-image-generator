const fs = require('fs');
const path = require('path');
const { images } = require('./config.js');

const generatedPunks = images
const populationFile = './availableNumbers.json';

function checkMissingNumbers() {
  const existingFiles = fs.readdirSync(generatedPunks);
  const existingNumbers = existingFiles.map(filename => parseInt(path.basename(filename, '.png')));

  let missingCount = 0;
  const notAssignedNumbers = [];

  for (let i = 0; i < 10000; i++) {
    if (!existingNumbers.includes(i)) {
      notAssignedNumbers.push(i);
      missingCount++;
    }
  }

  const populationData = {
    notAssignedNumbers,
    missingCount,
  };

  fs.writeFileSync(populationFile, JSON.stringify(populationData, null, 2));

  console.log(`This numbers are not assigned yet: ${missingCount}`);
  console.log(`Amount of not assigned numbers: ${populationFile}`);
}

checkMissingNumbers();