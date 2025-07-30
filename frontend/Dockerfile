# Build stage
FROM node:18 AS builder

WORKDIR /app

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL


COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve using nginx
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

