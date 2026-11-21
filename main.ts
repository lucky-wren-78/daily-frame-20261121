// The Daily Frame — entry program for the make.fun news-image-20261121 bounty.
//
// Morning edition for Saturday 21 November 2026: twenty stories from
// six continents, laid out as one newspaper front page. The page is
// typeset in design.html; render.mjs (a build-time helper the grader
// never runs) turns it into the entry.png committed beside this file.
//
// The program itself is deliberately plain. It reads the committed
// picture, checks it against the competition's image gate (one PNG or
// JPEG, at most 1 MiB, no side longer than 1024 px), and copies it
// unchanged into the output directory. Nothing here depends on the
// clock, the network or any random input, so two runs always deliver
// identical bytes. The gate check runs before any write, so a bad
// image fails loudly instead of producing a bad output.
//
// Try it outside the grader container with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ENTRY = new URL('./entry.png', import.meta.url);
const OUT_NAME = 'entry.png';

// Image gate, as stated in the kit's RULES.txt.
const LIMIT = { bytes: 1_048_576, side: 1024 } as const;

function fail(message: string): never {
  throw new Error(`entry.png failed the image gate: ${message}`);
}

function pngSize(buf: Buffer): { width: number; height: number } {
  // In a PNG the width and height sit at byte offsets 16 and 20 as
  // big-endian 32-bit integers, right after the 8-byte signature and the
  // 8-byte IHDR length/type header.
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function tailIsWhole(buf: Buffer, kind: 'png' | 'jpeg'): boolean {
  if (kind === 'png') {
    // A well-formed PNG ends with the empty IEND chunk and its fixed CRC.
    const tail = Buffer.from('0000000049454e44ae426082', 'hex');
    return buf.subarray(buf.length - tail.length).equals(tail);
  }
  // A JPEG ends with the end-of-image marker 0xFF 0xD9.
  return buf[buf.length - 2] === 0xff && buf[buf.length - 1] === 0xd9;
}

function sniffKind(buf: Buffer): 'png' | 'jpeg' | null {
  const pngSig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (pngSig.every((byte, i) => buf[i] === byte)) return 'png';
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpeg';
  return null;
}

const image = readFileSync(ENTRY);

if (image.length > LIMIT.bytes) {
  fail(`it is ${image.length} bytes, over the ${LIMIT.bytes}-byte cap`);
}

const kind = sniffKind(image);
if (kind === null) fail('it is neither a PNG nor a JPEG');

if (kind === 'png') {
  const { width, height } = pngSize(image);
  if (width > LIMIT.side || height > LIMIT.side) {
    fail(`it is ${width}x${height}, over the ${LIMIT.side}x${LIMIT.side} cap`);
  }
}
if (!tailIsWhole(image, kind)) {
  fail('its tail marker is missing; the file looks truncated');
}

const destination = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(destination, { recursive: true });
copyFileSync(ENTRY, join(destination, OUT_NAME));
// A plain copy, never a re-encode: the bytes in /output are the bytes
// committed in the repository, so the two graded runs must agree.
console.log(`delivered ${OUT_NAME} (${image.length} bytes) to ${destination}`);
