# 198-Pruebas


# Docker
To run the container execute, from the project's root folder:<br>
`$ docker-compose -f docker/db.docker-compose.yml --env-file docker/db-local.env up -d`

# Back-end
To run the back-end, from the project's root folder:
`$ mvn spring-boot:run`

# Front-end
To run the back-end, from the angularclient folder:
`$ ng serve`
(It will listen to port 4200)


