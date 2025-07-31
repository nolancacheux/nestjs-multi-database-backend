const neo4j = require('neo4j-driver');
const { faker: neo4jFaker } = require('@faker-js/faker');

require('dotenv').config();

async function generateFakeNeo4jData() {
  const driver = neo4j.driver(
    `bolt://${process.env.NEO4J_HOST}:${process.env.NEO4J_PORT}`,
    neo4j.auth.basic(
      process.env.NEO4J_USER || (() => { throw new Error('NEO4J_USER is not defined'); })(),
      process.env.NEO4J_PASSWORD || (() => { throw new Error('NEO4J_PASSWORD is not defined'); })()
    )
  );

  const session = driver.session();

  for (let i = 0; i < 100; i++) {
    await session.run(
      `
      MERGE (a:User {id: $fromUserId})
      MERGE (b:User {id: $toUserId})
      CREATE (a)-[:FRIEND {createdAt: datetime()}]->(b)
      `,
      {
        fromUserId: neo4jFaker.number.int({ min: 1, max: 100 }),
        toUserId: neo4jFaker.number.int({ min: 1, max: 100 }),
      }
    );
  }

  await session.close();
  await driver.close();
  console.log('Neo4j fake relationships generated successfully!');
}

generateFakeNeo4jData();
