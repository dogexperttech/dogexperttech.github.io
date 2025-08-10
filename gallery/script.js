// Dark mode toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
  document.body.classList.add('dark');
  themeToggleBtn.textContent = '☀️';
}

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    themeToggleBtn.textContent = '☀️';
  } else {
    localStorage.setItem('theme', 'light');
    themeToggleBtn.textContent = '🌙';
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('gallery-grid');

  if (!Array.isArray(images)) {
    console.error('❌ images massiiv puudub või vigane!');
    return;
  }

  images.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Wallpaper';
    img.loading = 'lazy';
    img.classList.add('gallery-thumb');
    img.addEventListener('click', () => openGallery(index));
    grid.appendChild(img);
  });

  function openGallery(index) {
    const src = images[index];
    let sizeText = '';

    fetch(src, { method: 'HEAD' })
      .then(res => {
        const size = res.headers.get('Content-Length');
        if (size) {
          const sizeMB = (parseInt(size) / (1024 * 1024)).toFixed(2);
          sizeText = `<div style='margin-top: 0.5em; font-size: 0.9em; color: gray;'>Failisuurus: ${sizeMB} MB</div>`;
        }
      })
      .catch(() => {
        sizeText = '';
      })
      .finally(() => {
        Swal.fire({
          title: src.split('/').pop(),
          html: `
            <img src="${src}" style="max-width: 100%; max-height: 70vh; border-radius: 12px;" />
            ${sizeText}
            <br>
            <a href="${src}" download class="download-btn">⬇️ Laadi alla</a>
            <div style="margin-top: 1em;">
              <button id="prev" class="nav-btn"${index === 0 ? ' style="display:none;"' : ''}>⬅️</button>
              <button id="next" class="nav-btn"${index === images.length - 1 ? ' style="display:none;"' : ''}>➡️</button>
            </div>
          `,
          showConfirmButton: false,
          showCloseButton: true,
          width: 'auto',
          customClass: {
            popup: 'swal-gallery-popup'
          },
          background: getComputedStyle(document.body).backgroundColor,
          didOpen: () => {
            document.getElementById('prev')?.addEventListener('click', () => openGallery(index - 1));
            document.getElementById('next')?.addEventListener('click', () => openGallery(index + 1));
          }
        });

        // Klaviatuuritugi – nooled vasak/parem
        const keyHandler = (e) => {
          if (Swal.isVisible()) {
            if (e.key === 'ArrowLeft' && index > 0) openGallery(index - 1);
            else if (e.key === 'ArrowRight' && index < images.length - 1) openGallery(index + 1);
          }
        };

        document.addEventListener('keydown', keyHandler, { once: true });
      });
  }
});
