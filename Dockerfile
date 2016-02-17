FROM node:4.2.6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm install -g npm@3

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "prod" ]
