const fs = require('fs');

function generateOverallStatistic() {
  const folderPath = './output/metadata';
  const overallStatistics = {
    Type: {},
    Accessory: {}
  };

  // Read all the JSON files from the folder
  const fileNames = fs.readdirSync(folderPath);

  // Iterate through each JSON file
  fileNames.forEach((fileName) => {
    const filePath = `${folderPath}/${fileName}`;
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);

    // Count the Type occurrences
    const type = jsonData.attributes.find(attr => attr.trait_type === 'Type').value;
    if (type) {
      if (overallStatistics.Type[type]) {
        overallStatistics.Type[type] += 1;
      } else {
        overallStatistics.Type[type] = 1;
      }
    }

    // Count the Accessory occurrences
    const accessories = jsonData.attributes.filter(attr => attr.trait_type === 'Accessory');
    accessories.forEach(accessory => {
      const accessoryName = accessory.value;
      if (accessoryName) {
        if (overallStatistics.Accessory[accessoryName]) {
          overallStatistics.Accessory[accessoryName] += 1;
        } else {
          overallStatistics.Accessory[accessoryName] = 1;
        }
      }
    });
  });

  // Calculate percentages for each Type
  const totalTypes = Object.values(overallStatistics.Type).reduce((total, count) => total + count, 0);
  for (const [type, count] of Object.entries(overallStatistics.Type)) {
    overallStatistics.Type[type] = `${count} (${((count / totalTypes) * 100).toFixed(2)}%)`;
  }

  // Calculate percentages for each Accessory
  const totalAccessories = Object.values(overallStatistics.Accessory).reduce((total, count) => total + count, 0);
  for (const [accessory, count] of Object.entries(overallStatistics.Accessory)) {
    overallStatistics.Accessory[accessory] = `${count} (${((count / totalAccessories) * 100).toFixed(2)}%)`;
  }

  // Write the overall statistics to a new JSON file
  const outputFilePath = './overallStatisticPercentage.json';
  const outputData = JSON.stringify(overallStatistics, null, 2);
  fs.writeFileSync(outputFilePath, outputData);

  console.log('Overall statistics generated and written to overallStatistic.json.');
}

generateOverallStatistic();