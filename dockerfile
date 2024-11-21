# Étape 1: Construction de l'application Angular
FROM node:18 AS build

WORKDIR /app

# Copier le package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier tout le code source de l'application
COPY . .

# Construire l'application Angular
RUN npm run build --prod

# Étape 2: Serveur Nginx pour héberger l'application Angular
FROM nginx:alpine

# Copier les fichiers construits depuis l'étape précédente
COPY --from=build /app/dist/todo-app/browser /usr/share/nginx/html

# Exposer le port sur lequel Nginx écoutera
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
