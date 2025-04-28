FROM node:20

WORKDIR /app

COPY . .

RUN npm install -g npm@10.8.3
RUN npm ci
RUN NODE_OPTIONS=--max-old-space-size=1024 npm run build
EXPOSE 3000


# Или если нужно использовать команду npm:
 CMD ["npm", "run", "preview"]
