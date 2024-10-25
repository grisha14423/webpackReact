FROM node:18-alpine

WORKDIR /app
# Так будет смотреть, что можно взять из кеша при перемонтировании образа, не будет устанавливать завиимости заново
COPY package*.json ./

RUN npm install

COPY . .

# Собираем проект (выбрать необходимую команду). RUN только при сборке образа
RUN npm run build:dev

# Открываем порт, не обязательная, best practice
EXPOSE 3000

# CMD каждый раз при запуске образа
CMD ["npm", "run", "start"]
