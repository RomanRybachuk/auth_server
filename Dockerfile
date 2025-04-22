# Додаємо ноду і називаємо її як build
FROM node:18-alpine AS build

# Створюємо директорію 
WORKDIR /app

# Копіюємо локальний файл залежностей 
COPY package*.json /app

# Встановлюємо пакети в образ
RUN npm install

# Копіюємо усе з локальної папки в образ
COPY . /app

# Робимо білд і створюємо папку білда в образ
RUN npm run build

# Перевстановлюємо ноду
FROM node:18-alpine

# Перестворюємо папку app в образі
WORKDIR /app

# В нову чисту папку app беремо тільки потрібні файли з попереднього білда 
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# порт
EXPOSE 3000

# Запуск ентрі поінта
CMD ["node", "dist/index.js"]