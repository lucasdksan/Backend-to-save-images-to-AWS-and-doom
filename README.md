# Backend para armazenar imagens na AWS e na raiz do projeto. :lock: :floppy_disk: :camera:

## Principais ferramentas utilizadas: Knex, javascript, aws-sdk, express e mysql2.

## Knex é utilizado para a criação e a manipulação do banco de dados. Em relação ao banco de dados, ele é utilizado para armazenar o nome, o tamanho, uma chave e a url das imagens que são enviadas para o backend. Isso é feito para ter uma organização em relação as imagens enviadas e para facilitar o envio para a AWS.

## A pasta do database contém todas as funções relacionadas ao banco de dados, por exemplo, o arquivo connection.js que serve para estabelecer a conexão. Além disso, possui arquivos de migração, que são usados para criar o banco de dados.
## Para realizar esta migrations você deve seguir os passos:
### 1 - Estabeleça a conexão com o banco de dados, preferencialmente MySQL.
### 2 - Em seu terminal execute este comando yarn knex: migrate.
### 3 - Para deletar o banco de dados, faça este comando "yarn knex: migrate: rollback", no terminal.

## A pasta config contém as configurações para armazenar e enviar para a AWS. O arquivo multer.js exporta as configurações básicas para o backend, começando com o caminho para a pasta de armazenamento de imagens se você escolher salvá-lo na raiz do projeto. Também possui o limite de imagem, que neste caso é de 2 MB. Outra configuração importante é o formato que o back-end aceitará. A constante StorageType contém as configurações se a pessoa deseja armazenar as informações na raiz ou AWS.

## O arquivo routes.js é responsável por gerenciar as rotas da aplicação. Eles são os responsáveis por receber a imagem, salvá-la no banco de dados, excluí-la se desejar e enviar as informações das imagens armazenadas.

## A pasta responsável por salvar as imagens na raíz do projeto é o uploads que esta no temp.

## Um arquivo importante é .env. Porque contém as informações importantes de que este aplicativo precisa. Colocará informações sobre a conta AWS e a configuração que será realizada, no caso de Local ou AWS.