# 🚀 Backend Setup & Deployment

This backend powers the URL shortening logic via AWS Lambda, DynamoDB, and API Gateway using AWS SAM.

---

## ✅ Prerequisites

- AWS Account
- AWS CLI configured (`aws configure`)
- AWS SAM CLI installed
- Docker installed (for local build/emulation)
- Node.js and npm

---

## 📦 Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/rohitramteke1/aws-serverless-url-shortener
cd url-shortener
```

---

### 2. Backend Environment Configuration

Create a `.env` file in the `backend/` directory:

```env
TABLE_NAME=UrlTable
BASE_URL=https://<api-id>.execute-api.ap-south-1.amazonaws.com/Prod
AWS_REGION=ap-south-1
```

---

### 3. Directory Structure

```bash
backend/
├── index.js          # Lambda function handler
├── utils.js          # Helper utilities
├── package.json
├── .env
└── node_modules/
```

---

### 4. Deploying with AWS SAM

```bash
cd infrastructure
sam build
sam deploy --guided
```

This will:
- Package Lambda code
- Create DynamoDB table
- Deploy to API Gateway
- Ask you to configure stack name, region, S3 bucket

---

## 🧠 How It Works

- `POST /shorten`: Saves a long URL with a generated short code
- `GET /{shortCode}`: Retrieves the long URL from DynamoDB and redirects

---

## 🔑 API Gateway Security

- Uses **x-api-key** header
- API keys are attached via usage plans
- Optional: enable throttling and rate limiting

---

## 🔗 API Endpoints

### POST `/shorten`

Request:
```json
{
  "longUrl": "https://example.com"
}
```

Response:
```json
{
  "shortUrl": "https://your-api.com/abc123"
}
```

### GET `/{shortCode}`

Redirects to original URL.

---

## ⚙️ Local Development with SAM

Run locally:
```bash
sam local start-api
```

Test using Postman or cURL:
```bash
curl http://localhost:3000/shorten   -X POST   -H "x-api-key: test-key"   -d '{"longUrl": "https://example.com"}'
```

---

## 📐 Testing & Debugging

### Logs:
```bash
sam logs -n UrlFunction --stack-name my-stack-name --tail
```

### Testing with Postman:
- `POST /shorten`
- `GET /{shortCode}`

---

## 🚩 Troubleshooting

| Problem                | Solution |
|------------------------|----------|
| 403 Forbidden          | API Key not provided |
| 500 Internal Server Error | Check CloudWatch Logs |
| Table not found        | Check if `TABLE_NAME` is correct |
| Timeout error          | Increase Lambda timeout in `template.yaml` |

---

## ✅ Future Enhancements

- Short link expiration
- Custom alias support
- Auth integration (OAuth or Cognito)
- Analytics: clicks, geolocation, device info

---
