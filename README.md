# Project Source

Project Source is a realtime messaging application I made for my final thesis in highschool. It seemed fun to create something like this so i did

It is made with the following technologies:
> - ReactJS
> - Springboot 3.0
> - Keycloak
> - Cassandra
> - PostgresDB (for keycloak)

## Installation & Deployment

Deployment is simple, in the root of the project run the following command to setup automaticly setup the frontend, keycloak and both databases

```bash
docker compose up -d
```

after that you need to build and run the backend with the following commands in `/service` subdirectory

```bash
./gradlew clean build
java -jar build/libs/service-0.0.1-SNAPSHOT.jar
```

Now you should be able to access the frontend [http://localhost](http://localhost) and the keycloak admin panel [http://localhost:8080](http://localhost:8080)

## Local Development

For local development you need to have the following installed:
> - NodeJS
> - Java 17
> - Gradle
> - Docker
> - Docker Compose
> - NPM

After that you need to start the databases and keycloak with the following command in the root of the project

```bash
docker compose -f docker-compose-dev up -d
```

Then run the development server for the frontend with the following command in the `/app` subdirectory

```bash
npm install
npm run dev
```

And finally run the backend with the following commands in the `/service` subdirectory

```bash
./gradlew bootRun
```

Now you should be able to access the frontend [http://localhost:5173](http://localhost:5173) and the keycloak admin panel [http://localhost:8080](http://localhost:8080)