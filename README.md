## Preparação do ambiente

Instale o banco de dados MySQL e crie o banco `mystore`.

Crie o diretório `logs` na raiz do projeto, a mesma não é criada automaticamente e será utilizada pelo serviço de log.

## Instalar dependências

Entre no diretório do projeto e execute:

`npm install`

### Instalar o Sequelize CLI

`npm install -g sequelize-cli`

## Iniciar o projeto

Após instalar as dependências, aplique as migrations:

`sequelize db:migrate`

Inicie a aplicação:

`npm run start`

O servidor local de desenvolvimento será iniciado em http://localhost:8080
