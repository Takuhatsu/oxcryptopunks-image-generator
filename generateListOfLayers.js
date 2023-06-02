/****************************************************
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░░░████████████░░██░░░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░██████████████████░░░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░████████████████████████░░░░░░░░░░░░ *
 * ░░░░░░░░░░████████████████████████░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░██████████████░░██████░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░██████░░██░░░░██░░░░██████░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░████░░░░░░██░░░░░░██░░░░▒▒░░░░░░░░ *
 * ░░░░░░░░░░░░░░██░░░░░░░░░░░░░░░░██░░░░▒▒░░░░░░░░ *
 * ░░░░░░░░░░░░██░░░░▓▓▓▓░░░░░░▓▓▓▓██░░░░▒▒░░░░░░░░ *
 * ░░░░░░░░░░░░██░░░░██▒▒░░░░░░██▒▒██░░░░▒▒░░░░░░░░ *
 * ░░░░░░░░░░░░████░░░░░░░░░░░░░░░░██░░░░▒▒░░░░░░░░ *
 * ░░░░░░░░░░░░░░██░░░░░░░░░░░░░░░░██░░░░▒▒░░░░░░░░ *
 * ░░░░░░░░░░░░░░██░░░░░░░░██░░░░░░██░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░██░░░░░░░░░░░░████████████░░░░░░░░ *
 * ░░░░░░░░░░░░░░██░░░░░░██████░░░░░░░░░░▓▓██░░░░░░ *
 * ░░░░░░░░░░░░░░░░██░░░░░░░░░░████████████░░░░░░░░ *
 * ░░░░░░░░░░░░░░░░██░░██░░░░░░██░░░░░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░░░██░░░░██████░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░░░██░░░░░░██░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░░░██░░░░░░██░░░░░░░░░░░░░░░░░░░░░░ *
 *                              OxCRYPTOPUNKS™ 2023 *
 ****************************************************/

/* N1: The first code to run. It generates a list of all image layers. NOTE: You need
   to create a new list of layers for each type (male, female, zombie, ape, alien).
   Each time you run this code, the list-of-layers.json file will be overwritten, so consider saving a copy
   for each set: e.g., list-of-layers-male.json.
 */

const fs = require('fs');
const path = require('path');
const { folders } = require('./config.js'); // Use the config.js file for setting up.

const output = {};

folders.forEach(folder => {
  const folderPath = folder.path;
  const folderName = path.basename(folderPath);
  const files = fs.readdirSync(folderPath)
    .filter(file => file.endsWith('.png'))
    .map(file => {
      const match = file.match(/.(\d+).png$/);
      const weight = match ? parseInt(match[1]) : 1; // If weight is not present, default to 1.
      return { file: file, weight: weight };
    });
  output[folderName] = files;
});

const jsonFilePath = './list-of-layers/list-of-layers.json';
fs.writeFileSync(jsonFilePath, JSON.stringify(output, null, 4));

console.log(`A list of layers was successfully generated to list-of-layers/list-of-layers.json`);

