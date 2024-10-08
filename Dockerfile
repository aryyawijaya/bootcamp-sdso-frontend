ARG ALPINE_VERSION=3.19

# stage 1: build react+vite app
FROM node:18.19.0-alpine${ALPINE_VERSION} AS builder

WORKDIR /build-stage

COPY package*.json .

RUN npm i

COPY . .

RUN npm run build

# stage 2: production image
FROM nginx:1.27.0-alpine${ALPINE_VERSION}

ARG VITE_BACKEND_URL
ARG VITE_API
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
ENV VITE_API=${VITE_API}

WORKDIR /etc/nginx/conf.d

COPY default.conf.template .

RUN sed -i "s|VITE_BACKEND_URL|$VITE_BACKEND_URL|g" default.conf.template && \
    sed -i "s|VITE_API|$VITE_API|g" default.conf.template && \
    cp default.conf.template default.conf

WORKDIR /usr/share/nginx/html

COPY --from=builder /build-stage/dist .

CMD [ "nginx", "-g", "daemon off;" ]
