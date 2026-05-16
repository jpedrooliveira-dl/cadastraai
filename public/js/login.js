document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const messageDiv = document.getElementById('message')

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha: password })
        })

        const result = await response.json()


        if (response.ok) {
            localStorage.setItem('usuarioNome', result.nome)
            localStorage.setItem('usuarioEmail', result.email)
            localStorage.setItem('usuarioTelefone', result.telefone);
            localStorage.setItem('usuarioTipo', result.tipo)


            if (result.tipo === 'admin') {
                window.location.href = 'usuarios.html'
            } else {
                window.location.href = 'perfil.html'
            }
        } else {
            exibirMensagem(result.error, 'error') 
        }
    } catch (error) {
        exibirMensagem('Erro ao conectar ao servidor.', 'error')
    }
})

function exibirMensagem(texto, tipo) {
    const msg = document.getElementById('message')
    msg.innerText = texto
    msg.className = tipo
    msg.classList.remove('hidden')
}