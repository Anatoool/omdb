FROM node:16.18-alpine
ARG API_DOMAIN
ENV API_DOMAIN=${API_DOMAIN}
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build

CMD ["npm", "run", "start:server"]
