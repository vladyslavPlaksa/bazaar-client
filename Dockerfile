FROM node:18.17.1

WORKDIR /app
COPY ./package.json /app/
RUN npm install

ENTRYPOINT npm run dev
