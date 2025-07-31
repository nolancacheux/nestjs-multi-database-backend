const { DataSource } = require('typeorm');
const { User } = require('../models/postgres/user.entity');
const { Group } = require('../models/postgres/group.entity');
const { faker: postgresFaker } = require('@faker-js/faker');

require('dotenv').config();


async function generateFakePostgresData() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User, Group],
  });

  await dataSource.initialize();

  const userRepository = dataSource.getRepository(User);
  const groupRepository = dataSource.getRepository(Group);

  for (let i = 0; i < 100; i++) {
    const user = userRepository.create({
      firstName: postgresFaker.helpers.maybe(() => postgresFaker.person.firstName(), { probability: 0.9 }),
      lastName: postgresFaker.helpers.maybe(() => postgresFaker.person.lastName(), { probability: 0.9 }),
      email: postgresFaker.internet.email(),
      password: postgresFaker.internet.password(),
    });
    await userRepository.save(user);
  }

  for (let i = 0; i < 10; i++) {
    const group = groupRepository.create({
      name: postgresFaker.company.name(),
      description: postgresFaker.lorem.sentence(),
    });
    await groupRepository.save(group);
  }

  await dataSource.destroy();
  console.log('PostgreSQL fake data generated successfully!');
}

generateFakePostgresData();
