1. O Node.js é um ambiente de execução para JavaScript construído sobre o motor V8 do Google Chrome, projetado para rodar no lado do servidor. Sua principal função em uma aplicação web é fornecer um ambiente de desenvolvimento backend capaz de lidar com requisições HTTP, gerenciar rotas de acesso, interagir diretamente com o sistema de arquivos e conectar a aplicação a bancos de dados.

2. A diferença fundamental reside no ambiente e nas permissões de acesso. No navegador, o JavaScript roda em um ambiente restrito (*sandbox*) focado em manipular a interface visual e os elementos da árvore DOM. Já no Node.js, o código é executado diretamente no sistema operacional do servidor, o que concede acesso ao sistema de arquivos do disco, controle sobre portas de rede e permissão para manipular recursos do servidor sem as limitações do navegador.

3. O NPM (Node Package Manager) é o gerenciador de pacotes padrão que acompanha o ecossistema do Node.js. Ele funciona como uma imensa plataforma e repositório centralizado onde desenvolvedores podem baixar, compartilhar e atualizar bibliotecas e dependências de código aberto necessárias para a construção de seus projetos.

4. O package.json atua como o manifesto e o cartão de visitas de um projeto Node.js. Sua função é registrar todas as metainformações vitais da aplicação — como nome, versão e scripts de inicialização —, além de manter a lista exata de todas as dependências e pacotes instalados com suas respectivas versões.

5. A pasta node_modules armazena os códigos-fonte físicos de todos os pacotes instalados, o que a torna extremamente volumosa e pesada. Como o arquivo package.json já contém a lista de todas as dependências do projeto, ela não precisa ser versionada no Git; qualquer pessoa que baixar o repositório pode recriar a pasta executando simplesmente o comando npm install no terminal.

---

11. Uma rota, ou endpoint, é um endereço de rede formado pela combinação de uma URL e um método HTTP específico. Ela serve como um ponto de entrada no servidor para direcionar as requisições enviadas pelos clientes para as funções corretas de processamento.

12. O objeto req (Request) representa a requisição HTTP recebida pelo servidor. Sua função é carregar todas as informações enviadas pelo cliente, tais como parâmetros dinâmicos passados na URL, dados estruturados do corpo da requisição, cabeçalhos de segurança e dados de navegação.

13. O objeto res (Response) representa a resposta que o servidor enviará de volta ao cliente. Ele é responsável por definir o código de status HTTP resultante do processamento e entregar os dados finais no formato desejado, como JSON ou texto.

14. O método res.send() é genérico e flexível, sendo capaz de enviar respostas em diversos formatos (como texto simples, HTML ou estruturas de dados) e inferir o tipo de conteúdo automaticamente. O res.json(), por sua vez, é especializado em APIs RESTful: ele converte explicitamente objetos ou arrays do JavaScript para texto formatado em JSON e configura automaticamente o cabeçalho HTTP Content-Type: application/json.

15. Trata-se de um modelo arquitetural para a construção de serviços web onde os recursos da aplicação são manipulados através dos verbos padrão do protocolo HTTP (GET, POST, PUT, DELETE). Esse padrão preza pela comunicação orientada a recursos, utilizando URLs bem estruturadas e trocando dados em formatos padronizados, como o JSON, sem armazenar estado de conexão entre chamadas.

16. 
GET: Utilizado para buscar, consultar e ler informações no servidor sem alterar o estado dos dados.
POST: Utilizado para enviar novos dados ao servidor com o objetivo de criar um novo registro.
PUT: Utilizado para atualizar ou substituir as informações de um registro que já existe no servidor.
DELETE: Utilizado para solicitar a remoção ou exclusão de um registro específico no servidor.

17. A diferença reside na forma como as informações chegam até a rota. O req.params captura valores dinâmicos que foram passados na própria estrutura da URL (como o ID em /jogos/:id). Já o req.body contém o objeto estruturado que foi enviado no corpo da requisição HTTP, sendo utilizado principalmente em operações de criação e atualização como POST e PUT.

18. Trata-se de um middleware embutido no Express cuja função é interceptar as requisições que chegam com corpo formatado em JSON, realizar a conversão desse texto para um objeto JavaScript e disponibilizá-lo para leitura dentro do objeto req.body nas rotas.

---

43. O método POST é desenhado para a criação de um novo recurso, onde o servidor fica responsável por gerar uma nova identidade para aquele dado. O PUT, por sua vez, é voltado para a atualização de um recurso existente, exigindo que o identificador específico seja fornecido para localizar e alterar o registro correto.

---

50. O método DELETE não necessita de um corpo de mensagem porque todas as informações precisas para localizar o item a ser removido já são fornecidas na própria URL por meio do parâmetro de rota (req.params.id).

---

56. 
find(): Percorre o array e retorna o **primeiro objeto completo** que satisfaz a condição estipulada.
findIndex(): Percorre o array e retorna a posição numérica (índice) do primeiro elemento localizado.
filter(): Percorre todo o array e retorna um novo array contendo todos os elementos que atendem ao critério de busca.

57. push(): Adiciona um ou mais novos elementos ao **final** de uma estrutura de array.
splice(): Altera o conteúdo do array original permitindo **remover ou substituir** elementos em um índice numérico determinado.

---

58. JSON (JavaScript Object Notation) é um formato leve e baseado em texto simples para estruturação e intercâmbio de dados. Ele é amplamente utilizado por ser fácil de ler e escrever por humanos e simples de ser processado por diferentes linguagens de programação.

59. O JSON.parse() pega uma string de texto devidamente formatada em JSON e a converte em uma estrutura viva de dados (como um objeto ou array) manipulável na memória JavaScript.

60. O JSON.stringify() faz o caminho inverso: pega um objeto ou array JavaScript em memória e o converte em uma string de texto formatada em JSON, pronta para ser salva em arquivo ou transmitida pela rede.

61. Como os arquivos salvos em disco são gravados fisicamente em formato de caracteres de texto bruto, o Node.js lê o arquivo como uma string. É necessário aplicar o JSON.parse() sobre essa string para reconstruir a estrutura de objeto na memória RAM.

62. O parâmetro null é passado quando não se deseja aplicar nenhuma função de filtragem às propriedades do objeto. O número 2 especifica que o arquivo gravado em disco deve ser formatado com indentação de 2 espaços (pretty print), tornando o arquivo JSON limpo e legível para humanas.

63. 
1. Os nomes de todas as propriedades e chaves de um objeto devem obrigatoriamente estar entre aspas duplas "".
2. Os valores do tipo texto (strings) precisam obrigatoriamente ser envolvidos por aspas duplas "".
3. Não é permitido incluir vírgula ao final do último item de um objeto ou array (trailing comma).

64. Um objeto JavaScript em memória é uma estrutura ativa alocada na RAM que suporta execução de funções, métodos e tipos dinâmico. O texto .json gravado no disco é uma sequência estática de caracteres brutos que serve estritamente para armazenamento ou transporte de dados.

---

72. Os dados permanecem porque deixaram de existir apenas na memória RAM temporária do Node.js e passaram a ser gravados fisicamente na unidade de armazenamento do computador (SSD/HD) dentro do arquivo .json.

---

83. writeFile: Sobrescreve o arquivo, apagando todo o conteúdo existente e gravando o novo texto.
appendFile: Anexa o novo texto ao final do arquivo existente sem apagar ou modificar o conteúdo prévio.

84. Todo o conteúdo que estava salvo anteriormente no arquivo é completamente descartado e substituído pelo novo dado enviado.

85. A finalidade do readFile é realizar a leitura assíncrona do conteúdo gravado em um arquivo no disco.

---

86. A função do fs.unlink() é deletar de forma definitiva um arquivo do sistema de arquivos do sistema operacional.

87. O arquivo especificado é removido imediatamente do disco sem passar pela Lixeira do sistema operacional, sendo uma exclusão irreversível.

88. 
Criar / Escrever: fs.writeFile()
Ler: fs.readFile()
Acrescentar: fs.appendFile()
Excluir: `fs.unlink()

89. ENOENT significa Error NO ENTry (Erro: Entrada ou Arquivo Não Encontrado), indicando que a operação tentou acessar um arquivo ou diretório em um caminho que não existe no disco.

90. O erro ocorreria se a rota tentasse ler o arquivo dados/jogos.json` antes de o mesmo ter sido criado na estrutura do projeto.

---

91. O módulo path fornece utilitários para resolver, manipular e construir caminhos de arquivos e diretórios de forma segura.

92. Porque os sistemas operacionais utilizam separadores de diretório diferentes em suas estruturas: o Windows utiliza a barra invertida \, enquanto os sistemas Unix (Linux e macOS) utilizam a barra normal /.

95. A vantagem do path.join() é que ele detecta o sistema operacional em execução e junta os segmentos do caminho utilizando o separador correto automaticamente, tornando o código cross-platform.

---

96. Sua função é interceptar e tratar exceções lançadas durante o processamento. Ele evita que falhas inesperadas quebrem a aplicação ou façam o servidor parar de responder.

---

101. Uma operação síncrona é bloqueante e força a aplicação a pausar até que a tarefa de I/O seja totalmente concluída. Uma operação assíncrona executa a tarefa em segundo plano, liberando o servidor para continuar o processamento de outras instruções.

102. O servidor paralisa seu Event Loop, ficando incapaz de processar requisições concorrentes e fazendo com que outros usuários fiquem aguardando a liberação do processo.

103. Porque mantêm o servidor responsivo e altamente concorrente, permitindo que a aplicação atenda múltiplos acessos simultâneos sem travar a thread principal durante leituras ou escritas em disco.

104. Uma Promise é um objeto no JavaScript que representa a eventual conclusão ou falha de uma operação assíncrona e seu valor resultante.

105. A palavra-chave async é utilizada para declarar que uma função é assíncrona, fazendo com que ela retorne uma Promise automaticamente.

106. A palavra-chave await faz a execução aguardar a resolução de uma Promise dentro de uma função async, permitindo escrever código assíncrono com sintaxe limpa e sequencial.

107. O readFileSync é a versão síncrona e bloqueante para leitura de arquivos, enquanto o readFile (ou fs.promises.readFile) é a versão assíncrona e não-bloqueante.

---

109. Um middleware é uma função intermediária situada na cadeia de execução da requisição-resposta (req, res, next). Ele pode inspecionar, transformar ou interromper o fluxo antes que a rota final seja executada.

110. Porque ele atua na fase de recepção, interceptando a requisição para processar o corpo JSON e injetá-lo estruturado no objeto req.body antes que os manipuladores das rotas sejam chamados.

111. Controle de autenticação e validação de tokens de segurança. Registro e auditoria de logs de acessos das requisições recebidas

112. Ele atua logo após a chegada da requisição HTTP ao servidor e antes do acionamento do controlador final da rota.

---

113. O protocolo HTTP é considerado stateless porque ele não possui memória nativa; cada requisição é tratada pelo servidor de maneira isolada e independente de requisições anteriores.

114. Um Cookie é um pequeno arquivo ou dado de texto enviado pelo servidor e mantido no navegador do cliente, enviado automaticamente em todas as novas requisições para o mesmo domínio.

115. Uma Sessão é uma estrutura mantida do lado do servidor para guardar os dados e o contexto de um usuário enquanto ele navega pela aplicação.

116. Ficam armazenados no próprio navegador web do cliente.

117. Ficam armazenados no servidor (na memória, no banco de dados ou em repositórios em nuvem).

118. O servidor autentica o usuário e cria uma Sessão interna, gerando um Session ID. Esse identificador é enviado ao navegador gravado dentro de um Cookie. Nas requisições seguintes, o cliente reenvia o Cookie contendo o *Session ID*, permitindo ao servidor localizar a sessão mantida em memória e reconhecer o usuário logado.

199. Armazenar preferências de interface do usuário, como idioma selecionado ou modo de exibição (claro/escuro).

120. Gerenciar o estado de login ativo e o carrinho de compras de um usuário.

121. O Session ID é um código ou chave alfanumérica única gerada pelo servidor que serve para associar o navegador do cliente à sua respectiva sessão mantida com segurança no servidor