import { aeonsBaseMetadata, netherMetadata } from "./aeonsBaseMetadata";
import { AeonBaseMetadata, OpenSeaMetadata } from "./types";
import { shuffle } from "./functions";
const fs = require("fs");

export function createMetadataArray() {
  let aeons: AeonBaseMetadata[] = [];

  const metadataDir = "metadata";
  const aeonsDir = metadataDir + "/aeons";

  aeonsBaseMetadata.map((realm) => {
    const arr = new Array(realm.numberOfAeons).fill(realm);
    aeons = aeons.concat(arr);
  });

  console.log("Created array of aeons with length", aeons.length);

  console.log("Shuffle start");
  aeons = shuffle(shuffle(aeons));
  console.log("Shuffle end");

  console.log("Adding Nether Realm after shuffle");
  const netherAeons = new Array(netherMetadata.numberOfAeons).fill(
    netherMetadata
  );
  aeons = aeons.concat(netherAeons);

  console.log("Creating actual metadata array");

  const aeonsMetadata: OpenSeaMetadata[] = aeons.map((aeon, index) => ({
    name: "Aeon #" + (index + 1).toString(),
    description: aeon.description,
    tokenId: index + 1,
    image: aeon.image,
    attributes: [
      {
        trait_type: "Realm",
        value: aeon.realm,
      },
    ],
  }));

  const data = JSON.stringify(aeonsMetadata);

  if (!fs.existsSync(metadataDir)) {
    fs.mkdirSync(metadataDir);
  }

  fs.writeFile("metadata/aeonsMetadata.json", data, (err: any) => {
    if (err) {
      throw err;
    }
    console.log("JSON metadata array is saved.");
  });

  if (!fs.existsSync(aeonsDir)) {
    fs.mkdirSync(aeonsDir);
  }

  console.log("Creating all metadata files");
  createAllMetadataFiles(aeonsMetadata);
}

export function createAllMetadataFiles(metadataArray: OpenSeaMetadata[]) {
  for (let i = 0; i < metadataArray.length; i++) {
    const data = JSON.stringify(metadataArray[i]);
    fs.writeFile(`metadata/aeons/${i + 1}`, data, (err: any) => {
      if (err) {
        throw err;
      }
      console.log("Metadata for id", i + 1, "is saved.");
    });
  }
}

createMetadataArray();
