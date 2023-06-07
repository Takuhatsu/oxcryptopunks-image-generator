const fs = require("fs");
const Jimp = require("jimp");
const { images } = require('./config.js');

async function resizeImages() {
  const imageFolderPath = images;
  const resizedFolderPath = "./output/images_resized";

  // Read the list of files in the image folder
  const fileNames = fs.readdirSync(imageFolderPath);

  // Sort the file names numerically
  fileNames.sort((a, b) => {
    const numA = parseInt(a.split(".")[0]);
    const numB = parseInt(b.split(".")[0]);
    return numA - numB;
  });

  // Create the resized folder if it doesn't exist
  if (!fs.existsSync(resizedFolderPath)) {
    fs.mkdirSync(resizedFolderPath);
  }

  // Batch size for processing images
  const batchSize = 10;

  // Process images in batches
  for (let i = 0; i < fileNames.length; i += batchSize) {
    const batchFileNames = fileNames.slice(i, i + batchSize);

    // Process each image in the batch
    const imagePromises = batchFileNames.map((fileName) => {
      const imagePath = `${imageFolderPath}/${fileName}`;
      const resizedImagePath = `${resizedFolderPath}/${fileName}`;

      return Jimp.read(imagePath)
        .then((image) => {
          // Resize the image to your desired dimensions (e.g., width: 720, height: 720)
          const resizedImage = image.resize(720, 720, Jimp.RESIZE_NEAREST_NEIGHBOR);

          // Write the resized image to the resized folder
          return resizedImage.writeAsync(resizedImagePath);
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