# Where Did the Stream Go?

An interactive web-zine about the gap between a Spotify stream count and the amount an artist actually receives. Visitors scroll through the payment trail, choose an independent or label route, and encounter a blank value that the public data cannot fill.

The changing visual shows how visibility into a payment becomes limited. It does not measure how much money any company deducts. The two paths are illustrative, and a stream has no universal fixed payout.

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000. For a production check, run `npm run build`.

## Project files

- `app/page.tsx` contains the chapters, visual states, interactions, ledger, statement, and sources.
- `app/globals.css` contains the layout, colors, and animation.
- `app/layout.tsx` contains the page title and description.
- `public/favicon.svg` is the browser icon.

## Sources

- [Mimi Onuoha, *On Missing Data Sets*](https://github.com/MimiOnuoha/missing-datasets)
- [Spotify, *Understanding Spotify Royalties*](https://support.spotify.com/lc/artists/article/understanding-spotify-royalties/)
- [Spotify, *How Is Spotify Measuring Payouts?*](https://loudandclear.byspotify.com/faqs/how-is-spotify-measuring-payouts-on-this-site-why-doesnt-this-focus-on-what-artists-actually-take-home/)
- [UK Competition and Markets Authority, *Music and Streaming Market Study*](https://www.gov.uk/government/publications/music-and-streaming-market-study-final-report/executive-summary)

The interactive site URL is submitted separately with the assignment.
