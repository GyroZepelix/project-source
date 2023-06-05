FROM node:16.13.1-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build


FROM nginx:1.21.6-alpine

COPY nginx/* /etc/nginx/

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
