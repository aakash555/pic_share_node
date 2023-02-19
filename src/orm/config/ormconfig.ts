import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { Photo } from 'orm/entities/Photo';
import { User } from 'orm/entities/User';

const config: ConnectionOptions = {
  type: 'postgres',
  name: 'default',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'picshare',
  // For Production, Keep synchronize to false and drive it with migrations
  synchronize: true,
  logging: false,
  entities: [Photo, User],
  cli: {
    entitiesDir: 'src/orm/entities',
  },
  namingStrategy: new SnakeNamingStrategy(),
};

export = config;
