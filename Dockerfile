# Utiliser l'image officielle Node.js
FROM node:23

# Installer les dépendances système nécessaires
RUN apt-get update && apt-get install -y --no-install-recommends \
  fonts-liberation \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdrm2 \
  libgbm1 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils \
  libu2f-udev \
  libxshmfence1 \
  libglu1-mesa \
  chromium \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Définir le dossier de travail
WORKDIR /app

# Copier package.json et package-lock.json pour installer les dépendances en premier
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Installer TypeScript globalement
RUN npm install -g typescript

# Copier le reste des fichiers du projet
COPY . .

# Compiler les fichiers TypeScript
RUN npx tsc

# Définir l'environnement Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium"

# Exposer le port de l'application
EXPOSE 3000

# Lancer l'application
CMD ["node", "dist/server.js"]
