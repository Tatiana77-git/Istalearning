# 1️⃣ Базовый образ Node.js
FROM node:18-alpine

# 2️⃣ Рабочая директория внутри контейнера
WORKDIR /app

# 3️⃣ Копируем package.json и package-lock.json
COPY package*.json ./

# 4️⃣ Устанавливаем зависимости
RUN npm install

# 5️⃣ Копируем весь backend-код
COPY . .

# 6️⃣ Открываем порт (тот, что используешь в server.ts)
EXPOSE 3000

# 7️⃣ Запуск backend
CMD ["npm", "run", "dev"]
