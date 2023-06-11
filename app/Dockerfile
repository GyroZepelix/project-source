FROM node:16.13.1-alpine AS builder

WORKDIR /app

COPY . .

RUN rm .env

RUN npm install

RUN npm run build


FROM nginx:1.21.6-alpine

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/ssl /etc/nginx/ssl

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
