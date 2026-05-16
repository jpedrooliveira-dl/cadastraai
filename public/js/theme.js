// Lógica de alternância do Modo Escuro / Claro
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Verifica se o usuário já havia escolhido um tema anteriormente
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light-mode') {
    body.classList.add('light-mode');
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        
        // Salva a preferência e altera o ícone
        localStorage.setItem('theme', isLight ? 'light-mode' : '');
        themeToggle.innerHTML = isLight ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
    });
}
