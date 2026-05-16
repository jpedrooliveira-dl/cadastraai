async function carregarUsuario () {
    const tipo = localStorage.getItem('usuarioTipo')

    if (tipo !== 'admin') {
        alert ('Acesso restrito! Você não tem permissão para ver esta lista')
        window.location.href = 'perfil.html'
        return
    }

    try {
        const response = await fetch('http://localhost:3000/usuarios')
        const usuarios = await response.json()

        const tabela = document.getElementById("tabelaCorpo")
        tabela.innerHTML = ''

        usuarios.forEach(user => {
            const linha = `
            <tr>
                <td>${user.id}</td>
                <td>${user.nome}</td>
                <td>${user.email}</td>
                <td>${user.telefone}</td>
                <td><span class="badge ${user.tipo}">${user.tipo}</span></td>

                <td>
                    <button class="btn-excluir"  onclick="confirmarExclusao(${user.id}, '${user.nome}')">
                        Excluir
                    </button>
                </td>
            </tr>
            `
            tabela.innerHTML += linha
        })
        
    } catch (error) {
            console.error("Erro ao carregar a tabela:", error)
        }
}

async function confirmarExclusao(id, nome) {
    if (confirm(`Deseja realmente excluir o usuário ${nome}?`)) {
        try {
            const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
                method: 'DELETE'
            })

            if (response.ok) {
                alert("Usuário removido com sucesso!")
                carregarUsuario()
            } else {
                alert("Erro ao remover usuário")
            }
        } catch (error) {
            console.error("Erro na exclusão:", error)
        }
    }
}

document.getElementById('bntSair').addEventListener('click', () => {
    localStorage.clear()
    window.location.href = 'login.html'
})


carregarUsuario()