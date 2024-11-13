import { Client } from 'pg';

interface DBConfig{
  url: string;
  user: string;
  password: string;
}
class DatabaseLibrary {
  private clientConfig: DBConfig;

  constructor(config: DBConfig) {
    if (!config || !config.url || !config.user || !config.password) {
      throw new Error('Database configuration is required and must include url, user, and password');
    }

    this.clientConfig = config;
  }

  private createClient(): Client {
    const connectionString = `postgres://${this.clientConfig.user}:${(this.clientConfig.password)}@${this.clientConfig.url}`;
    return new Client({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });
  }


  /**
   * @param {string} query - SQL query string.
   * @param {any[]} params - Parameters to bind to the query.
   * @returns {Promise<any[]>} - Query result rows.
   */
  public async execute(query: string, params: any[] = []): Promise<any[]> {
    const client =  this.createClient();
    try{
      await client.connect()
      const result = await client.query(query, params);
      return result.rows;
    }
    catch (error){
      console.error('Query Execution Failed:', error);
      throw error;
    }
    finally{
      await client.end();
      console.log('Database connection closed');
    }
  }

}

export default DatabaseLibrary;
