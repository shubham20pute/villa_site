Ratan Villas — Local clone (prototype)

What this contains
- `templates/index.html` — a local HTML clone that uses public images from the original site for visual parity.
- `static/css/style.css` — minimal styles.
- `static/js/main.js` — small JS initializer for carousel.

Notes
- Images are hotlinked from https://www.ratanvillas.in so the page will look similar offline only if you have internet access. For an offline copy, download images into `static/img/` and update paths.
- This is a visual prototype, not a functional backend clone. Booking links and blog links still point to the original site.

How to view
1. From project root run a simple HTTP server (recommended) so that `/static` paths resolve correctly.

On Windows PowerShell you can run:

```powershell
# from c:\ClientProjects\gaurav\villa_site
python -m http.server 8000; Start-Process "http://localhost:8000/templates/index.html"
```

Or just open `templates/index.html` in your browser (some browsers block local `/static` absolute paths).

Next steps
- Replace hotlinked images with local copies in `static/img/`.
- Add more pages (about, rooms, gallery) and wire navigation.
- Improve accessibility and SEO meta tags.
