const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORTA = 3000;

app.use(express.json());

const CAMINHO_JOGOS = path.join(__dirname, 'dados', 'jogos.json');
const CAMINHO_HISTORICO = path.join(__dirname, 'dados', 'historico.txt');

async function lerJogos() {
    try {
        const data = await fs.readFile(CAMINHO_JOGOS, 'utf-8');
        return JSON.parse(data);
    } catch(error){
        if(error.code === 'ENOENT'){
            return[];
        }
        throw error;
    }
}

async function salvarJogos(jogos) {
    await fs.writeFile(CAMINHO_JOGOS, JSON.stringify(jogos, null, 2));
}

async function registarHistorico(mensagem) {
    const linha = `${new Date().toLocaleString('pt-BR')} - ${mensagem}\n`;
    await fs.appendFile(CAMINHO_HISTORICO, linha);
}

app.get('/', (req, res) =>{
    res.send('API funcionando com sucesso!');
});

app.get('/jogos', async(req, res) =>{
    try{
        const jogos = await lerJogos();
        res.status(200).json(jogos);
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno ao ler os jogos.'});
    }
});

app.get('/jogos/melhores', async (req, res) => {
    try{
        const jogos = await lerJogos();
        const melhores = jogos.filter(j => j.nota >= 8);
        res.status(200).json(melhores);
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno ao filtrar os jogos.'});
    }
});

app.get('/jogos/:id', async (req, res) => {
    try {
        const jogos = await lerJogos();
        const id = Number(req.params.id);
        const jogo = jogos.find(j => j.id === id);

        if (!jogo) {
            return res.status(404).json({ erro: 'Jogo não encontrado!' });
        }

        res.status(200).json(jogo);
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno ao buscar o jogo' });
    }
});

app.post('/jogos', async (req, res) => {
    try {
        const { titulo, genero, ano, nota } = req.body;

        if (!titulo || !genero) {
            return res.status(400).json({ erro: 'Os campos titulo e genero são obrigatórios.' });
        }

        const jogos = await lerJogos();
        const novoId = jogos.length > 0 ? Math.max(...jogos.map(j => j.id)) + 1 : 1;

        const novoJogo = {
            id: novoId,
            titulo,
            genero,
            ano: Number(ano) || 2026,
            nota: Number(nota) || 0
        };

        jogos.push(novoJogo);
        await salvarJogos(jogos);
        await registarHistorico(`Jogo cadastrado: ${titulo}`);

        res.status(201).json(novoJogo);
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno ao cadastrar o jogo.' });
    }
});

app.put('/jogos/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { titulo, genero, ano, nota } = req.body;
        const jogos = await lerJogos();
        const jogo = jogos.find(j => j.id === id);

        if (!jogo) {
            return res.status(404).json({ erro: 'Jogo não encontrado para atualização.' });
        }

        if (titulo !== undefined) jogo.titulo = titulo;
        if (genero !== undefined) jogo.genero = genero;
        if (ano !== undefined) jogo.ano = Number(ano);
        if (nota !== undefined) jogo.nota = Number(nota);

        await salvarJogos(jogos);
        await registarHistorico(`Jogo atualizado: ${jogo.titulo}`);

        res.status(200).json(jogo);
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno ao atualizar o jogo.' });
    }
});

app.delete('/jogos/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const jogos = await lerJogos();

        const indice = jogos.findIndex(j => j.id === id);

        if (indice === -1) {
            return res.status(404).json({ erro: 'Jogo não encontrado para a exclusão.' });
        }

        const [jogoRemovido] = jogos.splice(indice, 1);
        await salvarJogos(jogos);
        await registarHistorico(`Jogo removido: ${jogoRemovido.titulo}`);

        res.status(200).json({ mensagem: 'Jogo removido com sucesso.', jogo: jogoRemovido });
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno ao remover o jogo' });
    }
});

app.get('/historico', async (req, res) =>{
    try{
        const conteudo = await fs.readFile(CAMINHO_HISTORICO, 'utf-8');
        res.status(200).send(`<pre>${conteudo}</pre>`);
    } catch (error){
        if(error.code === 'ENOENT') {
            return res.status(200).send('Nenhum histórico registrado até o momento.')
        }
        res.status(500).json({ erro: 'Erro ao ler o histórico.'});
    }
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});