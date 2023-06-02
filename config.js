const Jimp = require("jimp");

module.exports = {
  
  // Stack folders one under the other, in the needed order
  // Example: background => body => suit => eyes => ...
  folders: [
    { path: "./assets/male/head" },
    { path: "./assets/male/neckable" },
    { path: "./assets/male/facefeatures" },
    { path: "./assets/male/rosycheeks" },
    { path: "./assets/male/beard" },
    { path: "./assets/male/earring" },
    { path: "./assets/male/headgear" },
    { path: "./assets/male/mouth" },
    { path: "./assets/male/eyes" },
    { path: "./assets/male/clownnose" }
  ],

  // Set the amount of tokens that will be generated for the specific type
  // E.g., if there are 88 zombies and zombies are the type that is currently generating, paste 88 here
  numberOfCombinations: 6800,

  maxSupply: 10000, // Set the maximum amount of tokens that will be generated

  // Dimensions of the output image: 24px x 24px
  image: new Jimp(24, 24),

  // Directories for images and metadata files manipulations (these include removing file extension from JSON metadata
  // for IPFS and image resizing)
  images: "./output/images", // Images will be generated here
  metadata: "./output/metadata", // Metadata will be generated here

  ipfsCIDPlaceholder: "QmTPhRzQATQWSqx2j5t8YWnuGxDt2tX46qZ3syDHhcth3y", // Type an image link placeholder that is currently stored in the metadata files
  ipfsCID: "ipfs://QmTPhRzQATQWSqx2j5t8YWnuGxDt2tX46qZ3syDHhcth3y" // Type an image link of this format: ipfs://QmcNHQDBR1e58n5h9eLrbRyBJmJHACVR1EoPiECDUasAKk/

};
