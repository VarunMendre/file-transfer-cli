#!/usr/bin/env node

import fs from "fs/promises";
import { createReadStream, createWriteStream } from "fs";
import path from "path";
import readline from "readline";

const currCase = process.argv[2];
const sourceFile = process.argv[3];
const destinationFile = process.argv[4];

if (!sourceFile || !destinationFile) {
  console.error("Usage: node app.js <copy|move> <sourceFile> <destinationFile>");
  process.exit(1);
}

const sourcePath = path.resolve(sourceFile);
const destinationPath = path.resolve(destinationFile);

switch (currCase) {
  case "copy":
    try {
      await copyFile(sourcePath, destinationPath);
    } catch (error) {
      console.error("Something went wrong, Copying failed:", error.message);
    }
    break;

  case "move":
    try {
      await copyFile(sourcePath, destinationPath);
      await fs.unlink(sourcePath);
      console.log("File Moved!");
    } catch (error) {
      console.error("Something went wrong, Move failed:", error.message);
    }
    break;

  default:
    console.error("Usage: node app.js <copy|move> <sourceFile> <destinationFile>");
    break;
}

async function copyFile(src, dest) {
  try {
    const stats = await fs.stat(src);
    const totalSize = stats.size;
    let transferred = 0;

    const readStream = createReadStream(src);
    const writeStream = createWriteStream(dest);

    readStream.on("data", (chunk) => {
      transferred += chunk.length;
      const percent = ((transferred / totalSize) * 100).toFixed(2);

      const barLength = 30;
      const filledLength = Math.round((barLength * transferred) / totalSize);
      const bar = "█".repeat(filledLength) + "-".repeat(barLength - filledLength);

      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`Copying: [${bar}] ${percent}%`);
    });

    writeStream.on("finish", () => {
      console.log("\n✅ File Copied Successfully!");
    });

    readStream.on("error", (err) => console.error("Read error:", err.message));
    writeStream.on("error", (err) => console.error("Write error:", err.message));

    readStream.pipe(writeStream);
  } catch (err) {
    console.error("Error:", err.message);
  }
}
