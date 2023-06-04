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

CMD java -jar app.jar

