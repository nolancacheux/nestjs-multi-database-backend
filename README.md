Projet M1 - Backend NestJS with Distributed Storage (PostgreSQL, Cassandra, Neo4j, Redis, Bucket)

## Introduction

This project is an advanced RESTful backend solution developed with NestJS to manage a distributed and scalable data architecture, tailored for the Summer-Trip web application. Faced with rapid growth in data volume and complexity, this application requires a robust, scalable, and resilient solution integrating multiple specialized databases (PostgreSQL, Cassandra, Neo4j, Redis, and S3-compatible Bucket).

## Project Context

Developed as part of the Master 1 Big Data program at JUNIA ISEN (2024), the project addresses the following challenge:

"How to develop the data architecture of a storage system to ensure its scalability and resilience in the face of increasing load and data volume?"

The backend (Nolan Cacheux) focuses on the management and advanced testing of each storage system using automatically generated mock data, ensuring a comprehensive technical validation of the distributed architecture.

## Project Objectives

- Provide a distributed REST API to manage users, messages, notifications, groups, and files.
- Ensure data persistence with PostgreSQL, Cassandra, Neo4j, Redis, and Bucket.
- Optimize performance through Redis caching.
- Automate multi-container deployment with Docker and Docker Compose.
- Analyze performance and test integration using advanced Jupyter Notebooks.
- Effectively manage horizontal scalability.

## Installation & Deployment with Docker

1. Clone the project

```bash
git clone https://github.com/nolancacheux/backend-distributed-api.git
cd backend-distributed-api
```

2. Configure the .env file

Create a .env file at the root of the project with:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# PostgreSQL Database Configuration
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=mydb

# Cassandra Configuration
CASSANDRA_HOST=cassandra
CASSANDRA_PORT=9042
#nom de la base de données
CASSANDRA_KEYSPACE=summertrip 


# Neo4j Configuration
NEO4J_HOST=host.docker.internal
NEO4J_PORT=7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=neo4jazerty

# Redis Configuration
REDIS_HOST=host.docker.internal
REDIS_PORT=6379

# Storage Configuration (MinIO)
STORAGE_ENDPOINT=storage
STORAGE_PORT=9000
STORAGE_ACCESS_KEY=minioadmin
STORAGE_SECRET_KEY=minioadmin
STORAGE_BUCKET=uploads


```

3. Build and launch Docker containers

```bash
docker-compose up -d --build
```

The API will be accessible at: http://localhost:3000

4. Generate mock data for testing

Use the dedicated scripts to populate each database:

```bash
docker exec -it backend-api node dist/scripts/postgres_fake_data.js
docker exec -it backend-api node dist/scripts/cassandra_fake_data.js
docker exec -it backend-api node dist/scripts/neo4j_fake_data.js
docker exec -it backend-api node dist/scripts/storage_upload_test.js
```
If you modify the scripts, you can run the following commands to recompile the TypeScript files:

1. Remove the `dist` folder inside the container:

```bash
docker exec -it backend-api rm -rf dist
```

2. Recompile the TypeScript files:

```bash
docker exec -it backend-api npx tsc 
```

Note: If the above command does not produce any output, it is often due to the `tsconfig.json` file being misplaced or missing in the container (expected at `/app/tsconfig.json`). To resolve this, copy the file from the host machine:

```bash
docker cp tsconfig.json backend-api:/app/tsconfig.json
```

3. View the content of the file (for example: `postgres_fake_data.ts`):

```bash
docker exec -it backend-api cat dist/scripts/postgres_fake_data.js
```

4. Run the scripts:

```bash
docker exec -it backend-api node dist/scripts/postgres_fake_data.js
docker exec -it backend-api node dist/scripts/cassandra_fake_data.js
docker exec -it backend-api node dist/scripts/neo4j_fake_data.js
docker exec -it backend-api node dist/scripts/storage_upload_test.js
```

5. Analyze performance

Use the notebooks available in `notebooks/` to test and analyze the API.

6. Restart Docker containers if necessary

```bash
docker-compose down
docker-compose up -d --build
```
## API Endpoints Overview

### PostgreSQL (via TypeORM)
- **GET** `http://localhost:3000/users` - Retrieve the list of users.
- **GET** `http://localhost:3000/users/:id` - Retrieve a user by ID.
- **POST** `http://localhost:3000/users` - Create a new user.
- **GET** `http://localhost:3000/groups` - Retrieve the list of groups.
- **GET** `http://localhost:3000/groups/:id` - Retrieve a group by ID.
- **POST** `http://localhost:3000/groups` - Create a new group.

### Cassandra (via cassandra-driver)
- **GET** `http://localhost:3000/messages/:conversationId` - Retrieve messages from a conversation.
- **POST** `http://localhost:3000/messages` - Insert a new message.
- **GET** `http://localhost:3000/notifications/:userId` - Retrieve notifications for a user.
- **POST** `http://localhost:3000/notifications` - Insert a new notification.

### Neo4j (Graph Database)
No API endpoints are currently defined in the controllers. Data insertion is handled via scripts.  
To view relationships, access the Neo4j Browser interface at:  
`http://localhost:7474`  

Login credentials:  
- **Username**: `neo4j`  
- **Password**: `neo4jazerty`  

Example Cypher query to view relationships:
```cypher
MATCH (a:User)-[r:FRIEND]->(b:User) RETURN a, r, b LIMIT 25;
```

### Redis
No API endpoints are defined for Redis. Data can be accessed using a client such as RedisInsight or via the Redis CLI:
```bash
docker exec -it redis redis-cli
```
### MinIO (S3-Compatible Storage)

- **POST** `http://localhost:3000/storage/upload`  
    Upload a file using the `file` field in form-data.

- **GET** `http://localhost:3000/storage/download/:filename`  
    Download a file by specifying the filename in the URL.  
    Example: `http://localhost:3000/storage/download/test-image.png`

MinIO dashboard is accessible at:  
`http://localhost:9001`  

Login credentials:  
- **Access Key**: `minioadmin`  
- **Secret Key**: `minioadmin`

```
Projet-M1/
├── backend-distributed-api/
│   ├── dist/                        # Compiled files after build
│   ├── node_modules/                # Project dependencies
│   ├── notebooks/                   # API testing and performance analysis
│   │   ├── api_tests.ipynb          # Comprehensive database tests
│   │   └── data_analysis.ipynb      # Advanced analyses (later)
│   ├── src/
│   │   ├── config/                  # General & DB configurations
│   │   │   ├── config.module.ts
│   │   │   ├── postgres.config.ts
│   │   │   ├── redis.config.ts
│   │   │   ├── neo4j.config.ts
│   │   │   ├── cassandra.config.ts
│   │   │   └── storage.config.ts
│   │   ├── controllers/             # REST API controllers
│   │   │   ├── user.controller.ts
│   │   │   ├── message.controller.ts
│   │   │   ├── notification.controller.ts
│   │   │   ├── group.controller.ts
│   │   │   └── storage.controller.ts
│   │   ├── databases/               # Database-specific modules
│   │   │   ├── postgres/
│   │   │   │   ├── postgres.module.ts
│   │   │   │   └── postgres.provider.ts
│   │   │   ├── redis/
│   │   │   │   ├── redis.module.ts
│   │   │   │   └── redis.provider.ts
│   │   │   ├── neo4j/
│   │   │   │   ├── neo4j.module.ts
│   │   │   │   └── neo4j.provider.ts
│   │   │   ├── cassandra/
│   │   │   │   ├── cassandra.module.ts
│   │   │   │   └── cassandra.provider.ts
│   │   │   └── storage/
│   │   │       ├── storage.module.ts
│   │   │       └── storage.provider.ts
│   │   ├── models/                  # Database schemas
│   │   │   ├── postgres/
│   │   │   │   ├── user.entity.ts
│   │   │   │   └── group.entity.ts
│   │   │   ├── cassandra/
│   │   │   │   ├── message.model.ts
│   │   │   │   └── notification.model.ts
│   │   │   └── neo4j/
│   │   │       └── relationship.model.ts
│   │   ├── services/                # Business logic
│   │   │   ├── postgres/
│   │   │   │   ├── user.service.ts
│   │   │   │   └── group.service.ts
│   │   │   ├── cassandra/
│   │   │   │   ├── message.service.ts
│   │   │   │   └── notification.service.ts
│   │   │   ├── neo4j/
│   │   │   │   └── relationship.service.ts
│   │   │   ├── redis/
│   │   │   │   └── cache.service.ts
│   │   │   └── storage/
│   │   │       └── file-storage.service.ts
│   │   ├── scripts/                 # Advanced utility scripts
│   │   │   ├── postgres_fake_data.ts
│   │   │   ├── cassandra_fake_data.ts
│   │   │   ├── neo4j_fake_data.ts
│   │   │   └── storage_upload_test.ts
│   │   ├── shared/                  # Common interfaces and DTOs
│   │   │   ├── dto/
│   │   │   │   ├── user.dto.ts
│   │   │   │   ├── message.dto.ts
│   │   │   │   └── notification.dto.ts
│   │   │   └── interfaces/
│   │   │       └── generic.interface.ts
│   │   ├── app.module.ts            # Root NestJS module
│   │   └── main.ts                  # Application entry point
│   ├── uploads/                     # Temporary file storage before Bucket upload
│   ├── .dockerignore
│   ├── .env                         # Global environment variables
│   ├── .gitignore
│   ├── .prettierrc
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
```

## Folder Descriptions

- **config/**: Configuration modules for each database.
- **controllers/**: REST route management for each entity.
- **databases/**: Providers and modules specific to database connections.
- **models/**: Schemas and entities for each database.
- **services/**: Business logic for database interactions.
- **scripts/**: Mock data generation scripts for testing.
- **shared/**: Shared DTOs and interfaces between services.
- **uploads/**: Temporary file storage before Bucket upload.
