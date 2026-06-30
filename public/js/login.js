document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha: password })
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.setItem('usuarioNome', result.nome);
            localStorage.setItem('usuarioEmail', result.email);
            localStorage.setItem('usuarioTelefone', result.telefone);
            localStorage.setItem('usuarioTipo', result.tipo);

            if (result.tipo === 'admin') {
                window.location.href = 'usuarios.html';
            } else {
                window.location.href = 'perfil.html';
            }
        } else {
            exibirMensagem(result.error || 'Erro ao fazer login.', 'error'); 
        }
    } catch (error) {
        exibirMensagem('Erro ao conectar ao servidor.', 'error');
    }
});

function exibirMensagem(texto, tipo) {
    const msg = document.getElementById('message');
    msg.innerText = texto;
    msg.className = tipo; 
    msg.classList.remove('hidden');
}

// ── Ocultar / Mostrar Senha ──
const toggleSenha = document.getElementById('toggleSenha');
const senhaInput = document.getElementById('password');

toggleSenha.addEventListener('click', function () {
    const isPassword = senhaInput.getAttribute('type') === 'password';
    senhaInput.setAttribute('type', isPassword ? 'text' : 'password');
    
    // Altera as classes do FontAwesome de forma limpa
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

// ── Alternador de Tema (Light / Dark) ──
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const icon = themeToggle.querySelector('i');
    
    if (document.body.classList.contains('light-mode')) {
        icon.className = 'fa-solid fa-sun';
    } else {
        icon.className = 'fa-solid fa-moon';
    }
});