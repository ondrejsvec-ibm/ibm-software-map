# Choose the Image which has Node installed already
FROM node:lts-alpine AS builder

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
# make the 'app' folder the current working directory
WORKDIR /app

COPY . .
COPY .env.asset-repo ./.env

RUN npm cache clean --force
RUN rm -rf node_mudules

RUN yarn install --network-timeout 100000
RUN yarn build

FROM node:lts-alpine

ARG NITRO_PORT=8080
ENV NITRO_PORT $NITRO_PORT

WORKDIR /app
COPY --from=builder .output .output 

EXPOSE 8080
CMD [ "node", ".output/server/index.mjs" ]