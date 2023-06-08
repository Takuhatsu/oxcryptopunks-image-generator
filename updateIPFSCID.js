const fs = require('fs');
const path = require('path');
const { ipfsCIDPlaceholder, ipfsCID, metadataIPFS } = require('./config.js');

const updateIPFSCID = (folderPath) => {
  // Get a list of files in the folder
  const files = fs.readdirSync(folderPath);

  // Iterate through each file
  files.forEach(file => {
    // Read the contents of the file
    const filePath = path.join(folderPath, file);
    const contents = fs.readFileSync(filePath, 'utf8');

    // Parse the JSON contents
    let json = JSON.parse(contents);

    // Update the image property
    json.image = json.image.replace(ipfsCIDPlaceholder, ipfsCID);

    // Convert the JSON back to a string
    const updatedContents = JSON.stringify(json, null, 2);

    // Write the updated JSON back to the file
    fs.writeFileSync(filePath, updatedContents, 'utf8');
    console.log('IPFS CID updated successfully');
  });
}

updateIPFSCID(metadataIPFS);