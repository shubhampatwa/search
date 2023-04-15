FROM node:16

ENV NODE_ENV=production

WORKDIR /app

RUN npm install -g npm

RUN npm install -g @nestjs/cli@9.0.0

COPY package*.json ./
RUN npm ci

COPY ./ ./
RUN npm run build

EXPOSE 5000

CMD ["npm","run","start"]