
const THEME_KEY = 'linkqr-theme';
const THEME_COLOURS = { light: '#f6f5f1', dark: '#121311' };
const root = document.documentElement;
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function getSavedTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch { return null; }
}

function saveTheme(theme) {
  try { localStorage.setItem(THEME_KEY, theme); } catch { /* storage unavailable */ }
}

function applyTheme(theme) {
  root.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOURS[theme]);
  document.getElementById('themeToggle')?.setAttribute(
    'aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
  );
}

applyTheme(getSavedTheme() || (prefersDark.matches ? 'dark' : 'light'));


prefersDark.addEventListener('change', event => {
  if (!getSavedTheme()) applyTheme(event.matches ? 'dark' : 'light');
});


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('qrForm');
  const urlInput = document.getElementById('url');
  const colourInput = document.getElementById('dark');
  const sizeInput = document.getElementById('size');
  const qrContainer = document.getElementById('qrcode');
  const downloadButton = document.getElementById('download');
  const hint = document.getElementById('hint');
  let currentUrl = '';

  applyTheme(root.dataset.theme); 
  document.getElementById('themeToggle').addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    saveTheme(next);
  });

  function makeQR() {
    const value = urlInput.value.trim();
    if (!value) { hint.textContent = 'Enter a URL first.'; return; }

    let parsed;
    try { parsed = new URL(value); } catch { hint.textContent = 'That URL does not look valid. Include https://'; return; }
    if (!['http:', 'https:'].includes(parsed.protocol)) { hint.textContent = 'Please use an http or https link.'; return; }
    if (typeof QRCode === 'undefined') { hint.textContent = 'QR library could not load. Check your internet connection and refresh.'; return; }

    const size = Number(sizeInput.value);
    qrContainer.innerHTML = '';
    qrContainer.classList.add('has-code');
    new QRCode(qrContainer, {
      text: value,
      width: size,
      height: size,
      colorDark: colourInput.value,
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H,
    });

    currentUrl = value;
    hint.textContent = '';
    downloadButton.disabled = false;
  }

  function downloadPNG() {
    const source = qrContainer.querySelector('canvas') || qrContainer.querySelector('img');
    if (!currentUrl || !source) return;

   
    const codeSize = source.naturalWidth || source.width;
    const margin = Math.round(codeSize * 0.1);
    const out = document.createElement('canvas');
    out.width = out.height = codeSize + margin * 2;
    const ctx = out.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, out.width, out.height);
    ctx.drawImage(source, margin, margin, codeSize, codeSize);

    const link = document.createElement('a');
    link.href = out.toDataURL('image/png');
    link.download = 'linkqr-code.png';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  async function pasteLink() {
    try {
      const text = (await navigator.clipboard.readText()).trim();
      if (!text) { hint.textContent = 'Your clipboard is empty.'; return; }
      urlInput.value = text;
      hint.textContent = '';
    } catch {
      hint.textContent = 'Paste is blocked here. Press Ctrl+V (⌘+V on Mac) instead.';
    }
    urlInput.focus();
  }

  form.addEventListener('submit', event => { event.preventDefault(); makeQR(); });
  downloadButton.addEventListener('click', downloadPNG);
  document.getElementById('paste').addEventListener('click', pasteLink);
  colourInput.addEventListener('change', () => { if (currentUrl) makeQR(); });
  sizeInput.addEventListener('change', () => { if (currentUrl) makeQR(); });
});
