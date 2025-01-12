import { DataSource } from 'typeorm';

export const createDBIfNotExists = async (): Promise<void> => {
  const dataSource = new DataSource({
    type: 'postgres',
    database: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    synchronize: true,
  });

  await dataSource.initialize();

  const result = await dataSource.query(
    `SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_NAME}'`,
  );

  console.log(process.env.DB_USER);
  console.log(process.env.DB_USERNAME);
  console.log(process.env.DB_PASSWORD);

  if (!result.length) {
    console.log(`Creating database with name "${process.env.DB_NAME}"`);

    await dataSource.query(`CREATE DATABASE "${process.env.DB_NAME}"`);
    await dataSource.query(
      `ALTER DATABASE ${process.env.DB_NAME} OWNER TO postgres`,
    );
  }

  await dataSource.destroy();
};
