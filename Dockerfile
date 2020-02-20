FROM node:alpine
ARG API_DOMAIN
ENV API_DOMAIN=${API_DOMAIN}
WORKDIR /app
COPY package*.json ./
RUN npm install --production --silent
COPY . .
RUN npm run build

CMD ["npm", "run", "start:server"]
