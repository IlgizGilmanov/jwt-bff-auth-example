
interface Config {
  DB_HOST: string,
  DB_PORT: number | string,
  DB_USERNAME: string,
  DB_NAME: string,
  DB_PASSWORD: string,
};

const config: Config = {
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 5432,
  DB_USERNAME: process.env.DB_USERNAME || '', //
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'postgres',
};

export default config;
