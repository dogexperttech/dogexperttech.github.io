fetch('/assets/files.json')
  .then(response => response.json())
  .then(data => {
    const tbody = document.querySelector('#filesTable tbody');
    data.files.forEach(file => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${file.name}</td>
        <td><a href="${file.webContentLink}" target="_blank" download>Laadi alla</a></td>
        <td>${file.size}</td>
      `;

      tbody.appendChild(tr);
    });
  })
  .catch(err => {
    console.error("Viga failide laadimisel:", err);
  });
