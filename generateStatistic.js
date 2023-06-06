const fs = require("fs");

function updateStatistic() {
  // read combinations.json and count layer usage
  const combinations = JSON.parse(
    fs.readFileSync("./combinations/combinations.json")
  );
  const layerUsage = {};
  for (const key in combinations) {
    const layers = combinations[key];
    for (const layer of layers) {
      const layerName = layer.split(".")[0];
      if (layerUsage[layerName]) {
        layerUsage[layerName]++;
      } else {
        layerUsage[layerName] = 1;
      }
    }
  }

  // read list-of-layers.json and copy its structure
  const layersList = JSON.parse(
    fs.readFileSync("./list-of-layers/list-of-layers.json")
  );
  const statistic = {};

  // create a copy of the layers list with usage counts
  for (const layerName in layersList) {
    const layerFiles = layersList[layerName];
    const layerStat = [];
    for (const layerFile of layerFiles) {
      const fileName = layerFile.file;
      const fileExtension = fileName.split(".").pop();
      const usageCount = layerUsage[fileName.split(".")[0]] || 0;
      const usedField = `used: ${usageCount} times`;
      const updatedFile = {
        file: fileName,
        used: usedField,
      };
      layerStat.push(updatedFile);
    }
    statistic[layerName] = layerStat;
  }

  // sort layers in each layerStat object by usage count
  for (const layerStat of Object.values(statistic)) {
    layerStat.sort((a, b) => {
      const aCount = parseInt(a.used.split(" ")[1]);
      const bCount = parseInt(b.used.split(" ")[1]);
      return aCount - bCount;
    });
  }

  // write updated version of list-of-layers.json to statistic.json
  const sortedStatistic = Object.fromEntries(
    Object.entries(statistic).sort(([, a], [, b]) => b.length - a.length)
  );
  fs.writeFileSync(
    "./statistic.json",
    JSON.stringify(sortedStatistic, null, 4)
  );
  console.log("Statistic file generated successfully!");
}

updateStatistic();
