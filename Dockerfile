FROM node:slim
RUN mkdir -p /home/node/ && chown -R node:node /home/node/
WORKDIR /home/node/
COPY App.js .
ADD build /home/node/build
ADD node_modules /home/node/node_modules
COPY package*.json ./
RUN npm install express
USER node
EXPOSE 35000
CMD [ "node", "App.js" ]
