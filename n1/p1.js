const express = require('express');
const app = express();

app.use(express.json())
const musicas = [
  { id: 1, titulo: "Bohemian Raphsody", artista: "Queen", nota: 10 },
  { id: 2, titulo: "Imagine", artista: "Jhon Lenon", nota: 8.5 },
  { id: 3, titulo: "Hotel California", artista: "Eagles", nota: 9.2 },
  { id: 4, titulo: "Backstage", artista: "Matuê", nota: 7 }
];

let proximoId = 5;

app.get("/musicas", (req, res) => {
    res.status(200).json(musicas);
});

app.get("/musicas/:id", (req, res) => {
  const musica = musicas.find(m => m.id == req.params.id);
  musica ? res.json(musica) : res.status(404).json({ erro: "Música não encontrada" });
});

app.get("/artista/:nome", (req, res) => {
  const { nome } = req.params;
  const filtradas = musicas.filter(m => m.artista.toLowerCase() === nome.toLowerCase());
  res.json(filtradas);
});

app.get("/top", (req, res) => {
  const top = musicas.filter(m => m.nota >= 9);
  res.json(top);
});

app.post('/musicas', (req, res) => {
    const { titulo, artista, nota} = req.body;

    if(!titulo || !artista || nota === undefined || nota === null) {
        return res.status(400).json({ "erro": "Todos os campos são obrigatórios"});
    }
    const novaMusica = {
        id: proximoId++,
        titulo,
        artista,
        nota: Number(nota)
    };

    musicas.push(novaMusica);
    res.status(201).json(novaMusica);
});

app.delete('/musicas/:id', (req, res) => {
    const id = Number(req.params.id);
    const indice = musicas.findIndex(m => m.id === id);

    if(indice === -1) {
        return res.status(404).json({ "erro": "Música não encontrada"});
    };

    const musicaRemovida = musicas.splice(indice, 1)[0];
    res.status(200).json({
        mensagem: "Música removida com sucesso",
        musica: musicaRemovida
    });    
});


app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});