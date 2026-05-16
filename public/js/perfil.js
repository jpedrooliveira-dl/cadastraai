function perfilUsuario() {

    const nomeLogado = localStorage.getItem('usuarioNome')
    const emailLogado = localStorage.getItem('usuarioEmail')
    const telefoneLogado = localStorage.getItem('usuarioTelefone');
    const tipoLogado = localStorage.getItem('usuarioTipo')

    if (!nomeLogado || !emailLogado) {
        alert("Ops! Você não está logado")
        window.location.href = 'login.html'
    } else {
        // Preenchendo os campos da sua página
        document.getElementById('nomeUsuario').innerText = nomeLogado;
        document.getElementById('emailUsuario').innerText = emailLogado;
        document.getElementById('telefoneUsuario').innerText = telefoneLogado;
        document.getElementById('tipoUsuario').innerText = tipoLogado;
    }

    const btnSair = document.getElementById('btnSair')

    btnSair.addEventListener('click', () => {
        window.location.href = 'login.html'
    })

}

perfilUsuario()
