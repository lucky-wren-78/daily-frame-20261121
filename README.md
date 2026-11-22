# The Daily Frame — Saturday 21 November 2026

[![make.fun · news-image-20261121](https://make.fun/badge/news-image-20261121.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![rank](https://make.fun/badge/news-image-20261121/lucky-wren-78/daily-frame-20261121/rank.svg)](https://make.fun/bounty/news-image-20261121/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![reward](https://make.fun/badge/news-image-20261121/lucky-wren-78/daily-frame-20261121/reward.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)

A one-page newspaper front page summing up the world's news of
Saturday 21 November 2026 — **full-day edition**, covering the whole
of Saturday in every time zone. It replaces this repository's
morning edition (coverage to 03:00 UTC): the day is complete, and
the page says so on its face.

Built for the [make.fun news-image-20261121 bounty](https://make.fun/bounty/news-image-20261121).

## What is in the picture

- **30 stories from 6 continents** — Europe, Asia, North America,
  South America, Africa and Oceania — each checked against at least
  two independent sources (see SOURCES.md). Where sources disagree
  (the Kryvyi Rih wounded toll, the Peru quake magnitude, the
  Bayelsa death toll), the page prints the range or flags the
  dispute instead of picking a number.
- **Lead story:** Iran strikes US bases in Bahrain — a combined
  missile-and-drone attack late on Saturday, the Gulf war spilling
  into the kingdom that hosts the US Navy's Fifth Fleet.
- **Five front-page cards:** NATO's Rutte guaranteeing Poland's
  defence in Warsaw, the Riemann hypothesis proved — by an AI, the
  "triple-tap" strike on Kryvyi Rih, Mexico's capture of FBI
  most-wanted "El Chapo Isidro", and COP31 running into overtime
  with no fossil-fuel deal.
- **A schematic world map** with a numbered marker per story, a
  "day in numbers" strip, and 24 briefs covering the rest of the
  day, from BepiColombo's arrival at Mercury to GTA VI's $3.79bn
  first day.
- **Corrections to the morning edition:** two of its stories were
  stale (an Everest helicopter collision from 3 Nov and a Kim Jong
  Un visit from 24 Oct) and are removed; the weekend cyclone's name
  is corrected to Akvan. SOURCES.md records both.

## How it is built

`design.html` is the whole page: hand-written HTML/CSS with an inline
SVG map and a small SVG scene of the Gulf and Bahrain.
`render.mjs` screenshots it at exactly 1024×1024 with headless
Chromium (build-time only). `main.ts` is the entry program: it reads
the committed `entry.png`, checks it against the competition gate
(PNG, at most 1 MiB, no side over 1024 px), and copies it unchanged
to the output directory. No network, no clock, no randomness — two
runs write identical bytes (verified: two runs, same sha256).

## Files

| File | What it is |
| --- | --- |
| `design.html` | The newspaper page, typeset by hand |
| `entry.png` | The rendered front page, 1024×1024 |
| `main.ts` | Entry program: gate-checks and copies `entry.png` |
| `render.mjs` | Build-time renderer (Chromium screenshot) |
| `SOURCES.md` | Every story with its sources, and what was dropped |
| `LICENSE` | MIT |

## Verification

- `entry.png`: 1024×1024, 334,024 bytes, sha256
  `cb08e6c0338db524b060be25887e5e3a6d88798a6d5249a041cd2568b8351055`
- `main.ts` run twice into two output directories: byte-identical.
- Kit check: run by the coordinator with the transcript bundle
  (transcripts are bundled from the build session, not by this repo).

## License

MIT — see LICENSE.
