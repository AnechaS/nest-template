FROM node:18.17.1 AS builder

WORKDIR /app
COPY . ./

RUN npm install --ignore-scripts && npm run build

FROM node:18.17.1-slim

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm install --omit=dev

EXPOSE  3000

ENTRYPOINT ["npm", "start"]
