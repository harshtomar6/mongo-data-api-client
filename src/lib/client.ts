import {
  MongoDataApiOptions,
  FindOneOptions,
  FindOptions,
  InsertOneOptions,
  InsertManyOptions,
  UpdateOptions,
} from "./client.types";

export class MongoDataApi {
  private baseUrl: string;
  private apiKey!: string;
  private database: string;
  private collection: string;
  private dataSource: string;
  private accessToken!: string;

  constructor(opts: MongoDataApiOptions) {
    if (opts.apiKey) {
      this.apiKey = opts.apiKey;
    } else if (opts.accessToken) {
      this.accessToken = opts.accessToken;
    } else {
      throw new Error(`one of apiKey or accessToken is required`);
    }

    this.database = opts.database;
    this.collection = opts.collection;
    this.dataSource = opts.dataSource;

    if (opts.apiBaseUrl) {
      this.baseUrl = opts.apiBaseUrl;
    } else if (opts.appId) {
      this.baseUrl = `https://data.mongodb-api.com/app/${opts.appId}/endpoint/data/v1`;
    } else {
      throw new Error(`one of apiBaseUrl or appId is required`);
    }
  }

  async callApi(
    endpoint: string,
    opts: { method: string; body: Record<string, any> }
  ) {
    try {
      const url = `${this.baseUrl}/${endpoint}`;
      const headers = {
        "Content-Type": "application/json",
        ...(this.accessToken
          ? { Authorization: `Bearer ${this.accessToken}` }
          : {
              "api-key": this.apiKey,
            }),
        "Access-Control-Request-Headers": "*",
      };
      const options = {
        method: opts.method,
        headers,
        body: JSON.stringify({
          collection: this.collection,
          database: this.database,
          dataSource: this.dataSource,
          ...opts.body,
        }),
      };
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          JSON.stringify({ error: data, status: response.status })
        );
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async findOne(opts: FindOneOptions) {
    const endpoint = `action/findOne`;
    return this.callApi(endpoint, { method: "POST", body: opts });
  }

  async find(opts: FindOptions) {
    const endpoint = `action/find`;
    return this.callApi(endpoint, { method: "POST", body: opts });
  }

  async insertOne(body: InsertOneOptions) {
    const endpoint = `action/insertOne`;
    return this.callApi(endpoint, { method: "POST", body });
  }

  async insertMany(body: InsertManyOptions) {
    const endpoint = `action/insertMany`;
    return this.callApi(endpoint, { method: "POST", body });
  }

  async updateOne(opts: UpdateOptions) {
    const endpoint = `action/updateOne`;
    return this.callApi(endpoint, {
      method: "POST",
      body: opts,
    });
  }

  async updateMany(opts: UpdateOptions) {
    const endpoint = `action/updateMany`;
    return this.callApi(endpoint, {
      method: "POST",
      body: opts,
    });
  }
}
