/*
  Reads content/photos/*.json, works out each photo's orientation from the
  actual image file, and writes photos.json for the grid to read.

  Runs on Netlify at publish time. Nothing here needs editing by hand.
*/

const fs = require("fs");
const path = require("path");

const CONTENT_DIR = path.join(__dirname, "content", "photos");
const OUT_FILE = path.join(__dirname, "photos.json");

// Reads width and height straight out of a JPEG or PNG header.
function imageSize(file) {
  const buf = fs.readFileSync(file);

  // PNG
  if (buf.length > 24 && buf.toString("hex", 0, 8) === "89504e470d0a1a0a") {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // JPEG — walk the segments until a start-of-frame marker
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
      const sof = [0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf];
      if (sof.includes(marker)) {
        return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }

  throw new Error(`Could not read dimensions from ${file}`);
}

function build() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`No ${CONTENT_DIR} directory — nothing to build.`);
    fs.writeFileSync(OUT_FILE, "[]");
    return;
  }

  const photos = fs.readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((file) => {
      const record = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), "utf8"));
      const slug = file.replace(/\.json$/, "");

      if (!record.image) throw new Error(`${file} has no image.`);
      const imagePath = path.join(__dirname, record.image.replace(/^\//, ""));
      if (!fs.existsSync(imagePath)) throw new Error(`${file} points at a missing image: ${record.image}`);

      const { width, height } = imageSize(imagePath);

      return {
        slug,
        title: record.title || slug,
        image: record.image,
        alt: record.alt || "",
        caption: record.caption || "",
        year: record.year || "",
        order: typeof record.order === "number" ? record.order : 9999,
        tags: Array.isArray(record.tags) ? record.tags : [],
        orientation: width > height ? "landscape" : "portrait",
        width,
        height
      };
    })
    .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));

  fs.writeFileSync(OUT_FILE, JSON.stringify(photos, null, 2));
  console.log(`Wrote photos.json — ${photos.length} photos.`);
}

build();
