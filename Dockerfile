# Utilise une image Node.js pour construire l'application Angular
FROM node:20 AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Construire l'application Angular
RUN npm run build --prod

# Utiliser une image Nginx pour servir l'application
FROM nginx:alpine

# Copier les fichiers construits depuis l'étape précédente
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port 3000
EXPOSE 3000

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
