FROM node:13.12.0-alpine as builder
WORKDIR /FrontEnd/app

# ENV
ENV PATH /FrontEnd/app/node_modules/.bin:$PATH
ENV REACT_APP_BASE_URL https://automationbackend.onrender.com

COPY . ./
RUN npm install
RUN npm run build

# RUN npm ci --silent
RUN npm install --silent
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /FrontEnd/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/configfile.template

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]