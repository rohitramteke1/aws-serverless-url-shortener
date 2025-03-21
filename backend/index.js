import dotenv from "dotenv";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
} from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";

dotenv.config();

const dbClient = new DynamoDBClient({
    region: process.env.AWS_REGION,
});

const dynamoDB = DynamoDBDocumentClient.from(dbClient);

class UrlShortener {
    constructor() {
        this.tableName = process.env.TABLE_NAME;
        this.baseUrl = process.env.BASE_URL;

        if (!this.baseUrl) {
            throw new Error("BASE_URL is missing in environment configuration.");
        }

        if (!this.tableName) {
            throw new Error("TABLE_NAME is missing in environment configuration.");
        }
    }

    generateShortCode = () => crypto.randomBytes(4).toString("hex").slice(0, 6);

    saveToDynamoDB = async (shortCode, longUrl) => {
        if (!this.tableName) throw new Error("TABLE_NAME is missing in .env");

        const params = new PutCommand({
            TableName: this.tableName,
            Item: { shortCode, longUrl },
        });
        await dynamoDB.send(params);
    };

    shortenUrl = async (longUrl) => {
        if (!longUrl) throw new Error("Missing longUrl");

        const shortCode = this.generateShortCode();
        await this.saveToDynamoDB(shortCode, longUrl);
        return { shortUrl: `${this.baseUrl}/${shortCode}` };
    };

    getOriginalUrl = async (shortCode) => {
        const params = new GetCommand({
            TableName: this.tableName,
            Key: { shortCode },
        });
        const result = await dynamoDB.send(params);
        return result.Item ? result.Item.longUrl : null;
    };
}

const urlShortener = new UrlShortener();

export const handler = async (event) => {
    try {
        const { path, body, httpMethod } = event;

        if (httpMethod === "POST" && path === "/shorten") {
            const parsedBody = typeof body === "string" ? JSON.parse(body) : body;
            const longUrl = parsedBody?.longUrl;
            if (!longUrl) return createResponse(400, { error: "Invalid JSON body" });

            const response = await urlShortener.shortenUrl(longUrl);
            return createResponse(201, response);
        }

        if (httpMethod === "GET" && path.match(/^\/[a-zA-Z0-9]+$/)) {
            const shortCode = path.replace("/", "");
            const originalUrl = await urlShortener.getOriginalUrl(shortCode);
            if (!originalUrl) return createResponse(404, { error: "URL not found" });

            return createResponse(301, {}, { Location: originalUrl });
        }

        return createResponse(400, { error: "Invalid request" });
    } catch (error) {
        console.error("Lambda Error:", error);
        return createResponse(500, { error: "Internal Server Error" });
    }
};

const createResponse = (statusCode, body, headers = {}) => ({
    statusCode,
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
});
