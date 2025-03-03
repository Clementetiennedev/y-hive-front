# Utilisation de l'image officielle Node.js
FROM node:23

# Définition du répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour améliorer le cache Docker
COPY package.json package-lock.json ./

# Installation des dépendances
RUN npm install --production

# Copier tout le reste des fichiers
COPY . .

# Installation de TypeScript globalement
RUN npm install -g typescript

# Compilation du TypeScript en JavaScript
RUN npx tsc

# Définition de la variable d'environnement pour Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium"

# Exposer le port 3000
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "dist/server.js"]
