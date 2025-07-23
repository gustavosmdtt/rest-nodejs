FROM node:18-alpine

WORKDIR /usr/src/app

# Copia apenas os arquivos de dependência para instalar as libs
COPY package*.json ./

RUN npm install

# Copia o restante do código, exceto node_modules por causa do .dockerignore
COPY . .

RUN npm install -g nodemon

EXPOSE 3000

CMD ["node", "server.js"]
