# TODO: @zahcoder34 define appropriate base image
FROM node:20.14.0-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY vite.config.* ./
COPY src ./src
COPY public ./public

RUN npm install
RUN npm run build

# The mini webserver perhaps...
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

# Build assets -> /nginx/html... To host it
COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]