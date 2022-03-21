FROM node:alpine

RUN apk add tzdata
ENV TZ=Asia/Tokyo

COPY package*.json ./

RUN npm ci

COPY . .

ENV NODE_ENV=development
ENV PORT=3001

EXPOSE 3001