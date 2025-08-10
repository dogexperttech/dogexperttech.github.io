async function fetchFiles() {
  try {
    const response = await fetch('files.json');
    if (!response.ok) throw new Error('JSON laadimine ebaõnnestus');

    const data = await response.json();
    const tbody = document.getElementById('file-list');
    tbody.innerHTML = '';

    data.files.forEach(file => {
      if (!file.download_url) return; // ignoreeri kui pole linki

      const sizeMB = (parseInt(file.size, 10) / (1024 * 1024)).toFixed(2);
      const type = file.mimeType;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${file.name}</td>
        <td>${type}</td>
        <td>${sizeMB} MB</td>
        <td><a href="${file.download_url}" target="_blank" rel="noopener noreferrer">Lae alla</a></td>
      `;
      tbody.appendChild(tr);
    });

  } catch (error) {
    console.error(error);
    document.body.innerHTML = '<p>Failide laadimine ebaõnnestus.</p>';
  }
}

fetchFiles();


// Dark mode toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
  document.body.classList.add('dark');
  themeToggleBtn.textContent = '☀️'; // Päike = tume aktiivne
} else {
  themeToggleBtn.textContent = '🌙'; // Kuu = hele aktiivne
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
  fetchFiles();
});

