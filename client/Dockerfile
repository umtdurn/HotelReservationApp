FROM node:latest as node

WORKDIR /app
COPY . .
RUN npm i --force
RUN npm run build

FROM nginx:alpine
COPY --from=node /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]