FROM node:12.16.2-alpine

RUN apk --update add tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata && \
    rm -rf /var/cache/apk/*

ENV WORKDIR /usr/src
ENV PATH $PATH:$WORKDIR/node_modules/.bin
ENV HOST 0.0.0.0
WORKDIR $WORKDIR

ARG nodeEnv='production'
ENV NODE_ENV $nodeEnv

ADD package.json yarn.lock $WORKDIR/

# devDependenciesも取得するため環境変数をdevelopmentに設定
RUN NODE_ENV=development yarn

ADD . $WORKDIR
RUN yarn run build

EXPOSE 3000
