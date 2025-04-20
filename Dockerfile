# ---- Build Stage ----
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.js* ./
COPY --from=builder /app/next.config.ts* ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/app ./app
COPY --from=builder /app/components ./components
COPY --from=builder /app/tailwind.config.* ./ 
COPY --from=builder /app/postcss.config.* ./
COPY --from=builder /app/tsconfig.json* ./
COPY --from=builder /app/.env .env

EXPOSE 3000

CMD ["npm", "start"]
