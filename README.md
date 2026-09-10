# Lakshman Sharma — Portfolio

A single-page, dynamic portfolio site built from Lakshman's resume: about, skills,
experience, projects, certifications, achievements, and contact — plus a profile
photo you can change directly on the page.

No build step. Plain HTML/CSS/JS, ready for GitHub Pages.

## Files

```
index.html          the whole site
assets/style.css     styling (design tokens at the top of the file)
assets/script.js     nav toggle + profile photo change
assets/profile.svg   placeholder profile photo (initials avatar)
assets/resume.pdf    downloadable resume (linked from the nav + hero)
```

## Host it on GitHub Pages (free)

1. Create a new GitHub repository, e.g. `lakshman-portfolio`.
2. Upload all the files in this folder to the repository, keeping the
   `assets/` folder structure intact.
3. In the repo, go to **Settings → Pages**.
4. Under **Source**, choose **Deploy from a branch**, pick the `main` branch
   and `/ (root)` folder, then **Save**.
5. GitHub gives you a live URL after a minute or two, usually:
   `https://<your-username>.github.io/lakshman-portfolio/`

Every time you push a change to `main`, the live site updates automatically.

## Changing your profile photo

**On the live site (temporary preview):** click the small camera icon on the
photo in the hero section and choose an image. It updates instantly in your
browser — this is just a preview and resets if you reload the page or another
visitor opens the site.

**To make a new photo permanent for everyone:**
1. Add your photo file to the `assets/` folder — e.g. `assets/profile.jpg`.
2. In `index.html`, find this line near the top of the hero section:
   ```html
   <img src="assets/profile.svg" alt="Photo of Lakshman Sharma" id="profileImg">
   ```
   and change `assets/profile.svg` to `assets/profile.jpg`.
3. Commit and push — the live site updates with your real photo.

## Updating content

- **Resume file:** replace `assets/resume.pdf` with an updated export, keeping
  the same filename (or update the two `href="assets/resume.pdf"` links in
  `index.html` if you rename it).
- **Project links:** each project card in the "Projects" section currently
  links to your GitHub profile. Once you have individual repositories, update
  the `href` on each project's "Code" link to point directly at that repo.
- **Text content:** everything (headline, bio, skills, experience, projects,
  certifications) is plain text inside `index.html` — search for the section
  by its `id` (e.g. `id="about"`) and edit directly.

## Local preview

Just open `index.html` in a browser — no server or build tools required.
