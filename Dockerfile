# Étape 1 : Builder
FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

# Installer Nest CLI + Typescript uniquement pour build
RUN npm install && npm install -g @nestjs/cli typescript

# Build TS -> JS
RUN npm run build

# Étape 2 : Runtime sans dépendances de dev
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env .env
COPY --from=builder /app/tsconfig.json ./  
COPY src/scripts/test-image.png ./dist/scripts/


RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "dist/main"]
