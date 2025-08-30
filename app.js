#!/usr/bin/env node

import { error } from "console";
import fs from "fs/promises";
import path from "path";
const currCase = process.argv[2];
const sourceFile = process.argv[3];
const destinationFile = process.argv[4];

if (!sourceFile || !destinationFile) {
  console.error("Usage: node app.js <sourceFile> <destinationFile>");
  console.log(process.argv);
  process.exit(1);
}

const sourcePath = path.resolve(sourceFile);
const destinationPath = path.resolve(destinationFile);

switch (currCase) {
  case "copy":
    try {
      await copyFile(sourceFile, destinationFile);
    } catch (error) {
      console.error("Something might wrong , Copying failed:", error.message);
    }
    break;

  case "move":
    try {
      await copyFile(sourceFile, destinationFile);
      await fs.unlink(sourceFile);
      console.log("File Moved!");
    } catch (error) {
      console.error("Something might wrong , Move failed:", error.message);
    }
    break;

  default:
    console.error(
      "Usage: node app.js <copy|move> <sourceFile> <destinationFile>",
      error.message
    );
    break;
}

async function copyFile(src, dest) {
  try {
    const readHandle = await fs.open(src, "r");
    const writeHandle = await fs.open(dest, "w");

    const readStream = readHandle.createReadStream();
    const writeStream = writeHandle.createWriteStream();

    readStream.on("error", (err) => console.log("Read error:", err.message));
    writeStream.on("error", (err) => console.log("Read error:", err.message));

    readStream.pipe(writeStream);

    writeStream.on("finish", () => {
      console.log("File Copied");
      readStream.close();
      writeStream.close();
    });

    await readHandle.close();
    await writeHandle.close();

    readStream.on("error", (error) => {
      console.log("Read error:", error.message);
    });

    writeStream.on("error", (error) => {
      console.log("Write error:", error.message);
    });
  } catch (err) {
    console.log("Error:", err.message);
  }
}
