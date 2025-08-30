
import { error } from "console";
import fs from "fs/promises";
import path from "path";
const sourceFile = process.argv[2];
const destinationFile = process.argv[3];

if (!sourceFile || !destinationFile) {
  console.error("Usage: node app.js <sourceFile> <destinationFile>");
  console.log(process.argv);
  process.exit(1);
}

const sourcePath = path.resolve(sourceFile);
const destinationPath = path.resolve(destinationFile);

try {
  const readHandle = await fs.open(sourceFile, "r");
  const writeHandle = await fs.open(destinationFile, "w");

  const readStream = readHandle.createReadStream();
  const writeStream = writeHandle.createWriteStream();

  readStream.pipe(writeStream);

  writeStream.on("finish", () => {
    console.log("File Copied");
  });

  await readHandle.close();
  await writeHandle.close();

  readStream.on('error', (error) => {
    console.log("Read error:",error.message);
  });

  writeStream.on('error', (error) => {
    console.log("Write error:",error.message);
  });

} catch (err) {
    console.log("Error:",err.message);
}

