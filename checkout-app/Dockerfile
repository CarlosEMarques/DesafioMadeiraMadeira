# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package.json package-lock.json ./

# Instalar dependências com npm
RUN npm install --legacy-peer-deps

# Copiar o restante do código
COPY . .

# Build do Next.js
RUN npm run build

# Stage 2: Production
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Copiar os arquivos necessários para produção
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Instalar apenas as dependências de produção
RUN npm install --production --legacy-peer-deps

EXPOSE ${PORT}

CMD ["sh", "-c", "PORT=$PORT npm start"]