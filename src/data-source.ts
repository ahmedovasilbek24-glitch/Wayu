import 'dotenv/config';
import {DataSource} from "typeorm";

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  entities: ['./dist/**/*.entity.js'],
  migrations: ['./dist/migrations/*.js'],
  synchronize: false,
});

export default AppDataSource;