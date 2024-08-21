import pg from 'pg';
import type { PoolClient, QueryResult, QueryResultRow } from 'pg';

type Field = {
  name: string;
  type: string;
  primary?: boolean;
  foreign?: string;
};

class Database {
  private static instance: Database;
  private pool: pg.Pool;
  private debug = false;

  private constructor() {
    this.pool = new pg.Pool({
      host: 'localhost',
      port: 5432,
      user: 'root',
      password: 'password',
      database: 'mydb',
    });
  }

  private async query<T extends QueryResultRow>(text: string, params?: any[]): Promise<QueryResult<T>> {
    const client: PoolClient = await this.pool.connect();
    try {
      if (this.debug) {
        console.log(`[Database] - Query: ${text}`);
        if (params?.length) {
          console.log(`[Database] - Params: ${params}`);
        }
      }
      const res: QueryResult<T> = await client.query<T>(text, params);
      return res;
    } finally {
      client.release();
    }
  }

  private async _insert(tableName: string, rowData: any[]) {
    try {
      const fields = Object.keys(rowData[0]);
      const values = rowData.reduce((acc, row) => {
        return acc.concat(Object.values(row));
      }, []);
      const insertValues = rowData.map((row: any, index: number) => {
        const offset = index * fields.length;
        return `(${fields.map((f, i) => `$${offset + i + 1}`).join(', ')})`;
      }).join(', ');
      const conflictValues = fields.filter(f => f !== 'id').map(f => `${f} = EXCLUDED.${f}`).join(', ');
      const query = `
        INSERT INTO ${tableName} (${fields.join(', ')})
        VALUES ${insertValues}
        ON CONFLICT(id)
        DO UPDATE SET ${conflictValues};`;
      await this.query(query, values);
      return true;
    } catch (err) {
      console.error('[Database] - Error:', err);
      return false;
    }
  }

  /**
   * Public Methods
   */
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async create({ name, fields }: { name: string; fields: Field[] }) {
    try {
      const definition = fields.map(field => {
        let definition = `${field.name} ${field.type}`;
        if (field.primary) {
          definition += ' PRIMARY KEY';
        }
        if (field.foreign) {
          definition += ` REFERENCES ${field.foreign}(id)`;
        }
        return definition;
      });
      const query = `CREATE TABLE IF NOT EXISTS ${name} (${definition.join(', ')});`;
      await this.query(query);
      return true;
    } catch (err) {
      console.error('[Database] - Error:', err);
      return false;
    }
  }

  public async insert(tableName: string, data: any) {
    try {
      // Check if we have multiple rows to insert
      const isMultiple = Array.isArray(data);
      // Force data to be a row array
      const rowData = isMultiple ? data : [data];

      // Do batches of 50 rows
      for (let i = 0; i < rowData.length; i += 50) {
        await this._insert(tableName, rowData.slice(i, i + 50));
      }
    } catch (err) {
      console.error('[Database] - Error:', err);
      return false;
    }
  }

  // Test purposes
  public async clean (): Promise<void> {
    const tables = ['paragraph', 'entry', 'book', 'author', 'annotation', 'place', 'organization', 'person', 'concept'];
    for (const table of tables) {
      if (this.debug) {
        console.warn(`[Database] - Dropping table: ${table}`);
      }
      await this.query(`DROP TABLE IF EXISTS ${table}`);
    }
  }

  public async close(): Promise<void> {
    await this.pool.end();
    Database.instance = undefined as any;
  }
}

export default Database;
