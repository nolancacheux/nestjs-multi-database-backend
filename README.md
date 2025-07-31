# Polyglot Distributed API - NestJS Multi-Database Backend

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Cassandra](https://img.shields.io/badge/cassandra-%231287B1.svg?style=for-the-badge&logo=apache-cassandra&logoColor=white)
![Neo4j](https://img.shields.io/badge/neo4j-%23008CC1.svg?style=for-the-badge&logo=neo4j&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## Table of Contents

1. [Introduction](#introduction)
2. [Project Context](#project-context)
3. [Project Objectives](#project-objectives)
4. [Technology Stack](#technology-stack)
5. [Architecture Overview](#architecture-overview)
6. [Prerequisites](#prerequisites)
7. [Installation & Deployment](#installation--deployment)
   - [Quick Start](#quick-start)
   - [Environment Configuration](#environment-configuration)
   - [Docker Deployment](#docker-deployment)
   - [Data Generation](#data-generation)
   - [Development Commands](#development-commands)
8. [API Documentation](#api-documentation)
   - [PostgreSQL Endpoints](#postgresql-via-typeorm)
   - [Cassandra Endpoints](#cassandra-via-cassandra-driver)
   - [Neo4j Interface](#neo4j-graph-database)
   - [Redis Access](#redis)
   - [Storage Endpoints](#minio-s3-compatible-storage)
9. [Project Structure](#project-structure)
   - [Directory Overview](#directory-overview)
   - [Folder Descriptions](#folder-descriptions)
10. [Database Schemas](#database-schemas)
11. [Performance Analysis](#performance-analysis)
12. [Testing](#testing)
13. [Troubleshooting](#troubleshooting)
14. [Contributing](#contributing)
15. [License](#license)
16. [Author](#author)

## Introduction

This project is an advanced RESTful backend solution developed with NestJS to manage a distributed and scalable data architecture, tailored for the Summer-Trip web application. Faced with rapid growth in data volume and complexity, this application requires a robust, scalable, and resilient solution integrating multiple specialized databases (PostgreSQL, Cassandra, Neo4j, Redis, and S3-compatible Bucket).

## Project Context

Developed as part of the Master 1 Big Data program at JUNIA ISEN (2024), the project addresses the following challenge:

**"How to develop the data architecture of a storage system to ensure its scalability and resilience in the face of increasing load and data volume?"**

The backend (Nolan Cacheux) focuses on the management and advanced testing of each storage system using automatically generated mock data, ensuring a comprehensive technical validation of the distributed architecture.

## Project Objectives

- Provide a distributed REST API to manage users, messages, notifications, groups, and files
- Ensure data persistence with PostgreSQL, Cassandra, Neo4j, Redis, and Bucket
- Optimize performance through Redis caching
- Automate multi-container deployment with Docker and Docker Compose
- Analyze performance and test integration using advanced Jupyter Notebooks
- Effectively manage horizontal scalability

## Technology Stack

### Backend Framework
- **NestJS** - Progressive Node.js framework for building efficient server-side applications
- **TypeScript** - Type-safe development environment

### Databases
- **PostgreSQL** - Relational database for structured data (users, groups)
- **Cassandra** - NoSQL database for high-volume data (messages, notifications)
- **Neo4j** - Graph database for relationship management
- **Redis** - In-memory cache for performance optimization
- **MinIO** - S3-compatible object storage for file management

### Infrastructure
- **Docker & Docker Compose** - Containerization and orchestration
- **TypeORM** - Object-relational mapping for PostgreSQL
- **Faker.js** - Mock data generation for testing

## Architecture Overview

This distributed backend follows a microservices-oriented architecture with specialized database systems:

- **User Management**: PostgreSQL for relational user and group data
- **Messaging System**: Cassandra for scalable message storage
- **Social Connections**: Neo4j for complex relationship graphs
- **Caching Layer**: Redis for performance optimization
- **File Storage**: MinIO for scalable object storage

Each database is accessed through dedicated NestJS modules with their own controllers, services, and models, ensuring separation of concerns and optimal performance for each data type.

## Prerequisites

Before running this project, ensure you have:

- **Docker** >= 20.10.0
- **Docker Compose** >= 2.0.0
- **Node.js** >= 16.x (for local development)
- **Git** for version control

### System Requirements
- **RAM**: Minimum 8GB (recommended 16GB)
- **Storage**: At least 10GB free space
- **OS**: Windows 10/11, macOS, or Linux

## Installation & Deployment

### Quick Start

1. **Clone the project**

```bash
git clone https://github.com/nolancacheux/backend-distributed-api.git
cd backend-distributed-api
```

### Environment Configuration

2. **Configure the .env file**

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

### Docker Deployment

3. **Build and launch Docker containers**

```bash
docker-compose up -d --build
```

The API will be accessible at: http://localhost:3000

### Data Generation

4. **Generate mock data for testing**

Use the dedicated scripts to populate each database:

```bash
docker exec -it backend-api node dist/scripts/postgres_fake_data.js
docker exec -it backend-api node dist/scripts/cassandra_fake_data.js
docker exec -it backend-api node dist/scripts/neo4j_fake_data.js
docker exec -it backend-api node dist/scripts/storage_upload_test.js
```

### Development Commands

If you modify the scripts, you can run the following commands to recompile the TypeScript files:

1. **Remove the `dist` folder inside the container:**

```bash
docker exec -it backend-api rm -rf dist
```

2. **Recompile the TypeScript files:**

```bash
docker exec -it backend-api npx tsc 
```

**Note**: If the above command does not produce any output, it is often due to the `tsconfig.json` file being misplaced or missing in the container (expected at `/app/tsconfig.json`). To resolve this, copy the file from the host machine:

```bash
docker cp tsconfig.json backend-api:/app/tsconfig.json
```

3. **View the content of the file (for example: `postgres_fake_data.ts`):**

```bash
docker exec -it backend-api cat dist/scripts/postgres_fake_data.js
```

4. **Run the scripts:**

```bash
docker exec -it backend-api node dist/scripts/postgres_fake_data.js
docker exec -it backend-api node dist/scripts/cassandra_fake_data.js
docker exec -it backend-api node dist/scripts/neo4j_fake_data.js
docker exec -it backend-api node dist/scripts/storage_upload_test.js
```

5. **Restart Docker containers if necessary**

```bash
docker-compose down
docker-compose up -d --build
```

## API Documentation

### PostgreSQL (via TypeORM)
- **GET** `http://localhost:3000/users` - Retrieve the list of users
- **GET** `http://localhost:3000/users/:id` - Retrieve a user by ID
- **POST** `http://localhost:3000/users` - Create a new user
- **GET** `http://localhost:3000/groups` - Retrieve the list of groups
- **GET** `http://localhost:3000/groups/:id` - Retrieve a group by ID
- **POST** `http://localhost:3000/groups` - Create a new group

### Cassandra (via cassandra-driver)
- **GET** `http://localhost:3000/messages/:conversationId` - Retrieve messages from a conversation
- **POST** `http://localhost:3000/messages` - Insert a new message
- **GET** `http://localhost:3000/notifications/:userId` - Retrieve notifications for a user
- **POST** `http://localhost:3000/notifications` - Insert a new notification

### Neo4j (Graph Database)
No API endpoints are currently defined in the controllers. Data insertion is handled via scripts.  
To view relationships, access the Neo4j Browser interface at:  
`http://localhost:7474`  

**Login credentials:**  
- **Username**: `neo4j`  
- **Password**: `neo4jazerty`  

**Example Cypher query to view relationships:**
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
    Upload a file using the `file` field in form-data

- **GET** `http://localhost:3000/storage/download/:filename`  
    Download a file by specifying the filename in the URL  
    Example: `http://localhost:3000/storage/download/test-image.png`

**MinIO dashboard is accessible at:**  
`http://localhost:9001`  

**Login credentials:**  
- **Access Key**: `minioadmin`  
- **Secret Key**: `minioadmin`

## Project Structure

### Directory Overview

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

### Folder Descriptions

- **config/**: Configuration modules for each database
- **controllers/**: REST route management for each entity
- **databases/**: Providers and modules specific to database connections
- **models/**: Schemas and entities for each database
- **services/**: Business logic for database interactions
- **scripts/**: Mock data generation scripts for testing
- **shared/**: Shared DTOs and interfaces between services
- **uploads/**: Temporary file storage before Bucket upload

## Database Schemas

### PostgreSQL Schema
- **Users**: id, name, email, created_at
- **Groups**: id, name, description, created_at

### Cassandra Schema
- **Messages**: conversation_id, message_id, user_id, content, timestamp
- **Notifications**: user_id, notification_id, type, content, timestamp

### Neo4j Relationships
- **User-User**: FRIEND relationships
- **User-Group**: MEMBER_OF relationships

### Redis Cache Structure
- User sessions and temporary data storage

## Performance Analysis

### Jupyter Notebooks
The project includes comprehensive analysis tools in the `notebooks/` directory:

- **api_tests.ipynb**: Database performance testing and API validation
- **data_analysis.ipynb**: Advanced performance metrics and optimization analysis

### Running Performance Tests
```bash
# Access Jupyter environment (if configured)
docker exec -it backend-api jupyter notebook --allow-root --ip=0.0.0.0
```

### Metrics Monitored
- Database query response times
- API endpoint performance
- Cache hit rates
- Storage I/O performance

## Testing

### Mock Data Generation
Generate test data for all databases:

```bash
# PostgreSQL test data
docker exec -it backend-api node dist/scripts/postgres_fake_data.js

# Cassandra test data
docker exec -it backend-api node dist/scripts/cassandra_fake_data.js

# Neo4j test data
docker exec -it backend-api node dist/scripts/neo4j_fake_data.js

# Storage test files
docker exec -it backend-api node dist/scripts/storage_upload_test.js
```

### API Testing
Use the provided Jupyter notebooks for comprehensive API testing and performance analysis.

## Troubleshooting

### Common Issues

#### TypeScript Compilation Issues
If script compilation fails:
```bash
# Remove dist folder
docker exec -it backend-api rm -rf dist

# Copy tsconfig.json if missing
docker cp tsconfig.json backend-api:/app/tsconfig.json

# Recompile
docker exec -it backend-api npx tsc
```

#### Database Connection Errors
- Ensure all containers are running: `docker-compose ps`
- Check logs: `docker-compose logs [service-name]`
- Verify environment variables in `.env`

#### Container Issues
```bash
# Restart all services
docker-compose down
docker-compose up -d --build

# View container logs
docker-compose logs -f
```

## Contributing

This project is part of a Master's thesis. For academic collaboration:

1. Fork the repository
2. Create a feature branch
3. Follow the existing code structure
4. Test with all databases
5. Submit a pull request

### Development Guidelines
- Follow NestJS best practices
- Maintain separation of concerns per database
- Include appropriate error handling
- Document any new endpoints

## License

This project is developed for academic purposes as part of the Master 1 Big Data program at JUNIA ISEN (2024).

## Author

**Nolan Cacheux**  
Master 1 Big Data - JUNIA ISEN (2024)  
Focus: Distributed data architecture and scalability optimization

### Academic Context
*"How to develop the data architecture of a storage system to ensure its scalability and resilience in the face of increasing load and data volume?"*