const fs = require('node:fs/promisses');

async function lerMeuArquivo() {
    try{
        const data = await fs.readFile('texto2.txt', 'utf8');
        console.log("Conteúdo do arquivo:", data);
    }catch (erro){
        console.log("Ops, eu um erro ao ler o arquivo:", erro.message);
    }
}
lerMeuArquivo();