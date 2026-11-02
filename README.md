# linkqr

A small, fast QR code generator. Paste a link, pick a colour and size, download a PNG. No account, no backend, no tracking.

![License: PolyForm Noncommercial](https://img.shields.io/badge/license-PolyForm%20Noncommercial%201.0.0-blue)

## Features

- Generate a QR code from any `http` / `https` link
- One-tap **Paste** button for the link field
- Choose the QR colour and size (small, medium, large)
- Download as PNG, with a built-in white margin so it scans anywhere
- Light and dark mode: follows your system, with a manual toggle that is remembered
- Everything runs in your browser; your link is never sent to a server

## Run it locally

It is a static site, so there is nothing to install. Open `index.html` in your browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

An internet connection is needed on first load because the QR library comes from a CDN.

## Project structure

```
linkqr/
├── index.html      # page markup
├── css/style.css   # styles and light/dark theme variables
├── js/app.js       # theme switcher + QR generation
├── assets/placeholder-qr.png   # sample code shown before you generate one
├── LICENSE
└── README.md
```

## Deploy with GitHub Pages

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.

Your site will be live at `https://YOUR-USERNAME.github.io/linkqr/`.

## Customising

- **Colours / dark mode:** edit the variables at the top of `css/style.css`. Dark values live under `:root[data-theme="dark"]`.
- **Sample QR code:** replace `assets/placeholder-qr.png` with a QR code of your live site (keep the same file name).
- **Links:** search the project for `YOUR-USERNAME`, `your.email@example.com` and `YOUR NAME` and replace them with your own details.

## License

This project is licensed under the [PolyForm Noncommercial License 1.0.0](LICENSE). You are free to use, copy and modify it for **non-commercial purposes** (personal use, learning, research, hobby projects and so on). **Commercial use is not permitted** without separate permission.

Note: because of the non-commercial restriction, this is source-available rather than "open source" in the OSI sense.

For commercial licensing, get in touch: **your.email@example.com**

## Credits

- [qrcodejs](https://github.com/davidshimjs/qrcodejs) by davidshimjs (MIT License), loaded from cdnjs
- QR Code is a registered trademark of DENSO WAVE INCORPORATED

## Contact

Questions or feedback: **your.email@example.com**
