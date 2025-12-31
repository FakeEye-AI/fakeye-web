import archiver from 'archiver';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extensionDir = path.join(__dirname, '..', 'phishing-email-detector-chorme-extension');
const publicDir = path.join(__dirname, '..', 'public');
const outputPath = path.join(publicDir, 'phishing-email-detector-extension.zip');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create a write stream
const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', {
  zlib: { level: 9 } // Maximum compression
});

output.on('close', () => {
  console.log(`✅ Extension bundled successfully!`);
  console.log(`📦 Size: ${(archive.pointer() / 1024).toFixed(2)} KB`);
  console.log(`📁 Output: ${outputPath}`);
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

// Add all files from the extension directory
archive.directory(extensionDir, 'phishing-email-detector-extension');

archive.finalize();
