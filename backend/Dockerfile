# Usa imagem oficial do Node.js
FROM node:18

# Cria diretório de trabalho
WORKDIR /app

# Copia os arquivos package
COPY package.json yarn.lock ./

# Instala dependências
RUN yarn install

# Copia o restante da aplicação
COPY . .

# Expõe a porta que o app usa
EXPOSE 3333

# Comando pra rodar a API
CMD ["yarn", "dev"]
