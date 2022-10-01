FROM node:13.12.0-alpine as builder
WORKDIR /FrontEnd/app
COPY package.json ./
COPY package-lock.json ./

# RUN npm ci --silent
RUN npm install --silent
COPY . .
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /FrontEnd/app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

