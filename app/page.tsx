"use client";

import { useEffect, useRef, useState } from "react";

type Path = "label" | "independent";

// Keep the writing separate from the layout so the chapter text is easy to revise.
const chapters = [
  {
    number: "01",
    tag: "THE COUNT",
    title: "A play becomes a number.",
    body: "When I play a song, Spotify adds one to its stream count. That number is easy to see, but it cannot tell me how much the musician actually earned.",
    foot: "VISIBLE / STREAM COUNT",
  },
  {
    number: "02",
    tag: "THE POOL",
    title: "There is no price tag on this play.",
    body: "A stream does not have one set price. Spotify pays rights holders from royalty pools based on their share of eligible streams, so the count alone cannot be turned into an artist's paycheck.",
    foot: "VISIBLE / THE MODEL, NOT THE PAYCHECK",
  },
  {
    number: "03",
    tag: "THE RECIPIENT",
    title: "The payment reaches a rights holder.",
    body: "The payment goes to a rights holder first. An independent artist and an artist signed to a label may have different paths from there. Choose one to follow.",
    foot: "THE ROUTE DEPENDS ON THE AGREEMENT",
  },
  {
    number: "04",
    tag: "THE CONTRACT",
    title: "Then the trail becomes harder to follow.",
    body: "The artist's agreement affects what they receive after Spotify pays the rights holder. Without the contract and payment records, someone looking at the public stream count cannot follow the money all the way through.",
    foot: "MISSING / A CONNECTED PAYMENT TRAIL",
  },
  {
    number: "05",
    tag: "THE BLANK CELL",
    title: "What did the artist receive?",
    body: "This is the number I wanted to find: what the artist actually received. The answer depends on records held by different companies, so the public stream count leaves this space blank.",
    foot: "THE DATASET THIS ZINE IS ABOUT",
  },
  {
    number: "06",
    tag: "THE POSSIBILITY",
    title: "A different kind of transparency.",
    body: "Artists could have access to their own full payment records. The public could see comparisons that group payments without exposing anyone's private income. Both would make streaming pay easier to question.",
    foot: "PRIVATE DETAIL / PUBLIC PATTERNS",
  },
];

const sources = [
  [
    "Mimi Onuoha — On Missing Data Sets",
    "https://github.com/MimiOnuoha/missing-datasets",
  ],
  [
    "Spotify — Understanding Spotify Royalties",
    "https://support.spotify.com/lc/artists/article/understanding-spotify-royalties/",
  ],
  [
    "Spotify — How Is Spotify Measuring Payouts?",
    "https://loudandclear.byspotify.com/faqs/how-is-spotify-measuring-payouts-on-this-site-why-doesnt-this-focus-on-what-artists-actually-take-home/",
  ],
  [
    "UK Competition and Markets Authority — Executive Summary",
    "https://www.gov.uk/government/publications/music-and-streaming-market-study-final-report/executive-summary",
  ],
];

function Visual({
  active,
  path,
  reveal,
  setReveal,
}: {
  active: number;
  path: Path;
  reveal: boolean;
  setReveal: () => void;
}) {
  return (
    <div
      className="visual"
      aria-label={`Chapter ${active + 1} illustration: ${chapters[active].title}`}
    >
      <div className="visual-head">
        <span>PAYMENT TRAIL / FIG. 01</span>
        <span>{chapters[active].number} — 06</span>
      </div>
      <div className="visual-field">
        <div className="track" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        {active === 0 && (
          <div className="viz-content" key="count">
            <div className="play-orbit">
              <b>▶</b>
            </div>
            <strong>+ 1 STREAM</strong>
            <small>One event recorded.</small>
          </div>
        )}
        {active === 1 && (
          <div className="viz-content" key="pool">
            <div className="pool">
              {Array.from({ length: 22 }, (_, i) => (
                <i
                  key={i}
                  style={{
                    left: `${9 + ((i * 37) % 82)}%`,
                    top: `${7 + ((i * 53) % 84)}%`,
                    opacity: 0.45 + (i % 3) * 0.22,
                  }}
                />
              ))}
            </div>
            <strong>ROYALTY POOL</strong>
            <small>Allocated by streamshare.</small>
          </div>
        )}
        {active === 2 && (
          <div className="viz-content path-viz" key={path}>
            <span>SPOTIFY</span>
            <i />
            <span className="bright">PAYS A RIGHTS HOLDER</span>
            <i />
            <span>
              {path === "label" ? "E.G. A LABEL" : "E.G. A DISTRIBUTOR"}
            </span>
            <small>One possible recipient, not a universal chain.</small>
          </div>
        )}
        {active === 3 && (
          <div className="viz-content" key="contract">
            <div className="receipt">
              <header>INDIVIDUAL AGREEMENT ↗</header>
              <div>
                <span>Stream count</span>
                <b>RECORDED</b>
              </div>
              <div>
                <span>Payment</span>
                <b>PRIVATE</b>
              </div>
              <div>
                <span>Contract terms</span>
                <em />
              </div>
              <div>
                <span>Artist share</span>
                <em className="short" />
              </div>
            </div>
            <small>Records exist in different places.</small>
          </div>
        )}
        {active === 4 && (
          <div className="viz-content" key="blank">
            <span className="missing-caption">ARTIST TAKE-HOME</span>
            <button
              className={`question ${reveal ? "revealed" : ""}`}
              type="button"
              onClick={setReveal}
              aria-label="Try to reveal the artist payment"
            >
              {reveal ? "UNKNOWN" : "?"}
            </button>
            <small>
              {reveal
                ? "The stream count alone cannot answer this."
                : "Tap to reveal the amount"}
            </small>
          </div>
        )}
        {active === 5 && (
          <div className="viz-content access" key="access">
            <div>
              <span>ARTIST VIEW</span>
              <strong>FULL TRAIL</strong>
              <small>Private, verifiable records</small>
            </div>
            <div>
              <span>PUBLIC VIEW</span>
              <strong>GROUPED DATA</strong>
              <small>Patterns without individual incomes</small>
            </div>
          </div>
        )}
      </div>
      <div className="visual-foot">
        <i />
        <span>{chapters[active].foot}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState(0);
  const [path, setPath] = useState<Path>("label");
  const [reveal, setReveal] = useState(false);
  const [progress, setProgress] = useState(0);
  const sections = useRef<(HTMLElement | null)[]>([]);

  // Switch the panel when a chapter reaches the middle of the screen.
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max ? Math.max(0, Math.min(100, (scrollY / max) * 100)) : 0);
      const mark = innerHeight * 0.53;
      let next = 0;
      sections.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= mark) next = i;
      });
      setActive(next);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <main>
      <div
        className="progress"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
      <header className="topbar">
        <a className="brand" href="#top">
          <b>●</b> WDTSG <span>/ WEB-ZINE</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#story">THE STORY</a>
          <a href="#about">ABOUT</a>
          <a href="#sources">SOURCES</a>
        </nav>
        <div className="issue">
          ISSUE No. 01 <b>↗</b>
        </div>
      </header>
      <section id="top" className="hero">
        <div className="hero-kicker">
          <i />
          AN INTERACTIVE ESSAY ABOUT MISSING DATA
        </div>
        <div className="hero-main">
          <div className="hero-copy">
            <h1>
              Where did
              <br />
              the stream <em>go?</em>
            </h1>
            <p>
              We can count the play.
              <br />
              Can we follow the pay?
            </p>
            <a className="start" href="#story">
              FOLLOW THE TRAIL <span>↓</span>
            </a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <i className="ring outer" />
            <i className="ring inner" />
            <div className="orb" />
            <span className="label one">
              ONE STREAM
              <br />
              RECORDED
            </span>
            <span className="label two">
              ARTIST PAY
              <br />
              NOT SHOWN
            </span>
            <span className="ghost-question">?</span>
          </div>
        </div>
        <div className="hero-bottom">
          <span>SCROLL TO FOLLOW A SINGLE PLAY</span>
          <span>01 — 06 / AN ILLUSTRATIVE JOURNEY</span>
        </div>
      </section>
      <div className="between">
        <small>THE NUMBER YOU SEE</small>
        <strong>1 PLAY</strong>
        <small>THE NUMBER YOU CAN’T</small>
        <strong className="serif">?</strong>
      </div>
      <section className="story" id="story">
        <div className="story-intro">
          <div>
            <small>THE INTERACTIVE SEQUENCE</small>
            <h2>Follow the trail.</h2>
          </div>
          <p>
            Scroll through six chapters. This is a conceptual map, not a
            calculation of a particular artist’s pay.
          </p>
        </div>
        <div className="story-grid">
          <div className="chapters">
            {chapters.map((c, i) => (
              <article
                className={`chapter ${active === i ? "selected" : ""}`}
                key={c.number}
                id={`chapter-${c.number}`}
                ref={(el) => {
                  sections.current[i] = el;
                }}
              >
                <div className="chapter-label">
                  {c.number} / {c.tag}
                </div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                {i === 2 && (
                  <div className="path-picker">
                    <small>CHOOSE A PATH</small>
                    <div>
                      <button
                        type="button"
                        aria-pressed={path === "independent"}
                        onClick={() => setPath("independent")}
                      >
                        Independent
                      </button>
                      <button
                        type="button"
                        aria-pressed={path === "label"}
                        onClick={() => setPath("label")}
                      >
                        Label deal
                      </button>
                    </div>
                    <p>Different agreements lead to different paths.</p>
                  </div>
                )}
                {i === 4 && (
                  <button
                    type="button"
                    className="try"
                    onClick={() => setReveal(true)}
                  >
                    TRY TO REVEAL THE VALUE <b>↗</b>
                  </button>
                )}
                <div className="chapter-bottom">
                  <span>●</span>
                  <span>{c.number} / 06</span>
                </div>
              </article>
            ))}
          </div>
          <div className="sticky">
            <Visual
              active={active}
              path={path}
              reveal={reveal}
              setReveal={() => setReveal(true)}
            />
            <p>
              Illustrative pathways. No payout amount or percentage is asserted.
            </p>
          </div>
        </div>
      </section>
      <section className="closing" id="about">
        <div className="closing-kicker">
          THE DATASET THAT ISN’T PUBLIC <span>↓</span>
        </div>
        <h2>
          A blank space
          <br />
          <em>is still a choice.</em>
        </h2>
        <div className="closing-columns">
          <p>
            To connect a stream to what an artist actually receives, we would
            need records from Spotify, rights holders, and the organizations
            that pay the artist. The public does not have one linked account of
            that path.
          </p>
          <p>
            That absence makes payments harder for artists to check and leaves
            listeners debating numbers that never show the artist’s share. More
            data alone would not guarantee fair pay, but verifiable records
            would change what can be asked.
          </p>
        </div>
        <div className="ledger">
          <h3>The missing ledger</h3>
          <p>
            To answer "What did the artist earn?", these records would need to
            connect to one another.
          </p>

          <table>
            <thead>
              <tr>
                <th>Record</th>
                <th>What we can tell</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Song streams</td>
                <td>The play count is visible.</td>
              </tr>
              <tr>
                <td>Payment to the rights holder</td>
                <td>It cannot be connected to the artist's take-home pay from the public count.</td>
              </tr>
              <tr>
                <td>Contract terms</td>
                <td>They vary and are usually private.</td>
              </tr>
              <tr>
                <td>Artist's payment</td>
                <td><strong>Unknown from the public data.</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="statement">
          <small>ARTIST STATEMENT</small>
          <p>
            This zine is designed to illustrate why the number of streams is
            inadequate to answer the question asked in the essay:
            how much money did the artist earn?
            In order to reflect reality, I created two paths:
            independent artist and label-signed artist because payment
            processes may vary between them.
            As one scrolls through the zine, the path becomes increasingly difficult
            to understand since Spotify, rights holders, and companies responsible
            for paying musicians have control over various aspects of the transaction.
            The final cell says “unknown” by design.
            Stating an estimated value in that cell would provide an
            appearance of greater accuracy than we know exists.
            This chart illustrates which records would have to be connected.
            I hope to empower musicians to examine their earnings while allowing
            everyone else to make comparisons without disclosing anyone’s personal income.
          </p>
        </div>
      </section>
      <footer id="sources">
        <div className="foot-title">
          <h2>Notes &amp; sources</h2>
          <small>NO FICTIONAL PAYOUTS WERE USED.</small>
        </div>
        <p>
          This web-zine visualizes an information gap. Its paths are
          illustrative, and a single Spotify stream has no universal fixed
          payment. These links support the factual claims in the sequence.
        </p>
        <ol>
          {sources.map(([name, url], i) => (
            <li key={url}>
              <span>0{i + 1}</span>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {name} <b>↗</b>
              </a>
            </li>
          ))}
        </ol>
        <div className="foot-bottom">
          <span>WHERE DID THE STREAM GO? / WEB-ZINE PROTOTYPE</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  );
}
