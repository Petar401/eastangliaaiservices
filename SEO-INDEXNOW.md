# IndexNow (Bing) integration

This site uses [IndexNow](https://www.bing.com/indexnow/getstarted) to tell Bing
(and other participating search engines) as soon as a page is added or changed,
instead of waiting for the next crawl.

## How it works

1. **Key file (ownership proof).** IndexNow requires a plain-text file containing
   your key, hosted at the site root, so a search engine can confirm you control
   the domain before accepting submissions on its behalf. Two such files exist in
   this repo, both valid at once (IndexNow allows multiple active keys per site):
   - `58cd3c7b05f949a6bb317d97886dd339.txt` — from an earlier setup, left in place.
   - `295da9ea4a2245599431910b3e8d0818.txt` — the current key file, used by the workflow below.
     (The filename *is* the key value — that's the only place in this repo the
     raw key string is written; everywhere else, including this doc, refers to
     it only by filename.)

   **These files are meant to be public** — that's the entire verification
   mechanism (Bing fetches `https://eastangliaaiservices.co.uk/<key>.txt` and
   checks the contents match the key in the submission). Publishing them is not
   a secret leak.

2. **Submission workflow.** `.github/workflows/indexnow.yml` runs on every push
   to `main` that touches `sitemap.xml` or any `.html` page (and can also be run
   manually via "Run workflow" in the Actions tab). It reads all `<loc>` URLs out
   of `sitemap.xml` and POSTs them to `https://api.indexnow.org/IndexNow`.

   The key value used for that POST is **never hardcoded** in the workflow file
   or anywhere else in source control. It's read at runtime from the encrypted
   GitHub Actions repository secret `INDEXNOW_KEY`, which only this repo's
   workflow runs can access. Nothing in the workflow prints the key or the full
   request payload to the logs.

## One-time setup (required for the workflow to run)

Add the repository secret once:

1. GitHub → this repo → **Settings** → **Secrets and variables** → **Actions**
   → **New repository secret**.
2. Name: `INDEXNOW_KEY`
3. Value: the contents of `295da9ea4a2245599431910b3e8d0818.txt` (i.e. the
   filename minus the `.txt` extension) — copy it from that file rather than
   retyping it, so the raw key never needs to be pasted into chat, an issue,
   or any other document.

Until this secret is set, the workflow fails fast with a clear message instead
of silently doing nothing.

## For future updates

When adding a new page, add it to `sitemap.xml` as usual (this was already the
convention). No extra step is needed — the next push to `main` re-submits the
full URL list automatically. Keep following this pattern (key file at the root
+ this workflow reading the key from `INDEXNOW_KEY`) rather than re-hardcoding
a key anywhere, if the key is ever rotated: add the new `<key>.txt` file, update
the `INDEXNOW_KEY` secret, and optionally leave old key files in place (they're
harmless).
