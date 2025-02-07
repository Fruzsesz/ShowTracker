async function addShow() {
    const showInput = document.getElementById('showInput').value;
    if (!showInput) return alert('Please enter a show');

    const response = await fetch('/add-show', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ show: showInput })
    });

    const data = await response.json();
    document.getElementById('output').textContent = data.message;
}

async function viewShows() {
    const response = await fetch('/shows');
    const shows = await response.json();
    document.getElementById('output').textContent = shows.length ? `Logged Shows: ${shows.join(', ')}` : 'No shows Logged yet.';
}

async function randomShow() {
    const response = await fetch('/random-show');
    const data = await response.json();
    document.getElementById('output').textContent = data.randomShow ? `Random Pick: ${data.randomShow}` : 'No shows available';
}


async function removeShow() {
    const showInput = document.getElementById('showInput').value;
    if (!showInput) return alert('Please enter a show');

    const response = await fetch('/remove-show', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ show: showInput })
    });

    const data = await response.json();
    document.getElementById('output').textContent = data.message;
}
