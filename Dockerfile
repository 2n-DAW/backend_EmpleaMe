# Etapa 1: Construcción
FROM node:22-alpine AS build

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar las dependencias (de forma rápida y segura)
RUN npm ci

# Copiar el resto del código fuente
COPY . .

# Etapa 2: Producción
FROM alpine:3.18

# Etiquetas
LABEL autor="Francisco Montés Doria"
LABEL maintainer="f.montesdoria@gmail.com"
LABEL version="1.0"
LABEL description="Docker image for Express.js backend EmpleaMe"
LABEL repository="https://github.com/2n-DAW/backend_EmpleaMe"
LABEL build-date="10-11-2024"

# Instalar Node.js
RUN apk add --update nodejs npm

WORKDIR /app

# Copiar solo los módulos de node y el código de la etapa de construcción
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app .

# Definir las variables de entorno
ENV MONGO_URI=mongodb://mongo:27017/mydb
ENV PORT=3000
ENV CORSURL=http://localhost:4200
ENV ACCESS_TOKEN_EXPIRATION=1d
ENV REFRESH_TOKEN_EXPIRATION=15d

# Exponer el puerto 3000
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start"]