import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { Photo } from 'orm/entities/Photo';
import { User } from 'orm/entities/User';

const config: ConnectionOptions = {
  type: 'postgres',
  name: 'default',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
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
