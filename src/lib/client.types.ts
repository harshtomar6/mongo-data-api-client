export type MongoDataApiOptions = {
  database: string;
  collection: string;
  dataSource: string;
} & (
  | { appId: string; apiBaseUrl?: string }
  | { apiBaseUrl: string; appId?: string }
) &
  (
    | { apiKey: string; accessToken?: string }
    | { accessToken: string; apiKey?: string }
  );

export type FindOneOptions = {
  collection?: string;
  filter?: Record<string, any>;
  projection?: Record<string, any>;
};

export type FindOptions = FindOneOptions & {
  sort?: Record<string, any>;
  limit?: number;
  skip?: number;
};

export type InsertOneOptions = {
  collection?: string;
  document: Record<string, any>;
};

export type InsertManyOptions = {
  collection?: string;
  documents: Record<string, any>[];
};

export type UpdateOptions = {
  collection?: string;
  filter: Record<string, any>;
  update: Record<string, any>;
  upsert?: boolean;
};

export type DeleteOneOptions = {
  collection?: string;
  filter: Record<string, any>;
};
