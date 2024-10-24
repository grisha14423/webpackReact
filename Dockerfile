FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Собираем проект (выбрать необходимую команду)
RUN npm run build:dev

# Открываем порт (например, если используется Webpack Dev Server на 3000 порту)
EXPOSE 3000

CMD ["npm", "run", "start"]
