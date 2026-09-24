const fs = require('fs/promises');
async function converterJson() {
    try{
        const textoJoson = await fs.readFile('dados.json.txt', 'utf-8');

        const jsonConvertido = JSON.parse(textoJoson);
        
        const jsonFormatado = jsonConvertido.map(linha =>{

            const [nome, nota, curso] = linha.split(',');
            return `
                nome : ${chave.nome}\n
                email : ${chave.email}
                telefone : ${chave.telefone}
           `
        });


        await fs.writeFile('jsonConvertido.txt', jsonFormatado);
        console.log("Sucesso: Arquivo 'jsonConvertido.txt' criado com estrutura de dados.");
    }catch (erro){
        console.error("Erro na conversão:", erro);
    }
}
converterTxtParaJson();