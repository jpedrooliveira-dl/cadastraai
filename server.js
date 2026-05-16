require('dotenv').config()
const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

db.connect((err) => {
    if (err) {
        console.log(`Erro ao conectar ao servidor ${err.message}`)
        return
    }
    console.log(`Conectado ao banco de dados mysql Xampp ✅`)
})

app.post('/cadastrar', (req,res) => {
    console.log("CHEGOU NO BACKEND! Tentando cadastrar:", req.body.email)
    const { nome, email, telefone, senha } = req.body

    const telefoneLimpo = telefone.replace(/\D/g, '')
    

    // Trava de segurança: Se o MySQL estiver desligado, avisa o navegador na hora em vez de travar
    if (db.state === 'disconnected') {
        console.log("Erro: O MySQL do XAMPP está desligado!")
        return res.status(500).json({ error: "Banco de dados offline. Ligue o MySQL no XAMPP."})
    }

    let tipoUsuario = 'comum';
    if (email.trim() === 'admin@sistema.com') {
        tipoUsuario = 'admin';
    }

    const sql = "INSERT INTO usuarios (nome, email, telefone, senha, tipo) VALUES (?, ?, ?, ?, ?)"

    console.log("Iniciando comando no banco de dados...")
    db.query(sql, [nome, email, telefoneLimpo, senha, tipoUsuario], (err, result) => {
        console.log("Banco de dados respondeu!")
        if (err) {
            console.error("Erro no MySQL:", err)

            if (err.code === 'ER_DUP_ENTRY') {

                const campo = err.sqlMessage.includes('email') ? 'E-mail' : 'Telefone'
                return res.status(400).json({ error: `Este ${campo} já está cadastrado!`})
            }
            return res.status(500).json({ error: "Erro interno no servidor"})
        }

        console.log("Usuário salvo, enviando resposta de sucesso pro navegador...")
        res.status(200).json({ message: `Usuário ${tipoUsuario} criado com sucesso!`})
    })
})


// get usuarios

app.get('/usuarios', (req, res) => {
    const sql = 'SELECT id, nome, email, telefone, tipo FROM usuarios'

    db.query(sql, (err, result) => {
        if (err) {
        console.error("Erro busca usuários", err)
        return res.status(500).json({ error: "Erro interno no servidor."})
        }
        res.status(200).json(result)
    })
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
    // console.log('——————————————————————————————————————————————')
})


// LOGIN

app.post('/login', (req, res) => {
    const { email, senha } = req.body

    const sql = "SELECT * FROM usuarios  WHERE email = ? AND senha = ?"

    db.query(sql, [email, senha], (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: "Erro interno no servidor "})
        }

        if (result.length > 0) {
            const usuario = result[0]
            console.log('------------------------------------------------------------------------')
            console.log(`Login realizado: ${usuario.id} ${usuario.nome} ${usuario.email} ${usuario.tipo}`)
            console.log('------------------------------------------------------------------------')

            res.status(200).json({
                message: "Login efetuado com sucesso!",
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                telefone: usuario.telefone,
                tipo: usuario.tipo
            })
        } else {
            res.status(401).json({ error: "E-mail ou senha incorretos!" })
        }
    })
})

// Delete

app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params

    const query = ("DELETE FROM  usuarios WHERE ID = ?")

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error("Erro ao deletar:", err)
            return res.status(500).json({erro: "Erro ao excluir usuário"})
        }
        res.status(200).json({ message: "Usuário removido com sucesso!"})
    })
})