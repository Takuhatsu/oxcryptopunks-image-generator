const fs = require('fs');
const Jimp = require('jimp');

async function createCompositeImage() {
  const folderPath = './images_composite';

  // Read all files in the folder
  const fileNames = fs.readdirSync(folderPath);

  // Sort the file names numerically
  fileNames.sort((a, b) => {
    const numA = parseInt(a.split('.')[0]);
    const numB = parseInt(b.split('.')[0]);
    return numA - numB;
  });

  // Create a new Jimp image with a size of 2400x2400 (24x24 pixels for each image)
  const compositeImage = new Jimp(2400, 2400, 0x00000000); // Set background color to fully transparent

  let x = 0;
  let y = 0;

  for (let i = 0; i < fileNames.length; i++) {
    const fileName = fileNames[i];
    const filePath = `${folderPath}/${fileName}`;

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
    if (x >= 100) {
      x = 0;
      y++;
    }

    // Stop processing if we have reached the maximum limit of 10000 images
    if (i === 9999) {
      break;
    }
  }

  // Save the composite image as "oxpunks.png"
  await compositeImage.writeAsync('./oxpunks.png');
}

createCompositeImage();