# Makefile for managing Docker Compose

# Default variables
COMPOSE_FILE = docker-compose.yml
DOCKER_COMPOSE = docker-compose -f $(COMPOSE_FILE)



# Prisma variables for multiple schemas
PRISMA = npx prisma
MIGRATE_NAME = initial
PRISMA_DB1 = --schema=prisma/database1/schema.prisma
PRISMA_DB2 = --schema=prisma/database2/schema.prisma
SEED_DB2 = prisma/database2/seed.js


# Default target
.PHONY: all
all: up

# Build the Docker images
.PHONY: build
build:
	$(DOCKER_COMPOSE) build

# Start the containers
.PHONY: up
up:
	$(DOCKER_COMPOSE) up -d

# Stop the containers
.PHONY: stop
stop:
	$(DOCKER_COMPOSE) stop

# Restart the containers
.PHONY: restart
restart: stop up

# Remove the containers
.PHONY: down
down:
	$(DOCKER_COMPOSE) down

# Remove the containers and volumes
.PHONY: down-volumes
down-volumes:
	$(DOCKER_COMPOSE) down -v

# View container logs
.PHONY: logs
logs:
	$(DOCKER_COMPOSE) logs -f

# Tail logs of a specific service
.PHONY: logs-app
logs-app:
	$(DOCKER_COMPOSE) logs -f app

# Execute a command in the app container
.PHONY: exec-app
exec-app:
	$(DOCKER_COMPOSE) exec app bash

# Clean up unused Docker resources
.PHONY: prune
prune:
	docker system prune -f

# Check container status
.PHONY: ps
ps:
	$(DOCKER_COMPOSE) ps


# Prisma commands for db1
.PHONY: prisma-migrate-db1
prisma-migrate-db1:
	$(DOCKER_COMPOSE) exec app ${PRISMA} migrate dev $(PRISMA_DB1) --name ${MIGRATE_NAME}

.PHONY: prisma-generate-db1
prisma-generate-db1:
	$(DOCKER_COMPOSE) exec app ${PRISMA} generate $(PRISMA_DB1)

.PHONY: prisma-seed-db1
prisma-seed-db1:
	$(DOCKER_COMPOSE) exec app ${PRISMA} db seed  $(PRISMA_DB1)

.PHONY: prisma-studio-db1
prisma-studio-db1:
	$(DOCKER_COMPOSE) exec app prisma studio $(PRISMA_DB1) 

# Prisma commands for db2
.PHONY: prisma-migrate-db2
prisma-migrate-db2:
	$(DOCKER_COMPOSE) exec app ${PRISMA} migrate dev $(PRISMA_DB2) --name ${MIGRATE_NAME}

.PHONY: prisma-generate-db2
prisma-generate-db2:
	$(DOCKER_COMPOSE) exec app ${PRISMA} generate $(PRISMA_DB2)

.PHONY: prisma-seed-db2
prisma-seed-db2:
	$(DOCKER_COMPOSE) exec app ${PRISMA} db seed 

.PHONY: prisma-studio-db2
prisma-studio-db2:
	$(DOCKER_COMPOSE) exec app prisma studio $(PRISMA_DB2) 


# Jenkins commands
.PHONY: jenkins-start
jenkins-start:
	$(DOCKER_COMPOSE) up -d jenkins

.PHONY: jenkins-stop
jenkins-stop:
	$(DOCKER_COMPOSE) stop jenkins

.PHONY: jenkins-restart
jenkins-restart: jenkins-stop jenkins-start

.PHONY: jenkins-logs
jenkins-logs:
	$(DOCKER_COMPOSE) logs -f jenkins

.PHONY: jenkins-console
jenkins-console:
	$(DOCKER_COMPOSE) exec jenkins bash

# Help
.PHONY: help
help:
	@echo "Makefile commands:"
	@echo "  build         - Build the Docker images"
	@echo "  up            - Start the containers in detached mode"
	@echo "  stop          - Stop the containers"
	@echo "  restart       - Restart the containers"
	@echo "  down          - Remove the containers"
	@echo "  down-volumes  - Remove the containers and volumes"
	@echo "  logs          - View container logs"
	@echo "  logs-app      - Tail logs of the app service"
	@echo "  exec-app      - Execute a bash command in the app container"
	@echo "  prune         - Clean up unused Docker resources"
	@echo "  ps            - Check container status"
	@echo "  prisma-migrate-db1  - Run Prisma migrations for db1"
	@echo "  prisma-generate-db1 - Generate Prisma Client for db1"
	@echo "  prisma-seed-db1     - Run Prisma database seed for db1"
	@echo "  prisma-studio-db1   - Run Prisma Studio for db1"
	@echo "  prisma-migrate-db2  - Run Prisma migrations for db2"
	@echo "  prisma-generate-db2 - Generate Prisma Client for db2"
	@echo "  prisma-seed-db2     - Run Prisma database seed for db2"
	@echo "  prisma-studio-db2   - Run Prisma Studio for db2"
	@echo "  jenkins-start         - Start the Jenkins container"
	@echo "  jenkins-stop          - Stop the Jenkins container"
	@echo "  jenkins-restart       - Restart the Jenkins container"
	@echo "  jenkins-logs          - View Jenkins container logs"
	@echo "  jenkins-console       - Access the Jenkins container bash"
	@echo "  help          - Show this help message"