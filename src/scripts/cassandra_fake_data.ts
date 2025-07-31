const { Client } = require('cassandra-driver');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

const KEYSPACE = process.env.CASSANDRA_KEYSPACE || 'summertrip';

async function generateFakeCassandraData() {
  const client = new Client({
    contactPoints: [process.env.CASSANDRA_HOST || 'localhost'],
    localDataCenter: 'datacenter1',
    protocolOptions: { port: parseInt(process.env.CASSANDRA_PORT || '9042', 10) },
  });

  await client.connect();

  // 1. Crée le keyspace
  await client.execute(`
    CREATE KEYSPACE IF NOT EXISTS ${KEYSPACE}
    WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
  `);

  // 2. Change de keyspace
  await client.execute(`USE ${KEYSPACE}`);

  // 3. Crée les tables
  await client.execute(`
    CREATE TABLE IF NOT EXISTS messages (
      conversation_id UUID,
      message_id UUID,
      sender_id INT,
      content TEXT,
      created_at TIMESTAMP,
      PRIMARY KEY (conversation_id, message_id)
    );
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS notifications (
      notification_id UUID,
      user_id INT,
      type TEXT,
      message TEXT,
      read BOOLEAN,
      created_at TIMESTAMP,
      PRIMARY KEY (notification_id)
    );
  `);

  // 4. Insertions
  for (let i = 0; i < 100; i++) {
    await client.execute(
      `INSERT INTO messages (conversation_id, message_id, sender_id, content, created_at)
       VALUES (?, ?, ?, ?, ?)`,
      [faker.string.uuid(), faker.string.uuid(), faker.number.int(100), faker.lorem.sentence(), new Date()],
      { prepare: true }
    );
  }

  for (let i = 0; i < 100; i++) {
    await client.execute(
      `INSERT INTO notifications (notification_id, user_id, type, message, read, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [faker.string.uuid(), faker.number.int(100), faker.helpers.arrayElement(['info', 'alert', 'reminder']),
        faker.lorem.sentence(), faker.datatype.boolean(), new Date()],
      { prepare: true }
    );
  }

  await client.shutdown();
  console.log('Cassandra fake data generated successfully!');
}

generateFakeCassandraData();
