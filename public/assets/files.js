const formatBytes = (bytes) => {
  const value = Number(bytes);

  if (Number.isNaN(value)) return 'N/A';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];

  let index = 0;
  let size = value;

  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index++;
  }

  return `${size.toFixed(1)} ${units[index]}`;
};

const getFileType = (file) => {
  if (file.mimeType) {
    return file.mimeType
      .replace('application/', '')
      .replace('x-', '')
      .replace('-compressed', '')
      .replace('-iso9660-image', 'ISO')
      .toUpperCase();
  }

  const match = file.name.match(/\.([a-zA-Z0-9]+)$/);

  return match ? match[1].toUpperCase() : 'FILE';
};

const getFileIcon = (type) => {
  switch (type) {
    case 'ZIP':
      return '🗜️';

    case '7Z':
      return '📦';

    case 'ISO':
      return '💿';

    case 'EXE':
      return '⚙️';

    case 'APK':
      return '📱';

    case 'PS1':
      return '🖥️';

    default:
      return '📄';
  }
};

const isNewFile = (file) => {
  const keywords = [
    '2025',
    '2026',
    'new',
    'latest',
    'v2',
    '2023'
  ];

  return keywords.some(keyword =>
    file.name.toLowerCase().includes(keyword.toLowerCase())
  );
};

let allFiles = [];
let filteredFiles = [];

let currentPage = 1;
const filesPerPage = 10;

const tbody = document.querySelector('#filesTable tbody');

const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortSelect = document.getElementById('sortSelect');
const pagination = document.getElementById('pagination');

const renderFiles = () => {
  tbody.innerHTML = '';

  const start = (currentPage - 1) * filesPerPage;
  const end = start + filesPerPage;

  const paginated = filteredFiles.slice(start, end);

  if (!paginated.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="empty-row">
          No files found
        </td>
      </tr>
    `;

    return;
  }

  paginated.forEach(file => {
    const type = getFileType(file);

    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td class="file-name-cell">
        <div class="file-info">
          <span class="file-icon">
            ${getFileIcon(type)}
          </span>

          <div class="file-meta">
            <span class="file-name">
              ${file.name}
            </span>

            ${
              isNewFile(file)
                ? `<span class="new-badge">NEW</span>`
                : ''
            }
          </div>
        </div>
      </td>

      <td>
        <span class="file-type">
          ${type}
        </span>
      </td>

      <td>
        ${formatBytes(file.size)}
      </td>

      <td>
        <a
          href="${file.webContentLink}"
          target="_blank"
          rel="noopener noreferrer"
          class="download-link"
        >
          Download
        </a>
      </td>
    `;

    tbody.appendChild(tr);
  });

  renderPagination();
};

const renderPagination = () => {
  pagination.innerHTML = '';

  const totalPages = Math.ceil(
    filteredFiles.length / filesPerPage
  );

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');

    button.textContent = i;

    if (i === currentPage) {
      button.classList.add('active');
    }

    button.addEventListener('click', () => {
      currentPage = i;
      renderFiles();
    });

    pagination.appendChild(button);
  }
};

const applyFilters = () => {
  const search = searchInput.value.toLowerCase();

  const category = categoryFilter.value;

  const sort = sortSelect.value;

  filteredFiles = allFiles.filter(file => {
    const matchesSearch =
      file.name.toLowerCase().includes(search);

    const fileType = getFileType(file);

    const matchesCategory =
      category === 'ALL' ||
      fileType.includes(category);

    return matchesSearch && matchesCategory;
  });

  if (sort === 'size') {
    filteredFiles.sort(
      (a, b) => Number(b.size) - Number(a.size)
    );
  }

  if (sort === 'name') {
    filteredFiles.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  currentPage = 1;

  renderFiles();
};

fetch('/assets/files.json')
  .then(response => response.json())

  .then(data => {
    allFiles = data.files;

    filteredFiles = [...allFiles];

    renderFiles();

    searchInput.addEventListener(
      'input',
      applyFilters
    );

    categoryFilter.addEventListener(
      'change',
      applyFilters
    );

    sortSelect.addEventListener(
      'change',
      applyFilters
    );
  })

  .catch(err => {
    console.error(
      'Error loading files:',
      err
    );

    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="empty-row">
          Failed to load files
        </td>
      </tr>
    `;
  });