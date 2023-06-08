const fs = require('fs');
const Jimp = require('jimp');
const { imagesIPFS } = require('./config.js');

const imageWidth = 720; // Width of image
const imageHeight = 720; // Height of image
const backgroundColor = '#648595'; // Background color applies only if image background is transparent

async function resizeImages() {
  // Read the list of files in the image folder
  const fileNames = fs.readdirSync(imagesIPFS);

  // Sort the file names numerically
  fileNames.sort((a, b) => {
    const numA = parseInt(a.split('.')[0]);
    const numB = parseInt(b.split('.')[0]);
    return numA - numB;
  });

  // Batch size for processing images
  const batchSize = 10;

  // Process images in batches
  for (let i = 0; i < fileNames.length; i += batchSize) {
    const batchFileNames = fileNames.slice(i, i + batchSize);

    // Process each image in the batch
    const imagePromises = batchFileNames.map((fileName) => {
      const imagePath = `${imagesIPFS}/${fileName}`;

      return Jimp.read(imagePath)
        .then((image) => {
          // Resize the image to your desired dimensions (e.g., width: 720, height: 720)
          const resizedImage = image
          .resize(imageWidth, imageHeight, Jimp.RESIZE_NEAREST_NEIGHBOR)
          const background = new Jimp(imageWidth, imageHeight, backgroundColor);

          // Composite the resized image onto the background
          background.composite(resizedImage, 0, 0);

          // Overwrite the original image with the resized image with background
          return background.writeAsync(imagePath);
        })
        .then(() => {
          console.log(`Resized image ${fileName} saved successfully!`);
        })
        .catch((err) => {
          console.error(`Error processing image ${fileName}: ${err}`);
        });
    });

    // Wait for all image processing promises to complete
    await Promise.all(imagePromises);
  }
}

resizeImages();