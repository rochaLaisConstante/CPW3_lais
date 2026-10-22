const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

// Permite que o Node leia os dados enviados pelo formulário HTML
app.use(express.urlencoded({ extended: true }));

// Passo 4: Configuração da Sessão (Expira em 60 segundos)
app.use(session({
    secret: 'minha_chave_secreta',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 60000 //em milisegundos
    }
}));

// Rota inicial: Entrega a página de login de forma segura com path.join
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Recebe os dados do formulário de login
app.post('/login', (req, res) => {
    const { user, pass } = req.body; 

    if (user === 'admin' && pass === 'admin') { 
        req.session.user = user; 
        res.redirect('/dashboard'); 
    } else { 
        res.send('Login ou senha incorretos! <a href="/login">Tentar novamente</a>'); 
    } 
});

// Passo 2: Função que barra invasores
function verificaAcesso(req, res, next) {
    if (req.session.user) {
        next(); 
    } else {
        res.redirect('/login'); 
    }
}

// Rota protegida: Entrega o dashboard de forma segura com path.join
app.get('/dashboard', verificaAcesso, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dashboard.html'));
});

// Passo 3: Rota do botão de Logout
app.get('/logout', (req, res) => {
    req.session.destroy(); 
    res.redirect('/login'); 
});

// Inicia o servidor
app.listen(3000, () => {
    console.log('Servidor a correr! Aceda a: http://localhost:3000/login');
});