document.getElementById("cadastroForm").addEventListener('submit', async (event) => {
    event.preventDefault()

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefoneRaw = document.getElementById('telefone').value;
    const telefone = telefoneRaw.replace(/\D/g, '');
    const senha = document.getElementById('senha').value;

    try {
        console.log("Enviando dados para o servidor na porta 3000...");
        const response = await fetch('http://localhost:3000/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email, telefone, senha })
        })

        console.log("Resposta recebida! Status:", response.status);

        const result = await response.json()
        console.log("Dados do servidor convertidos:", result);

        if (response.ok) {
            exibirMensagem(result.message, 'success')
            document.getElementById('cadastroForm').reset()
        } else {
            exibirMensagem(result.error || 'Erro ao cadastrar o usuário.', 'error')
        }
    } catch (error) {
        console.error("Erro detectado pelo JavaScript:", error);
        exibirMensagem('Erro: Não foi possível conectar ao servidor', 'error')
    }
})

function exibirMensagem(texto, tipo) {
    const msg = document.getElementById('mensagem');

    msg.innerHTML = texto;
    
    // Limpa classes antigas e adiciona a nova
    msg.classList.remove('success', 'error', 'hidden'); 
    msg.classList.add(tipo);
    
    setTimeout(() => {
        msg.classList.add('hidden');
    }, 4000);
}

const inputTelefone = document.getElementById('telefone');

inputTelefone.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove letras
    
    // Aplica a máscara (XX) XXXXX-XXXX
    if (value.length > 0) {
        value = '(' + value;
    }
    if (value.length > 3) {
        value = value.slice(0, 3) + ') ' + value.slice(3);
    }
    if (value.length > 10) {
        value = value.slice(0, 10) + '-' + value.slice(10, 14);
    }
    
    e.target.value = value;
});
