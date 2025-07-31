import * as dotenv from 'dotenv';
dotenv.config();

export default () => ({
  cassandra: {
    contactPoints: [process.env.CASSANDRA_HOST],
    localDataCenter: 'datacenter1', 
    port: parseInt(process.env.CASSANDRA_PORT || '9042', 10), // Default to 9042 if undefined
  },
});
