#1st Stage
FROM node:lts-alpine

RUN mkdir -p /usr/src/app
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install --ignore-platform
COPY . .
RUN yarn build

# 2nd Stage
FROM nginx:1.14.2-alpine

COPY --from=0 /usr/src/app/build /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]