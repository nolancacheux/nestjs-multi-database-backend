import neo4j, { Driver } from 'neo4j-driver';
import { ConfigService } from '@nestjs/config';

export const Neo4jProvider = [
  {
    provide: 'NEO4J_DRIVER',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<Driver> => {
      const driver = neo4j.driver(
        `bolt://${configService.get('neo4j.host')}:${configService.get('neo4j.port')}`,
        neo4j.auth.basic(
          configService.get('neo4j.username') || (() => { throw new Error('neo4j.username is not defined'); })(),
          configService.get('neo4j.password') || (() => { throw new Error('neo4j.password is not defined'); })(),
        ),
        { disableLosslessIntegers: true },
      );

      // Test connection
      await driver.verifyConnectivity();
      return driver;
    },
  },
];
