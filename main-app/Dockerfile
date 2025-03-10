# Usar a imagem oficial do Node.js
FROM node:18-alpine AS builder

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos necessários
COPY package.json pnpm-lock.yaml* ./

# Instalar as dependências
RUN npm install

# Copiar o restante dos arquivos
COPY . .

# Construir o projeto Next.js
RUN npm run build

# Fase final: Imagem de produção
FROM node:18-alpine

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos da fase anterior
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expor a porta do Next.js
EXPOSE ${PORT}
# Comando para iniciar o servidor

CMD ["sh", "-c", "PORT=$PORT npm start"]