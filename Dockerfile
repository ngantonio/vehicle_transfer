FROM node:20.14.0 as Install

WORKDIR /api
COPY package*.json ./
RUN npm install

COPY . .
COPY .env .env.example ./

RUN npm run build
EXPOSE 3000

CMD ["node", "build/src/main.js"]