const fs = require('fs');
const Jimp = require('jimp');
const { maxSupply, images } = require('./config.js');

const row = 100; // The number of images we need in a row. For the 10k collection, the number should be 100.

async function createCompositeImage() {

  // Read all files in the folder
  const fileNames = fs.readdirSync(images);

  // Sort the file names numerically
  fileNames.sort((a, b) => {
    const numA = parseInt(a.split('.')[0]);
    const numB = parseInt(b.split('.')[0]);
    return numA - numB;
  });

  const numImages = Math.min(fileNames.length, maxSupply); // Adjusted to handle less than maxSupply images

  // const numRows = Math.ceil(numImages / row); // Calculate the number of rows based on the number of images
  const numRows = numImages % row === 0 ? numImages / row : Math.floor(numImages / row) + 1; // Calculate the number of rows based on the number of images

  const compositeImage = new Jimp(24 * row, numRows * 24, 0x00000000); // Set background color to fully transparent.

  let x = 0;
  let y = 0;

  for (let i = 0; i < numImages; i++) {
    const fileName = fileNames[i];
    const filePath = `${images}/${fileName}`;

    // Read the image file
    const image = await Jimp.read(filePath);

    // Paste the image into the composite at the appropriate position
    compositeImage.composite(image, x * 24, y * 24, {
      mode: Jimp.BLEND_SOURCE_OVER, // Use source-over blending mode for transparency
      opacitySource: 1, // Set the opacity of the source image to 100%
      opacityDest: 1 // Set the opacity of the destination image (composite) to 100%
    });

    // Move to the next cell position
    x++;
    if (x >= row) {
      x = 0;
      y++;
    }
  }

  // Save the composite image as 'oxpunks.png'
  await compositeImage.writeAsync('./oxpunks.png');
}

createCompositeImage();