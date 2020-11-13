FROM node:alpine
WORKDIR /usr/src/app
ADD package*.json ./
RUN npm install
ADD . .
CMD ["npm","start"]