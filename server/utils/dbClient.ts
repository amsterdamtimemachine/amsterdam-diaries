import pg from 'pg';

let client: pg.Client;

export const getClient = () => {
  if (!client) {
    // TODO: Use environment variables for configuration
    client = new pg.Client({
      user: 'root',
      host: 'localhost',
      database: 'mydb',
      password: 'password',
      port: 5432,
    });

    client.connect().catch(err => {
      console.error('Database connection error:', err.stack);
    });
  }
  return client;
};
