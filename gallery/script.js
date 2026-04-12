document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('gallery-grid');
    if (typeof images === 'undefined' || !Array.isArray(images)) return;

    let currentIndex = 0;
    const itemsPerLoad = 20; // Mitu pilti laetakse korraga

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => img.classList.add('loaded');
                obs.unobserve(img);
            }
        });
    }, { rootMargin: '200px' });

    // Funktsioon, mis loob pildid gruppidena
    function loadMoreImages() {
        const nextBatch = images.slice(currentIndex, currentIndex + itemsPerLoad);
        
        nextBatch.forEach((src, i) => {
            const absoluteIndex = currentIndex + i;
            const img = document.createElement('img');
            img.dataset.src = src;
            // Tühi placeholder
            img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="; 
            img.alt = 'Wallpaper';
            img.classList.add('gallery-thumb');
            img.addEventListener('click', () => openGallery(absoluteIndex));
            grid.appendChild(img);
            observer.observe(img);
        });

        currentIndex += itemsPerLoad;
    }

    // Algne laadimine
    loadMoreImages();

    // Lõputu kerimine: kui jõuad lehe lõppu, laadi juurde
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
            if (currentIndex < images.length) {
                loadMoreImages();
            }
        }
    });

    function openGallery(index) {
        const src = images[index];
        
        Swal.fire({
            title: 'Loading...',
            background: '#121212',
            color: '#fff',
            didOpen: () => { Swal.showLoading(); }
        });

        const preload = new Image();
        preload.src = src;
        preload.onload = () => {
            // HEAD päring on aeglane, teeme seda ainult vajadusel
            Swal.fire({
                title: src.split('/').pop(),
                background: '#121212',
                color: '#fff',
                showCloseButton: true,
                showConfirmButton: false,
                width: 'auto',
                maxWidth: '800px',
                html: `
                    <div class="swal-img-container">
                        <img src="${src}" class="swal-compact-img" />
                    </div>
                    <a href="${src}" download class="download-btn">⬇️ Download Wallpaper</a>
                    <div class="nav-container">
                        <button id="prev" class="nav-btn">⬅️ Prev</button>
                        <button id="next" class="nav-btn">Next ➡️</button>
                    </div>
                `,
                didOpen: () => {
                    document.getElementById('prev')?.addEventListener('click', () => openGallery(index - 1 < 0 ? images.length - 1 : index - 1));
                    document.getElementById('next')?.addEventListener('click', () => openGallery(index + 1 >= images.length ? 0 : index + 1));
                }
            });
        };
    }
});