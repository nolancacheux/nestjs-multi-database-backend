import * as dotenv from 'dotenv';
dotenv.config();

export default () => ({
  neo4j: {
    host: process.env.NEO4J_HOST,
    port: parseInt(process.env.NEO4J_PORT || '7687', 10),
    username: process.env.NEO4J_USER,
    password: process.env.NEO4J_PASSWORD,
  },
});
