"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDataApi = void 0;
class MongoDataApi {
    constructor(opts) {
        this.apiKey = opts.apiKey;
        this.database = opts.database;
        this.collection = opts.collection;
        this.dataSource = opts.dataSource;
        if (opts.apiBaseUrl) {
            this.baseUrl = opts.apiBaseUrl;
        }
        else if (opts.appId) {
            this.baseUrl = `https://data.mongodb-api.com/app/${opts.appId}/endpoint/data/v1`;
        }
        else {
            throw new Error(`one of apiBaseUrl or appId is required`);
        }
    }
    callApi(endpoint, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `${this.baseUrl}/${endpoint}`;
                const headers = {
                    "Content-Type": "application/json",
                    "api-key": this.apiKey,
                    "Access-Control-Request-Headers": "*",
                };
                const options = {
                    method: opts.method,
                    headers,
                    body: JSON.stringify(Object.assign({ collection: this.collection, database: this.database, dataSource: this.dataSource }, opts.body)),
                };
                const response = yield fetch(url, options);
                const data = yield response.json();
                if (!response.ok) {
                    throw new Error(JSON.stringify({ error: data, status: response.status }));
                }
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findOne(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `action/findOne`;
            return this.callApi(endpoint, { method: "POST", body: opts });
        });
    }
    find(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `action/find`;
            return this.callApi(endpoint, { method: "POST", body: opts });
        });
    }
    insertOne(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `action/insertOne`;
            return this.callApi(endpoint, { method: "POST", body });
        });
    }
    insertMany(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `action/insertMany`;
            return this.callApi(endpoint, { method: "POST", body });
        });
    }
    updateOne(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `action/updateOne`;
            return this.callApi(endpoint, {
                method: "POST",
                body: opts,
            });
        });
    }
    updateMany(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `action/updateMany`;
            return this.callApi(endpoint, {
                method: "POST",
                body: opts,
            });
        });
    }
}
exports.MongoDataApi = MongoDataApi;
