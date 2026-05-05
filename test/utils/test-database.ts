import 'dotenv/config'

import {DataSource, DataSourceOptions} from "typeorm";

const TestDatabaseSourceOptions: DataSourceOptions = {
  type: "postgres",
  url: process.env.TEST_DB_URL,
  entities: ['./src/**/*.entity.ts'],
  synchronize: true,
  dropSchema: false,
  logging: false,
};

export async function createTestDataSource(): Promise<DataSource> {
  const dataSource = new DataSource(TestDatabaseSourceOptions);
  await dataSource.initialize();
  return dataSource;
}