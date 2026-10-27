const express = require('express');
const session = require('express-session');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'minha_chave_secreta',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // 60 segundos em milissegundos
}));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'seu-email@gmail.com',
        pass: 'sua-palavra-passe-de-aplicacao'
    }
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.post('/login', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send('Email é obrigatório.');
    }

    const codigoGerado = Math.floor(1000 + Math.random() * 9000).toString();

    req.session.emailUsuario = email;
    req.session.codigoVerificacao = codigoGerado;

    const mailOptions = {
        from: 'seu-email@gmail.com',
        to: email,
        subject: 'Código de Confirmação de Login',
        text: `O seu código de verificação de 4 dígitos é: ${codigoGerado}`
    };

    try {
        await transporter.sendMail(mailOptions);

        res.redirect('/confirmar.html');
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        res.status(500).send('Erro ao enviar o email de verificação.');
    }
});

app.use(express.static(path.join(__dirname, '../frontend')));

app.post('/validar-codigo', (req, res) => {
    const { codigoDigitado } = req.body;

    if (codigoDigitado && codigoDigitado === req.session.codigoVerificacao) {

        res.redirect('/dashboard.html');
    } else {

        req.session.destroy(() => {
            res.redirect('/login');
        });
    }
});

app.listen(3000, () => {
    console.log('Servidor a correr em http://localhost:3000/login');
});