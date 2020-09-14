FROM ruby:2.7.1-alpine3.11

RUN apk --update add \
    libstdc++ \
    libxml2-dev \
    libxslt-dev \
    libc6-compat \
    tzdata \
    build-base

# use nodejs
RUN apk add nodejs yarn

# use sqlite
RUN apk add sqlite sqlite-dev

# 環境変数設定
ENV APP_USER smith
ENV APP_ROOT /home/$APP_USER
ENV APP_UID 1000
ENV GEM_CONF /home/gemconf

# 実行ユーザの作成
RUN mkdir $APP_ROOT
RUN mkdir $GEM_CONF
RUN adduser --home $APP_ROOT -D -u $APP_UID $APP_USER
WORKDIR $APP_ROOT

# 必要なファイルの転送
COPY Gemfile $APP_ROOT
#COPY dot.gemrc $APP_ROOT/.gemrc
RUN chown -R $APP_USER $APP_ROOT
RUN chown -R $APP_USER $GEM_CONF

USER $APP_USER

RUN bundle config --global build.nokogiri --use-system-libraries && \
    bundle install

# GemfileとGemfile.lockの退避
RUN cp Gemfile Gemfile.lock $GEM_CONF

EXPOSE 3000

CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
