FROM gradle:7.6-jdk17-alpine AS build

WORKDIR /app

COPY . .

RUN gradle clean build

RUN rm build/libs/*-plain.jar


FROM openjdk:17-jdk AS runtime

WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

RUN curl -o /usr/local/bin/wait-for-it https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x /usr/local/bin/wait-for-it

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

EXPOSE 8081

ENTRYPOINT ["docker-entrypoint.sh"]

ARG CASSANDRA_PORT
ARG CASSANDRA_HOST
ARG CASSANDRA_KEYSPACE
ARG CASSANDRA_USERNAME
ARG CASSANDRA_PASSWORD
RUN export CASSANDRA_PORT=$CASSANDRA_PORT \
    && export CASSANDRA_HOST=$CASSANDRA_HOST \
    && export CASSANDRA_KEYSPACE=$CASSANDRA_KEYSPACE \
    && export CASSANDRA_USERNAME=$CASSANDRA_USERNAME \
    && export CASSANDRA_PASSWORD=$CASSANDRA_PASSWORD

CMD java -jar app.jar

