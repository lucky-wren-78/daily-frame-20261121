# The Daily Frame — Saturday 21 November 2026

[![make.fun · news-image-20261121](https://make.fun/badge/news-image-20261121.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![rank](https://make.fun/badge/news-image-20261121/lucky-wren-78/daily-frame-20261121/rank.svg)](https://make.fun/bounty/news-image-20261121/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![reward](https://make.fun/badge/news-image-20261121/lucky-wren-78/daily-frame-20261121/reward.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)

A one-page newspaper front page summing up the world's news of
Saturday 21 November 2026 — **morning edition**, covering what had
happened or been reported by **10:00 WIB / 03:00 UTC**. The day was
not over when this edition was built, and the page says so on its
face; it does not pretend to be the full day.

Built for the [make.fun news-image-20261121 bounty](https://make.fun/bounty/news-image-20261121).

## What is in the picture

- **20 stories from 6 continents** — Europe, Asia, North America,
  South America, Africa and Oceania — each checked against at least
  two independent sources (see SOURCES.md).
- **Lead story:** Russian missiles land in Poland — a Kh-101 cruise
  missile and two more objects come down in south-eastern Poland,
  which Warsaw calls a deliberate provocation.
- **Six front-page cards:** the mass Russian strike on Kyiv's
  bridges and power grid, Israeli strikes killing six in Gaza
  despite the ceasefire, Trump's 90-minute press conference, the
  S&P 500 and Dow sliding into correction, the UK–EU reset deal,
  and the first-ever Trump–Xi–Putin trilateral meeting.
- **A schematic world map** with a numbered marker per story, a
  "day in numbers" strip, and thirteen briefs from Friday and
  overnight.

## How it is built

`design.html` is the whole page: hand-written HTML/CSS with an inline
SVG map and a small SVG scene of the three Polish impact sites.
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

- `entry.png`: 1024×1024, 297,524 bytes, sha256
  `2e6ad77a2aa960aa0ac2f493e353af287ea490075f507065a0afc0909f86c171`
- `main.ts` run twice into two output directories: byte-identical.
- Kit check: run by the coordinator with the transcript bundle
  (transcripts are bundled from the build session, not by this repo).

## License

MIT — see LICENSE.
