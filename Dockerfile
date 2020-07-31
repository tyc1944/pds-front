FROM registry.yunmotec.com:1443/node:12.16.1-alpine3.11 as builder  
WORKDIR /    
COPY . .  
RUN  npm config set registry http://nexus.yunmotec.com:32055/repository/npm/
RUN  npm config set _auth eXVubW90ZWNucG06eXVubW90ZWNucG0=
RUN  export NODE_OPTIONS="--max-old-space-size=4096"
RUN  npm install
ARG BUILD_ENV
RUN  npm run $BUILD_ENV

FROM registry.yunmotec.com:1443/nginx:latest
ARG ENV
COPY ci/nginx.conf /tmp
COPY ci/setArg.sh /tmp
RUN chmod u+x /tmp/setArg.sh && /tmp/setArg.sh $ENV
COPY --from=builder build /var/www/html
EXPOSE 80
