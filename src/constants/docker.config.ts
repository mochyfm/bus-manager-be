import { User } from '../app/entities/user';

export const ContainerProperties = {
  address: 'localhost',
  name: 'postgres-bus-manager',
  port: '5432',
  image: 'postgres',
  password: 'password',
};

export const DataBaseConnectionConfig = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'bus_manager',
  entities: [User],
  synchronize: true,
};
