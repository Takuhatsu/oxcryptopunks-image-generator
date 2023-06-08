const fs = require('fs');
const path = require('path');
const { images, metadata, imagesIPFS, metadataIPFS } = require('./config.js');

/*
* We prefer using a JSON metadata file as a bare file, which means without '.json' extension.
* This code detects what is currently assigned to the currentlyRenaming variable and
* renamedFilesDir, and, if metadata or metadataIPFS is assigned, the code will remove
* the '.json' extension.
*/

const currecntlyRenaming = images; // Directory where files to be renamed are. Switch between images and metadata.
const renamedFilesDir = imagesIPFS; // Directory for renamed files. Switch between imagesIPFS and metadataIPFS.

const renameImages = () => {
  
  let removeExtension
  if (currecntlyRenaming === metadata) {
    removeExtension = true;
  } else if (currecntlyRenaming === images) {
    removeExtension = false;
  } else {
    console.log('A wrong folder assigned to currentlyRenaming variable!')
  }

  if (!fs.existsSync(renamedFilesDir)) { 
    fs.mkdirSync(renamedFilesDir, { recursive: true }); 
  }; // If a directory for renamed files doesn't exist, the code will create it

  const files = fs.readdirSync(currecntlyRenaming); // 

  files.forEach((filename, index) => {
    const extension = path.extname(filename);
    const currentPath = path.join(currecntlyRenaming, filename); 
    const parsedNumber = index; // Use the index as the new file name
    let newFileName;
    if (!removeExtension) {
      newFileName = parsedNumber.toString().padStart(1, '0') + extension;
    };
    if (removeExtension) {
      newFileName = parsedNumber.toString().padStart(1, '0');
    }
    const newPath = path.join(renamedFilesDir, newFileName);

    fs.copyFileSync(currentPath, newPath);
    console.log(`Renamed ${currentPath} to ${newPath}`);
  });
};

renameImages();