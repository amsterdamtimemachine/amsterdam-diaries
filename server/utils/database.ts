import mariadb from 'mariadb';

type Field = {
  name: string;
  type: string;
  primary?: boolean;
  foreign?: string;
};

class Database {
  private static instance: Database;
  private pool: mariadb.Pool;
  private debug = false;

  private fetchConfig() {
    if (typeof useRuntimeConfig === 'function') {
      return useRuntimeConfig();
    } else {
      // Fallback to directly accesing the environment variables
      return {
        dbHost: process.env.NUXT_DB_HOST,
        dbPort: process.env.NUXT_DB_PORT,
        dbUser: process.env.NUXT_DB_USER,
        dbPass: process.env.NUXT_DB_PASS,
        dbName: process.env.NUXT_DB_NAME,
      };
    }
  }

  private constructor() {
    const config = this.fetchConfig();
    this.pool = mariadb.createPool({
      host: config.dbHost,
      port: config.dbPort ? parseInt(config.dbPort) : 3306,
      user: config.dbUser,
      password: config.dbPass,
      database: config.dbName,
      connectionLimit: 5,
    });
  }

  private async _insert(tableName: string, rowData: any[]) {
    try {
      const fields = Object.keys(rowData[0]);
      const values = rowData.reduce((acc, row) => {
        return acc.concat(Object.values(row));
      }, []);
      const insertValues = rowData
        .map(() => {
          return `(${fields.map(() => `?`).join(', ')})`;
        })
        .join(', ');
      const conflictValues = fields
        .filter(f => f !== 'id')
        .map(f => `${f} = VALUES(${f})`)
        .join(', ');
      const query = `
        INSERT INTO ${tableName} (${fields.join(', ')})
        VALUES ${insertValues}
        ON DUPLICATE KEY UPDATE ${conflictValues};`;
      await this.query(query, values);
    } catch (err) {
      console.error('[Database] - Error:', err);
      console.error(`TableName: ${tableName}`);
      console.error(`RowData: ${rowData}`);
      throw new Error('Something went wrong');
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
    } catch (err) {
      console.error('[Database] - Error:', err);
      console.error(`Name: ${name}`);
      console.error(`Fields: ${fields}`);
      throw new Error('Something went wrong');
    }
  }

  public async query(text: string, params?: any[]): Promise<any[]> {
    let connection: mariadb.Connection | undefined;

    try {
      connection = await this.pool.getConnection();
      if (this.debug) {
        console.log(`[Database] - Query: ${text}`);
        if (params?.length) {
          console.log(`[Database] - Params: ${params}`);
        }
      }
      const res = await connection.query(text, params);
      return res;
    } catch (err) {
      console.error('[Database] - Error:', err);
      console.error(`query: ${text}`);
      console.error(`params: ${params}`);
      throw new Error('Something went wrong');
    } finally {
      if (connection) {
        connection.end();
      }
    }
  }

  public async delete(tableName: string) {
    try {
      await this.query(`DROP TABLE IF EXISTS ${tableName};`);
    } catch (err) {
      console.error('[Database] - Error:', err);
      console.error(`TableName: ${tableName}`);
      throw new Error('Something went wrong');
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
      console.error(`TableName: ${tableName}`);
      console.error(`Data: ${data}`);
      throw new Error('Something went wrong');
    }
  }

  public async close(): Promise<void> {
    await this.pool.end();
    Database.instance = undefined as any;
  }
}

export default Database;
