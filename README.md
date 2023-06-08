# OxCRYPTOPUNKS™ IMAGE GENERATOR

## Chapter 1: _Description_ ![alt text](https://github.com/Takuhatsu/nft-image-generator/blob/main/instruction-add-files/openbook.png "opened book")

This is the source code used to generate **OxCRYPTOPUNKS**™ NFT collection consists of 10,000 characters: 6,000 _males_, 3,780 _females_, 99 _pigeons_, 88 _zombies_, 24 _apes_, and 9 _aliens_.
This program uses the [Jimp](https://github.com/jimp-dev/jimp) and [pngjs](https://github.com/pngjs/pngjs) libraries for image processing.

## Chapter 2: _How to install the OxCRYPTOPUNKS™ IMAGE GENERATOR_ ![alt text](https://github.com/Takuhatsu/nft-image-generator/blob/main/instruction-add-files/installation.png "file search")

To make the program work, some steps must be done first:

1. Install [Node.js](https://nodejs.dev/en/download/).
2. Install [Visual Studio Code](https://code.visualstudio.com/download).
3. Clone this repository to the hard drive with:
   `git clone https://github.com/Takuhatsu/nft-image-generator.git`
4. Open the folder with the repository file in Visual Studio Code.
5. In the opened folder create folders `list-of-layers`, `combinations`, and `output`.
   In `output` folder create `images` and `metadata` folders.  
     
   > **Tip:** Make sure to use exact same names for these folders!

6. Run `npm install --save jimp` and `npm install pngjs  --save`.

## Chapter 3: _Layer ordering_ ![alt text](https://github.com/Takuhatsu/nft-image-generator/blob/main/instruction-add-files/oxpunk0005.png "OxCryptoPunk #5")

_When we are done setting up the code, it's time to work with the image files we are going to use for generation._

The `assets` folder contains other folders with images that were used to generate OxCRYPTOPUNKS™. We left them there so anyone could examine all the files and their connection to the code for a better understanding of how things work.

1. The names of the folders in the `assets` folder will be stored in a future metadata file (the text from which will be displayed on marketplaces such as _OpenSea_) as _Accessories_. If the folder name is _Head_, it will be stored in the metadata as _Type_, so we have types such as _male_, _female_, _pigeon_, _zombies_, _apes_, and _aliens_.

   Here is the example of how folder names and file names are stored in the metadata file for OxCryptoPunk #5:

   ```javascript
        "attributes": [
        {
        "trait_type": "Type",  // Folder head.
        "value": "Female 2" // File Female.25.png
        },
        {
        "trait_type": "Accessory", // Folder headgear.
        "value": "Messy Hair Dark" // File Messy Hair Dark.9.png
        },
        {
        "trait_type": "Accessory", // Folder mouth.
        "value": "Cigarette" // File Cigarette.3.png
        }
      ]
   ```

2. Each final image is assembled from different layers which are stacked on top of each other.  
   ![alt text](https://github.com/Takuhatsu/nft-image-generator/blob/main/instruction-add-files/male%201.png "male 1") + ![alt text](https://github.com/Takuhatsu/nft-image-generator/blob/main/instruction-add-files/anchor.png "anchor") + ![alt text](https://github.com/Takuhatsu/nft-image-generator/blob/main/instruction-add-files/knitted%20cap.png "knitted cap") + ![alt text](https://github.com/Takuhatsu/nft-image-generator/blob/main/instruction-add-files/bubble%20gum.png "bubble gum") + ![alt text](https://github.com/Takuhatsu/nft-image-generator/blob/main/instruction-add-files/nerd%20glasses.png "nerd glasses") = ![alt text](https://github.com/Takuhatsu/nft-image-generator/blob/main/instruction-add-files/oxpunk0044.png "OxCryptoPunk #44")

3. `folders` array in `config.js` file handles layers stacking order.

   ```javascript
   folders: [
     { path: "./assets/male/head" }, // The first layer goes first and will be located under all other layers.
     { path: "./assets/male/beard" },
     { path: "./assets/male/earring" },
     { path: "./assets/male/headgear" },
     { path: "./assets/male/mouth" },
     { path: "./assets/male/eyes" }, // The last layer will be located on top of all other layers.
   ];
   ```

## Chapter 4: _Populate assets folders with files and start generating_ ![alt text](https://github.com/Takuhatsu/nft-image-generator/blob/main/instruction-add-files/files.png "files")

Files in each folder should be in `.png` format with transparent background. The name for each file should include a number (weight) which will be used later to determine the _rarity_. For example, _Bubble Gum_ in the _mouth_ folder has this name: `Bubble Gum.2.png`, where `2` is the weight number that will be used later to determine how often `Bubble Gum.2.png` will appear in the future collection. We'll cover how _rarity_ works in the next chapter.

When the `assets` folders are populated, it's time to run `generateListOfLayers.js`, which will read files from the folders specified in the `folders` array from `config.js` and create the `list-of-layers.json` file with a list of all the found layers and their weights. Now we're ready to generate combinations, but first we need to step back and see what _weights_ are and why we need them.  

> **Tip:** We will be generating one type of character at once, so `list-of-layers.json` should be generated for a specific type and then rewritten if needed.

## Chapter 5: _Rarity/Weights_ ![alt text](https://github.com/Takuhatsu/nft-image-generator/blob/main/instruction-add-files/oxpunk5581.png "OxCryptoPunk #5581")

Let's take the `facefeatures` folder for example. There are files: `Buck_Teeth.1.png`, `Frown.2.png`, `KEYWORDBLANK-FACEFEATURES.86.png`, `Mole.7.png`, `Smile.2.png`, and `Spots.2.png`. When we run `generateListOfLayers.js`, the code extracts the numbers that are located after the dot and right before the _.png_ extension, and includes them in the `list-of-layers.json` file as _weights_. This NFT generator assumes that the sum of all the weights in one folder should be _100_ (related to _100%_). When a specific folder is populated, the weights sum can be checked by running `checkFilesWeights.js` (the path to the folder should be specified in the `folderPath` variable from `checkFilesWeights.js`).

> **Tip:** Weights are calculated for each folder separately!


Thus, `Buck_Teeth.1.png` will be used, approximately, in 1% of combinations, `Mole.7.png` in 7% of combinations, and so on...  

Such folders as `head` are considered to be used in 100% of cases if we don't want characters without heads. In the case of the `facefeatures` folder - we don't want to use files from this folder in 100% of cases. For this scenario we need to include empty transparent _.png_ file in `facefeatures` folder with name starting with _KEYWORDBLANK_. In our particular case, this file's full name is  `KEYWORDBLANK-FACEFEATURES.86.png` with the weight of _86_, which means this file will be used aproximately in 86% of combinations. In the future, when we'll be generating the final collection, _KEYWORDBLANK_ files will not be included to the metadata.

## Chapter 6: _How to populate a NFT collection with different types -_  
![alt text](https://github.com/Takuhatsu/nft-image-generator/blob/main/instruction-add-files/oxpunk0091.png "OxCryptoPunk #91") ![alt text](https://github.com/Takuhatsu/nft-image-generator/blob/main/instruction-add-files/oxpunk0084.png "OxCryptoPunk #84") ![alt text](https://github.com/Takuhatsu/nft-image-generator/blob/main/instruction-add-files/oxpunk7748.png "OxCryptoPunk #7748") ![alt text](https://github.com/Takuhatsu/nft-image-generator/blob/main/instruction-add-files/oxpunk1210.png "OxCryptoPunk #1210") ![alt text](https://github.com/Takuhatsu/nft-image-generator/blob/main/instruction-add-files/oxpunk0815.png "OxCryptoPunk #815") ![alt text](https://github.com/Takuhatsu/nft-image-generator/blob/main/instruction-add-files/oxpunk6848.png "OxCryptoPunk #6848")

If we want all characters to be, let's say, _pigeons_, we need to match `numberOfCombinations` and `maxSupply` from `config.js`, then run `generateCombinations.js`. But what if we want 6,000 males, 3,780 females, 99 pigeons, 88 zombies, 24 apes, and 9 aliens? This how we made it for OxCRYPTOPUNKS™:

1. Set up `config.js` files to read folders for _male_ characters.  `maxSupply` should be set to 10,000, and `numberOfCombinations` to 6,000.
2. After we ran `generateCombinations.js`, assuming that `list-of-layers.json` for males already done, we're getting 6,000 unique combinations. Each combination receives a random number from 0 to 10,000 (`maxSupply`). It's made for random population, so we don't have a burger of only male-characters, then only female-characters in a row.  

> **Tip:** Run `generateStatistic.js` after generating combinations to check if all layers were used. If the desired statistics were not met, adjust the weights and regenerate the combinations.    

3. Run `renderCollection.js` to turn combinations into images and metadata files. It is suggested to generate each character type into its own folder (e.g.: _images_male_, _metadata_male_). Output folders are controlled through `images` and `metadata` variables in `config.js`. 
4. Modify `config.js` file to switch it to female-characters, change `numberOfCombinations` to 3,800 (`maxSupply` should be left the same), generate a new `list-of-layers.json`, and run `generateCombinations2.js`.

> **Tip:** When we run `generateCombinations2.js`, the code checks which numbers were already assigned, and assigns available numbers from 0 to `maxSupply`.

5. We can check which numbers are still available by running `checkAvailableNumbers.js`. This code will create `availableNumbers.json` with needed information.  

> **Tip:** `checkAvailableNumbers.js` will be checking the current `images` folders that are controlled through `config.js`!  

6. Pigeons, zombies, apes, and aliens combinations were also generated with generateCombinations2.js, because only generateCombinations2 checks which numbers are already taken.  

7. When all the types of character are generated, we copy/paste images to ./output/images folder and metadata to ./output/metadata folder.

## Chapter 7: _Composite image_ ![alt text](https://github.com/Takuhatsu/nft-image-generator/blob/main/instruction-add-files/composite.png "composite")

When we generate 10,000 images, we want to create a composite image from them. Use `buildComposite.js` for this. Take a closer look at the `const row` from `config.js` - the row variable should store the number of images we want in each row. If we talk about a 10,000-image collection, then we want 100 images in one row, as 100x100 = 10,000. The `buildComposite.js` script reads the images variable from `config.js` as an input. The complete composite will be saved at the core directory with all the code files as `oxpunks.png`.  

> **Tip:** All the images should be stored in one folder, so we moved all the different types of characters into one `images` folder. Also, to have a correct images order in the composite, we should avoid naming our images like this: 0, 1, ..., 10, 11, ..., 100, 101. Instead, we should have names such as 0000, 0001, ..., 0010, ..., 0100, and so on...

![alt text](https://github.com/Takuhatsu/nft-image-generator/blob/main/oxpunks.png "oxpunks")

## Chapter 8: _Prepare files for the IPFS_

When a collection is generated, we want to rename our files to have this template: _0.png, 1.png, ..., 9998.png, 9999.png_ for images, and this template for JSON metadata files: _0, 1, ..., 9998, 9999_. We prefer using a JSON metadata file as a bare file, which means without _.json_ extension. 
For these purposes, we designed the `renameFiles.js` script. Before running the script, configure `currentlyRenaming` and `renamedFilesDir` variables. `currentlyRenaming` variable should point to one of two folders - `images` or `metadata`. `renamedFilesDir` should be pointed to one of two directories that will be created for renamed files - `imagesIPFS` or `metadataIPFS` respectively. This code will automatically leave the _.png_ extension and will remove the _.json_ extension.

Next, we are running `resizeImage.js` to scale the 24x24 images. The size of resized images and the background color are controlled through variables `imageWidth`, `imageHeight`, and `backgroundColor`.

The last thing that we need to do is to update the _IPFS CID_ in metadata files. For this, first, `imagesIPFS` folder should be uploaded into _IPFS_. When done, we'll get _IPFS CID_ that looks like this: `QmTPhRzQATQWSqx2j5t8YWnuGxDt2tX46qZ3syDHhcth3y`. Assign this _CID_ to the `ipfsCID` variable in `config.js`. Check if the `ipfsCIDPlaceholder` variable in `config.js`, stores actual placeholder link from metadata JSON files.

Run `updateIPFSCID.js`.

Now the `metadata-IPFS` folder can be uploaded into _IPFS_. Done!


