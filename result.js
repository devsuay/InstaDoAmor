document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');

    for (let i = 1; i <= 1000; i++) {
        const p = document.createElement('p');
        p.className = 'ap';
        p.textContent = `Eu te amo ${i}`;
        container.appendChild(p);
    }
});