# A NFT Image Generator Usage Instruction 📕

## Chapter 1: _What is this?_ ![alt text](https://github.com/Takuhatsu/nft-image-generator/blob/main/instruction-add-files/oxpunk0005.png  "OxCryptoPunk #5")
This is the source code used to generate **OxCRYPTOPUNKS**™ NFT collection consists of 10000 characters: 6000 _males_, 3780 _females_, 99 _pigeons_, 88 _zombies_, 24 _apes_, and 9 _aliens_.
This program uses the [Jimp](https://github.com/jimp-dev/jimp) and [pngjs](https://github.com/pngjs/pngjs) libraries for image processing.

## Chapter 2: _Where to start?_ 

To make the program work, some steps must be done first:
1. Install [Node.js](https://nodejs.dev/en/download/).
2. Install [Visual Studio Code](https://code.visualstudio.com/download).
3. Clone this repository to your hard drive with:
``git clone https://github.com/Takuhatsu/nft-image-generator.git``
4. Open the folder with the repository file in Visual Studio Code.
5. In the opened folder create folders ``list-of-layers``, ``combinations``, and ``output``. 
In ``output`` folder create ``images`` and ``metadata`` folders.
> **Note:** Make sure to use exact same names!
6. Run ``npm install --save jimp`` and ``npm install pngjs  --save``.

## Chapter 3: _What next?_

_When you are done setting up your code, it's time to work with the image files you are going to use for generation._

The ``assets`` folder contains other folders with images that were used to generate OxCRYPTOPUNKS™. I left them there so you could examine all the files and their connection to the code for a better understanding of how things work.

1. The names of the folders in the ``assets`` folder will be stored in a future metadata file (the text from which will be displayed on marketplaces such as _OpenSea_) as Accessories. If the folder name is _Head_, it will be stored in the metadata as _Type_, so we have types such as _male_, _female_, _pigeon_, _zombies_, _apes_, and _aliens_.

Here is an example of how folders names are stored in the metadata file for OxCryptoPunks #5:

```javascript
"attributes": [
    {
      "trait_type": "Type",  // Folder head.
      "value": "Female 2"
    },
    {
      "trait_type": "Accessory", // Folder headgear.
      "value": "Messy Hair Dark"
    },
    {
      "trait_type": "Accessory", // Folder mouth.
      "value": "Cigarette"
    }
  ]
  ```

  2. 