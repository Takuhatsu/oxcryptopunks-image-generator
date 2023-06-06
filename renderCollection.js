const Jimp = require("jimp");
const fs = require("fs/promises");
const { folders, image, images, metadata } = require('./config.js');

const combinations = require("./combinations/combinations.json");

async function generateImages() {
  for (const imageName in combinations) {
    const imageNumber = parseInt(imageName.replace("oxpunk", "")); // Extract the image number from the imageName

    const layers = combinations[imageName];

    // Create an attributes object from the layers array
    const attributes = layers.reduce((acc, layer, j) => {
      if (!layer.startsWith("KEYWORDBLANK") && !layer.startsWith("background")) {
        const folder = folders[j].path.split("/").pop();
        const traitType = folder === "head" ? "Type" : "Accessory"; // Instead of having "Head" in metadata we'll be having "Type"
        const value = layer.replace(/\.\s*\d+(?=\.png$)/, "").replace(/\.png$/, "").trim();
        acc.push({ trait_type: traitType, value: value });
      }
      return acc;
    }, []);

    // Create a new Jimp image object for each combination to avoid image overlapping when transparent background
    const newImage = new Jimp(image.bitmap.width, image.bitmap.height, 0x00000000);

    for (let j = 0; j < layers.length; j++) {
      const layerPath = `${folders[j].path}/${layers[j]}`;
      if (!layers[j].startsWith("KEYWORDBLANK")) {
        const layer = await Jimp.read(layerPath);
        newImage.composite(layer, 0, 0);
      }
    }

    const filename = `${images}/${imageName}.png`;
    await newImage.writeAsync(filename);
    console.log(`${imageName}.png with metadata generated successfully!`);

    if (attributes.length > 0) {
      const json = {
        image: `REPLACE-THIS-WITH-ADDRESS/${imageName}.png`,
        name: `OxCryptoPunk #${imageNumber}`,
        attributes: attributes,
      };
      const jsonFilename = `${metadata}/${imageName}.json`;
      await fs.writeFile(jsonFilename, JSON.stringify(json, null, 4));
    }
  }
}

generateImages().catch((err) => console.error(err));