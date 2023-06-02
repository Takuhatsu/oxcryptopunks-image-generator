
/* N2: After the list of layers is generated, run this code. NOTE: In config.js, set maxSupply to the
   maximum number of images you need in the collection, e.g., 10000, and numberOfCombinations to
   the number of images needed for a specific type, e.g., in OxCryptoPunks there are 6000 male characters.
   This code generates unique combinations with random numbers from 0 to maxSupply. It is designed
   to accurately fill the collection with different types of characters (male, female, pigeons, zombies, apes, aliens).
 */

const fs = require("fs");
const { folders, numberOfCombinations, maxSupply } = require("./config.js");

function generateCombinations() {
  const layers = JSON.parse(
    fs.readFileSync("./list-of-layers/list-of-layers.json")
  );

  const excludedNames = ["3D Glasses.2.png", "Big Shades.5.png", "Blindfold.1.png", "Classic Shades.5.png", "Eye Mask.3.png", "Holographic Visor.2.png", "Horned Rim Glasses.5.png", "Monocle.2.png", "Nerd Glasses.6.png", "Regular Shades.5.png", "Small Shades.3.png", "VR.3.png", "Medical Mask.1.png"];
  const aviatorHelmet = "Aviator Helmet.2.png";

  let combinations = {};
  let count = 0; // Attempts to generate a unique combination.

  while (
    Object.keys(combinations).length < numberOfCombinations &&
    count < 2000
  ) {
    let combination = [];

    for (let folder of folders) {
      let layerType = folder.path.split("/").pop();

      // Filter layers by folder.
      let folderLayers = layers[layerType];

      // Calculate total weight
      let totalWeight = folderLayers.reduce(
        (sum, layer) => sum + (layer.weight || 1), // Assign default weight of 1 if not provided.
        0
      );

      // Pick a random layer based on weight.
      let randomWeight = Math.floor(Math.random() * totalWeight);

      let layerIndex = 0;
      let currentWeight = folderLayers[0].weight || 1;

      while (currentWeight < randomWeight) {
        layerIndex++;
        currentWeight += folderLayers[layerIndex].weight || 1;
      }

      combination.push(folderLayers[layerIndex].file);
    }

    // Check if Aviator Helmet is used in the combination.
    if (combination.includes(aviatorHelmet)) {
      // Check if any excluded layer is used with Aviator Helmet.
      let hasExcludedLayer = false;
      for (let i = combination.indexOf(aviatorHelmet) + 1; i < combination.length; i++) {
        if (excludedNames.includes(combination[i])) {
          hasExcludedLayer = true;
          break;
        }
      }

      if (hasExcludedLayer) {
        console.log(`Combination contains Aviator Helmet and excludedNames. Skipped =>>`);
        count++;
        continue; // Regenerate the combination.
      }
    }

    // Check if combination is unique.
    let isUnique = true;

    for (let key in combinations) {
      if (combinations[key].join(",") === combination.join(",")) {
        isUnique = false;
        break;
      }
    }

    if (isUnique) {
      const imageNumber = Math.floor(Math.random() * maxSupply); // Generate a random image number from 0 to maxSupply.
      combinations[`image_${imageNumber}`] = combination;
      console.log(`Combination ${imageNumber} successfully generated!`);
    } else {
      console.log(`Combination ${count + 1} is not unique. Skipped --->>>`);
      count++;
    }
  }

  if (Object.keys(combinations).length < numberOfCombinations) {
    console.log(
      `Failed to generate the needed amount (${numberOfCombinations}) of unique combinations. Please add files to assets!`
    );
  } else {
    fs.writeFileSync(
      "./combinations/combinations.json",
      JSON.stringify(combinations, null, 4)
    );
    console.log(`${numberOfCombinations} unique combinations generated successfully.`);
  }
}

generateCombinations();