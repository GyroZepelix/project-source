FROM node:16.13.1-alpine AS builder

WORKDIR /app

COPY . .

RUN rm .env

ARG VITE_BACKEND_BASE_URL
ARG VITE_KEYCLOAK_URL
ARG VITE_KEYCLOAK_REALM
ARG VITE_KEYCLOAK_CLIENT_ID

RUN npm install


RUN VITE_BACKEND_BASE_URL=$VITE_BACKEND_BASE_URL \
    VITE_KEYCLOAK_URL=$VITE_KEYCLOAK_URL \
    VITE_KEYCLOAK_REALM=$VITE_KEYCLOAK_REALM \
    VITE_KEYCLOAK_CLIENT_ID=$VITE_KEYCLOAK_CLIENT_ID \
    npm run build


FROM nginx:1.21.6-alpine

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/ssl /etc/nginx/ssl

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
