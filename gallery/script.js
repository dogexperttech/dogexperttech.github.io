// 🌙 Dark mode toggle
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

// 🖼️ Gallery logic
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('gallery-grid');

  // Ensure `images` array exists globally
  if (!Array.isArray(images)) {
    console.error('❌ images array is missing or invalid!');
    return;
  }

  // Create thumbnails
  images.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Wallpaper';
    img.loading = 'lazy';
    img.classList.add('gallery-thumb');
    img.addEventListener('click', () => openGallery(index));
    grid.appendChild(img);
  });

  // 🔍 Open full-size image in SweetAlert2 popup
  function openGallery(index) {
    const src = images[index];
    let sizeText = '';

    // 🌀 Show loading popup while preloading 
  swal.fire({ 
  title: 'Louding a picture...', 
  text: 'Please wait, the picture is on its way!', 
  allowOutsideClick: false, 
  background: getComputedStyle(document.body).backgroundColor, 
  didOpen: () => { 
  Swal.showLoading(); 
  } 
  });

    // ✅ Preload image before showing
    const preload = new Image();
    preload.src = src;

    preload.onload = () => {
      // Get image file size
      fetch(src, { method: 'HEAD' })
        .then(res => {
          const size = res.headers.get('Content-Length');
          if (size) {
            const sizeMB = (parseInt(size) / (1024 * 1024)).toFixed(2);
            sizeText = `<div style='margin-top:0.5em;font-size:0.9em;color:gray;'>Failisuurus: ${sizeMB} MB</div>`;
          }
        })
        .catch(() => {
          sizeText = '';
        })
        .finally(() => {
          Swal.close(); // close loading spinner

          // ✅ Show full-size image
          Swal.fire({
            title: src.split('/').pop(),
            html: `
              <img src="${src}" style="max-width: 100%; max-height: 70vh; border-radius: 12px; display:block; margin:auto;" />
              ${sizeText}
              <br>
              <a href="${src}" download class="download-btn">⬇️ Laadi alla</a>

<style>
.download-btn {
    display: inline-block;
    padding: 12px 24px;
    background: linear-gradient(135deg, #4f46e5, #6366f1); /* ilus gradient */
    color: #fff;
    font-weight: 600;
    font-size: 16px;
    text-decoration: none;
    border-radius: 12px; /* ümarad nurgad */
    box-shadow: 0 4px 12px rgba(0,0,0,0.15); /* kerge vari */
    transition: all 0.3s ease;
}

.download-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.25);
    background: linear-gradient(135deg, #6366f1, #4f46e5);
}

.download-btn:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
</style>

              <div style="margin-top: 1em;">
                <button id="prev" class="nav-btn"${index === 0 ? ' style="display:none;"' : ''}>⬅️</button>
                <button id="next" class="nav-btn"${index === images.length - 1 ? ' style="display:none;"' : ''}>➡️</button>
              </div>
            `,
            showConfirmButton: true,
            showCloseButton: true,
            width: 'auto',
            background: getComputedStyle(document.body).backgroundColor || '#121212',
            customClass: {
              popup: 'swal-gallery-popup'
            },
            didOpen: () => {
              document.getElementById('prev')?.addEventListener('click', () => openGallery(index - 1));
              document.getElementById('next')?.addEventListener('click', () => openGallery(index + 1));
            }
          });

          // ⌨️ Keyboard navigation (once per popup)
          const keyHandler = (e) => {
            if (!Swal.isVisible()) return;
            if (e.key === 'ArrowLeft' && index > 0) openGallery(index - 1);
            else if (e.key === 'ArrowRight' && index < images.length - 1) openGallery(index + 1);
            else if (e.key === 'Escape') Swal.close();
          };
          document.addEventListener('keydown', keyHandler, { once: true });
        });
    };

    // ❌ Error handling if image fails to load
    preload.onerror = () => {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'The image did not load!',
        text: 'Image download failed.',
        background: getComputedStyle(document.body).backgroundColor || '#121212'
      });
    };
  }
});