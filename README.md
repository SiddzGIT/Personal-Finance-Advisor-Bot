# Ledger & Co. — Personal Finance Advisor

A single-page budgeting, debt-payoff, and AI chat advisor tool. No build step, no framework — just `index.html`.

## What works where

| Feature | Needs a backend? |
|---|---|
| Budget builder, Overview (50/30/20 split), Debt Ledger payoff calculator | No — pure client-side JS |
| "Ask the Advisor" chat | Yes — needs one of the serverless functions below + an Anthropic API key |

If you only want the calculators, you can deploy `index.html` anywhere as a static file and skip the backend setup entirely. Chat will show a friendly "not connected yet" message instead of erroring.

## Get an API key

Create one at [console.anthropic.com](https://console.anthropic.com/settings/keys). Keep it secret — never put it directly in `index.html` or commit it to the repo. All three options below keep it server-side as an environment variable.

---

## Option 1: GitHub Pages (calculators only, no chat)

1. Push this repo to GitHub.
2. Go to **Settings → Pages**, set the source to your default branch, root folder.
3. Your site is live at `https://<username>.github.io/<repo>/`.

GitHub Pages only serves static files, so `/api/chat` won't exist and the chat tab will show the "not connected" message. Everything else works fully.

## Option 2: Vercel (calculators + chat)

1. Push this repo to GitHub, then [import it into Vercel](https://vercel.com/new).
2. In **Project Settings → Environment Variables**, add:
   - `ANTHROPIC_API_KEY` = your key
3. Deploy. Vercel automatically turns `api/chat.js` into the `/api/chat` endpoint.

## Option 3: Netlify (calculators + chat)

1. Push this repo to GitHub, then [import it into Netlify](https://app.netlify.com/start).
2. In **Site settings → Environment variables**, add:
   - `ANTHROPIC_API_KEY` = your key
3. Deploy. `netlify.toml` redirects `/api/chat` to the function in `netlify/functions/chat.js`.

## Option 4: Cloudflare Pages (calculators + chat)

1. Push this repo to GitHub, then create a Pages project pointing at it in the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. In **Settings → Environment variables**, add:
   - `ANTHROPIC_API_KEY` = your key
3. Deploy. `functions/api/chat.js` automatically becomes the `/api/chat` route.

---

## Local testing

Because it's plain HTML/CSS/JS, you can just open `index.html` in a browser for the calculators. To test chat locally, run the matching platform's CLI (e.g. `vercel dev` or `netlify dev`), which serves the function and proxies `/api/chat` for you.

## File structure

```
index.html                     the whole app (UI + logic)
api/chat.js                    Vercel function
netlify/functions/chat.js      Netlify function
netlify.toml                   redirects /api/* to the Netlify function
functions/api/chat.js          Cloudflare Pages function
```

Unused platform folders don't cause conflicts — each host only looks at its own convention, so you can leave all three in the repo and deploy the same code anywhere.

## Notes

This tool provides general educational information, not personalized financial, legal, or tax advice. It's not a substitute for a licensed financial advisor.
