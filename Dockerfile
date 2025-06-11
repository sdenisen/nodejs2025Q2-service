FROM node:alpine3.19 AS builder

ENV NODE_VERSION 22.11.0

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install --legacy-peer-deps

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:22.11.0-alpine3.19 AS development

WORKDIR /app


COPY --from=builder /app/package*.json ./

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

RUN rm -rf /usr/local/share/.cache \
           /root/.npm \
           /tmp/*

CMD ["node", "dist/main.js"]