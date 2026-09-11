# adaumsilva.github.io

Adam Silva's portfolio. Plain static HTML/CSS/JS — no framework, no build step.

Live: https://adaumsilva.github.io

## Structure

| Path | Purpose |
| --- | --- |
| `index.html` | Home page |
| `projects/*/index.html` | Project case studies with screenshot galleries |
| `404.html` | Custom not-found page served by GitHub Pages |
| `style.css` | All styles (site, assistant, preloader, scroll effects) |
| `preloader.js` | Loading screen; runs first on every page |
| `script.js` | Navigation, hero parallax, counters, scroll-linked blur/fade |
| `retrieval.js` | Extractive search engine over `knowledge.json` |
| `assistant.js` | "Ask Adam" section + floating assistant dialog (both use `retrieval.js`) |
| `gallery.js` | Project page galleries and lightbox |
| `knowledge.json` | Reviewed passages from the portfolio and résumé used by the assistant |

## Local preview

The assistant fetches `knowledge.json`, so the site must be served over HTTP (not `file://`):

```bash
python -m http.server 8000
# open http://localhost:8000
```

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which uploads the static files
to GitHub Pages (Settings → Pages → Source must be **GitHub Actions**). `.nojekyll`
keeps Pages from running Jekyll on the files.

## Updating the assistant

The assistant is extractive search, not a generative model: it only returns passages
that already exist in `knowledge.json`. When the portfolio or résumé changes, edit the
corresponding records there. Each record's `href` must be a same-page anchor
(`#work`) or `resume.pdf#page=N`.
