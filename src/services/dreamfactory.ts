import { BASE_URL, API_KEY } from '../config.js';

/**
 * Service for interacting with the DreamFactory API
 */
export class DreamFactoryService {
  /**
   * Get all tables available in the database
   */
  static async getTables() {
    return this.fetchFromApi(`${BASE_URL}/_schema`);
  }

  /**
   * Get schema for a specific table
   */
  static async getTableSchema(tableName: string) {
    return this.fetchFromApi(`${BASE_URL}/_schema/${tableName}`);
  }

  /**
   * Get data from a specific table
   */
  static async getTableData(
    tableName: string,
    fields?: string[],
    filter?: string,
    offset?: number,
    limit?: number,
    order?: string,
    group?: string,
    continueProcessing?: boolean,
    related?: string,
  ) {
    const params = new URLSearchParams();
    if (fields) {
      params.append("fields", fields.join(","));
    }
    if (filter) {
      params.append("filter", filter);
    }
    if (offset) {
      params.append("offset", offset.toString());
    }
    if (limit) {
      params.append("limit", limit.toString());
    }
    if (order) {
      params.append("order", order);
    }
    if (group) {
      params.append("group", group);
    }
    if (continueProcessing) {
      params.append("continue", continueProcessing.toString());
    }
    if (related) {
      params.append("related", related);
    }
    const fieldsParam = params.toString() ? `&${params.toString()}` : '';
    console.log(`$fieldsParam`, fieldsParam);
    return this.fetchFromApi(`${BASE_URL}/_table/${tableName}?${fieldsParam}`);
  }

  /**
   * Get stored procedures available in the database
   */
  static async getStoredProcedures() {
    return this.fetchFromApi(`${BASE_URL}/_proc`);
  }

  /**
   * call a stored procedure
   */
  static async callStoredProcedure(
    procedureName: string
  ) {
    const url = `${BASE_URL}/_proc/${procedureName}`;
    return this.fetchFromApi(url);
  }

  /**
   * Get available stored functions
   */
  static async getStoredFunctions() {
    return this.fetchFromApi(`${BASE_URL}/_func`);
  }

  /**
   * Call a stored function
   */
  static async callStoredFunction(
    functionName: string,
  ) {
    const url = `${BASE_URL}/_func/${functionName}`;
    return this.fetchFromApi(url);
  }

  /**
   * Helper method to handle API requests
   */
  private static async fetchFromApi(url: string, options: RequestInit = {}) {
    const defaultOptions = {
      method: "GET",
      headers: {
        "X-DreamFactory-Api-Key": "" + API_KEY,
        ...options.headers,
      },
    };

    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    
    return response.json();
  }
}