import pg from 'pg'
import type { PoolClient, QueryResult, QueryResultRow } from 'pg';

type Field = {
  name: string,
  type: string,
  primary?: boolean
}

class Database {
  private static instance: Database;
  private pool: pg.Pool;

  private constructor() {
    this.pool = new pg.Pool({
      host: 'localhost',
      port: 5432,
      user: 'root',
      password: 'password',
      database: 'mydb',
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async query<T extends QueryResultRow>(text: string, params?: any[]): Promise<QueryResult<T>> {
    const client: PoolClient = await this.pool.connect();
    try {
      console.log(`[Query] - ${text} - ${params}`);
      const res: QueryResult<T> = await client.query<T>(text, params);
      return res;
    } finally {
      client.release();
    }
  }

  public create({ name, fields }: { name: string, fields: Field[] }) {
    try {
      const definition = fields.map(field => {
        let definition = `${field.name} ${field.type}`;
        if (field.primary) {
          definition += ' PRIMARY KEY';
        }
        return definition;
      });
      const query = `CREATE TABLE IF NOT EXISTS ${name} (${definition.join(', ')});`;
      this.pool.query(query);
      return true;
    } catch (err) {
      console.error('Error creating table', err);
      return false;
    }
  }

  public async insert(tableName: string, rowData: any) {
    try {
      const fields = Object.keys(rowData);
      const values = Object.values(rowData);
      const query = `
        INSERT INTO ${tableName} (${fields.join(', ')})
        VALUES (${values.map((v, i) => `$${i + 1}`).join(', ')})
        ON CONFLICT(id)
        DO UPDATE SET ${fields.map((f) => `${f} = EXCLUDED.${f}`).join(', ')};`;
      this.pool.query(query, values);
      return true;
    } catch (err) {
      console.error('Error executing query', err);
      return false;
    }
  }

  public async insertMultiple(tableName: string, rows: any[]) {
    Promise.all(rows.map((row) => {
      return this.insert(tableName, row);
    }));
  }

  public async close(): Promise<void> {
    await this.pool.end();
    Database.instance = undefined as any;
  }
}

export default Database;
