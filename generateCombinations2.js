// N3: Use this code when the first part of the collection is generated. Adjust numberOfCombinations as needed.

const fs = require("fs");
const { folders, numberOfCombinations, maxSupply } = require("./config.js");

function generateCombinations2() {
  const layers = JSON.parse(
    fs.readFileSync("./list-of-layers/list-of-layers.json")
  );

  let combinations = {};
  let count = 0; // Attempt to generate a unique combination.

  while (
    Object.keys(combinations).length < numberOfCombinations &&
    count < 30000
  ) {
    let combination = [];

    for (let folder of folders) {
      let layerType = folder.path.split("/").pop();

      // Filter layers by folder.
      let folderLayers = layers[layerType];

      // Calculate total weight.
      let totalWeight = folderLayers.reduce(
        (sum, layer) => sum + (layer.weight || 1), // Assign default weight of 1 if not provided.
        0
      );

      // Pick a random layer based on weight.
      let randomWeight = Math.floor(Math.random() * totalWeight);

      let layerIndex = 0;
      let currentWeight = folderLayers[0].weight || 1; // Assign default weight of 1 if not provided.

      while (currentWeight < randomWeight) {
        layerIndex++;
        currentWeight += folderLayers[layerIndex].weight || 1; // Assign default weight of 1 if not provided.
      }

      combination.push(folderLayers[layerIndex].file);
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
      // Generate a random number between 0 and 9999.
      let randomNumber = Math.floor(Math.random() * maxSupply);

      // Check if the file with the generated number already exists.
      while (fs.existsSync(`./output/metadata/${randomNumber}.json`)) {
        randomNumber = Math.floor(Math.random() * maxSupply); // Generate a new random number.
      }

      combinations[`image_${randomNumber}`] = combination;
      console.log(
        `Combination image_${randomNumber} successfully generated!`
      );
    } else {
      console.log(`Combination ${count + 1} is not unique. Skipped =>>`);
      count++;
    }
  }

  if (Object.keys(combinations).length < numberOfCombinations) {
    console.log(
      `Failed to generate needed amount(${numberOfCombinations}) of unique combinations. Please add files to assets!`
    );
  } else {
    fs.writeFileSync(
      "./combinations/combinations.json",
      JSON.stringify(combinations, null, 4)
    );
    console.log(
      "------------------------------------------------------------------------------"
    );
    console.log(
      `Completed successfully. ${numberOfCombinations} unique combinations generated!`
    );
    console.log(
      "------------------------------------------------------------------------------"
    );
  }
}

generateCombinations2();