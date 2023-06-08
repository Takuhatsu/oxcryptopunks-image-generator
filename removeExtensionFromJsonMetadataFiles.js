const fs = require('fs');
const path = require('path');
const { metadata } = require("./config.js");

const removeFileExtension = (folderPath) => {
  // Get a list of files in the folder
  const files = fs.readdirSync(folderPath);

  // Iterate through each file
  files.forEach(file => {
    // Check if the file has a .json extension
    if (path.extname(file) === '.json') {
      // Remove the file extension from the file name
      const fileNameWithoutExtension = path.basename(file, '.json');
      const newFilePath = path.join(folderPath, fileNameWithoutExtension + '.json');

      // Rename the file
      fs.renameSync(path.join(folderPath, file), newFilePath);
      console.log('Extension removed successfully');
    }
  });
};

removeFileExtension(metadata);