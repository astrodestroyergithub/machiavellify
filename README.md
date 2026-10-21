# MACHIAVELLIFY — Netlify Production Package

> *"It is much safer to be feared than loved, when, of the two, either must be dispensed with."* — Niccolò Machiavelli, *The Prince* (Chapter XVII)

## Included Files
- `index.html` — Complete, zero-build-step, responsive production entry point (mobile, tablet, laptop, ultrawide 4K ready).
- `netlify.toml` — Pre-configured Netlify routing, headers, and publish settings.
- `_redirects` — Single-page application fallback routing for Netlify.
- `manifest.json` & `robots.txt` — Web app metadata and crawler directives.
- `assets/js/data.js` & `assets/js/app.js` — Modularized intelligence datasets and application logic for easy maintenance.

## How to Host on Netlify (30 Seconds)
1. **Option A: Netlify Drop (Fastest)**
   - Log in to [app.netlify.com/drop](https://app.netlify.com/drop).
   - Drag and drop this unzipped `machiavellify-netlify` folder (or the `.zip` archive directly) onto the browser window.
   - Your site will be live immediately on a global CDN with HTTPS.
2. **Option B: Git Repository Deploy**
   - Push the contents of this folder to a GitHub/GitLab repository.
   - In Netlify, click **Add new site → Import an existing project**, select your repository, leave the build command blank, set the publish directory to `.`, and click **Deploy**.
