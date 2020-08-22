FROM node:14-alpine
WORKDIR /opt/app

COPY package.json package-lock.json ./
RUN npm install --production \
    && npm cache clean --force

COPY src ./src

USER node
CMD ["node", "src/app.js"]
