# 📦 File Transfer CLI

A simple and efficient **Node.js CLI tool** to **copy and move files** with a real-time **progress bar**.
Built using **file streams**, it supports large files and ensures memory efficiency.

---

## 🚀 Installation

### 1. Clone or install globally

```bash
# If publishing to npm later:
npm install -g file-transfer-cli
```

### 2. Make script executable (Linux/macOS only)

```bash
chmod +x app.js
```

Now you can run it directly with `./app.js` instead of `node app.js`.

---

## 🛠 Usage

### Syntax

```bash
./app.js <copy|move> <sourceFile> <destinationFile>
```

### Example: Copy a file

```bash
./app.js copy text.txt copy_text.txt
```

✅ Creates a copy of `text.txt` as `copy_text.txt` with a live progress bar.

### Example: Move a file

```bash
./app.js move text.txt moved_text.txt
```

✅ Moves `text.txt` to `moved_text.txt` (deletes the source file after copying).

---

## 🎯 Features

* 🗂️ **Copy & Move** files via CLI
* 📊 **Real-time progress bar** (with percentage)
* ⚡ **Stream-based transfer** → handles large files without memory issues
* 🛡️ **Error handling** for missing files, invalid paths, or permission issues
* ✅ **Cross-platform** (Windows, macOS, Linux)

---

## ⚠️ Error Handling

* If you forget arguments:

  ```bash
  Usage: node app.js <copy|move> <sourceFile> <destinationFile>
  ```
* If the source file doesn’t exist:

  ```
  Error: ENOENT: no such file or directory
  ```
* If permissions are denied:

  ```
  Error: EACCES: permission denied
  ```

---

## 📋 Roadmap

* [ ] Add recursive folder copy support
* [ ] Add overwrite confirmation prompt
* [ ] Add resume support for interrupted transfers
* [ ] Add HTTP/REST API integration for remote transfers

---

## 🧑‍💻 Tech Stack

* Node.js
* `fs` & `fs/promises` for file operations
* Streams for efficient I/O
* `readline` for dynamic progress bar

---

## 📜 License

MIT License © 2025 Varun Mendre
