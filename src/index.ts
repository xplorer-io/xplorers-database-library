import { Client } from 'pg';

class DatabaseLibrary {
  private client: Client;

  constructor() {
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not defined');
    }

    this.client = new Client({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });
  }


  public async connect() {
    try {
      await this.client.connect();
      console.log('Connected to the database');
    } catch (error) {
      console.error('Failed to connect to the database:', error);
      throw error;
    }
  }

  /**
   * @param {string} query - SQL query string.
   * @param {any[]} params - Parameters to bind to the query.
   * @returns {Promise<any[]>} - Query result rows.
   */
  public async execute(query: string, params: any[] = []): Promise<any[]> {
    const result = await this.client.query(query, params);
    return result.rows;
  }

  /**
   * Close the database connection
   */
  public async close(): Promise<void> {
    await this.client.end();
    console.log('Database connection closed');
  }
}

export default DatabaseLibrary;
