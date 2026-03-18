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

<script type="text/javascript">
    lightGallery(document.getElementById('lightgallery'), {
        speed: 500,
        plugins: [lgThumbnail, lgZoom],
        // Valikuline: näitab pisipilte kohe
        thumbnail: true, 
    });
</script>