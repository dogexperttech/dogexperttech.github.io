async function fetchSoftwareList() {
  try {
    const response = await fetch('software.json');
    if (!response.ok) throw new Error('Ei saanud JSON-i laadida');
    const data = await response.json();

    const list = document.getElementById('software-list');
    data.malwarewatch.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.name}</a> — ${item.size}, ${item.date}`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error('Tõrge:', err);
    document.getElementById('software-list').textContent = 'Failide laadimisel tekkis viga.';
  }
}

document.addEventListener('DOMContentLoaded', fetchSoftwareList);
