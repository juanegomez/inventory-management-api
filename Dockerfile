# Usamos Node 22.18.0
FROM node:22.18.0

# Directorio de trabajo
WORKDIR /usr/src/app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto definido en .env
EXPOSE 3000

# Comando por defecto
CMD ["npm", "run", "dev"]
