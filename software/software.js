async function fetchSoftwareList() {
  try {
    const response = await fetch('software.json');
    if (!response.ok) throw new Error('Ei saanud JSON-i laadida');
    const data = await response.json();

    const tbody = document.getElementById('software-body');
    tbody.innerHTML = ""; // tühjenda enne

    data.malwarewatch.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.size}</td>
        <td>${item.date}</td>
        <td><a href="${item.url}" target="_blank" rel="noopener noreferrer">Laadi alla</a></td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error('Tõrge:', err);
    const tbody = document.getElementById('software-body');
    tbody.innerHTML = `<tr><td colspan="4">❌ Failide laadimisel tekkis viga.</td></tr>`;
  }
}

document.addEventListener('DOMContentLoaded', fetchSoftwareList);
