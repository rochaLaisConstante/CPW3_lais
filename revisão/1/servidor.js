const express = require('express');
const app = express();

//1.Define uma rota (endpoint)
app.get('/', (req, res) =>{
    req.send('Hello World! Este é meu primeiro servidor backend funcionando');
});

//2.Liga o servidor para funcionar na porta 300
app.listen(3000,() =>{
    console.log('Servidor rodando em http://localhost:3000');
});