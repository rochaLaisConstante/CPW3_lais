//importa o express
const express = require('express');

//cria a aplicação
const app = express();

app.use ((req, res, next) => {
    console.log("Acesso", req.method, req.url);
    next();
});

//rota GET principal
app.get("/", (req, res, next) =>{
    res.send(`
        <h1>Menu do servidor</h1>
        <ul>
            <li><a href="/inicio">Ir para Inicio</a></li>
            <li><a href="/status">Ir para status</a></li>
            <li><a href="/aluno/Lais">Ir para aluno</a></li>
            <li><a href="/soma">Ir para soma</a></li>
            <li><a href="/subtracao">Ir para subtração</a></li>
            <li><a href="/multiplicacao">Ir para multiplicação</a></li>
        </ul>
        `);
});

//outra rota exemplo
app.get("/inicio", (req, res) =>{
    res.send("<h1>Bem vindo!");
});




app.get("/aluno/:nome", (req, res) =>{
    const nome = req.params.nome;
    res.send(`Olá, ${nome}!`);
});

app.get("/soma/:a/:b", (req, res) =>{
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    const resultado = a + b;

    res.send(`Resultado : ${resultado}`);
});

app.get("/status", (req, res) => {
    res.json({
        servidor: "online",
        disciplina : "CPW3",
        professora : "Milena",
        hora: new Date().toLocaleString()
    });
});

//porta do servidor
const PORTA = 3000;

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});

