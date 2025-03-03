# Étape 1 : Build de l'application Angular
FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build:ssr

# Étape 2 : Exécution du serveur Angular
FROM node:20 AS runtime

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json ./
RUN npm install --omit=dev  # Installer uniquement les dépendances de production

COPY --from=build /app/dist /app/dist
COPY --from=build /app/server.js /app/server.js

EXPOSE 3000

CMD ["node", "server.js"]
