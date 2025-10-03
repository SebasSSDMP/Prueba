# Imagen base ligera de Node
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto de la app (ajusta si tu app usa otro)
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]
