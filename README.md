# 🔗 URL Shortener API

A scalable, secure, and serverless URL Shortener built using AWS SAM, Lambda, DynamoDB, API Gateway, and modern web technologies.

---

## 🚀 Features

- **Shorten URLs:** Quickly shorten long URLs into compact, shareable links.
- **URL Redirection:** Retrieve original URLs from shortened links and redirect users automatically.
- **Serverless Backend:** Fully serverless architecture using AWS services, offering scalability and reliability.
- **API Key Security:** Secure API endpoints using API Gateway API Keys.
- **Easy Frontend Integration:** RESTful APIs make it straightforward to integrate with any frontend.
- **Comprehensive Documentation:** Easy-to-follow setup and deployment instructions.

---

## 🛠️ Technologies Used

- **Backend:**
  - AWS Lambda
  - AWS DynamoDB
  - AWS API Gateway
  - AWS SAM (Serverless Application Model)
  - Node.js

- **Frontend (Upcoming):**
  - React.js
  - Tailwind CSS
  - Axios/Fetch

- **Tools:**
  - AWS CLI
  - Docker
  - Postman / Thunder Client
  - Git & GitHub

---

## 📂 Project Structure

```sh
url-shortener/
├── backend/                # Lambda functions and backend logic
│   ├── index.js            # Lambda handler
│   ├── package.json        # Node.js dependencies
│   └── .env                # Environment variables
├── infrastructure/         # AWS SAM templates and deployment configs
│   └── template.yaml       # AWS SAM infrastructure as code
├── frontend/               # (To be added) Frontend web app
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.js
├── LICENSE                 # LICENSE
└── README.md               # Project documentation
```

---

## ⚙️ Backend Setup & Deployment

### ✅ Prerequisites

- AWS Account
- AWS CLI
- AWS SAM CLI
- Docker
- Node.js

### 📦 Installation Steps

#### 1. Clone Repository

```bash
git clone https://github.com/rohitramteke1/aws-serverless-url-shortener
cd url-shortener
```

#### 2. Backend Environment Configuration

Create `.env` inside `backend/`:

```env
TABLE_NAME=UrlTable
BASE_URL=<API_Gateway_Endpoint>
AWS_REGION=ap-south-1
```

#### 3. AWS SAM Deployment

```bash
cd infrastructure
sam build
sam deploy --guided
```

This automatically creates DynamoDB tables, Lambda functions, and API Gateway endpoints.

---
## ⚙️ Setup & Deployment

### 🚧 How to Set Environment Variables:

#### ✅ Locally:
Create or update the `.env` file in your `backend` folder:

```env
TABLE_NAME=UrlTable
BASE_URL=http://localhost:3000  # or your actual deployed API Gateway URL
AWS_REGION=ap-south-1
```

#### ✅ On AWS Lambda Console:
- Open your Lambda function in the **AWS Lambda Console**.
- Go to **Configuration → Environment variables**.
- Set the following variables explicitly:

| Key | Value |
| --- | ----- |
| TABLE_NAME | `UrlTable` |
| BASE_URL | `https://<aws-custom-url>.<region>.amazonaws.com/Prod` |
| AWS_REGION | `ap-south-1` |

---

### 🐳 Running DynamoDB Locally (Using Docker):

To run DynamoDB locally for development/testing purposes:

```bash
docker run -p 8000:8000 amazon/dynamodb-local
```

Then verify the local setup by listing tables using AWS CLI:

```bash
aws dynamodb list-tables --endpoint-url http://localhost:8000
```

## 🔑 API Gateway Security

### Creating API Keys

- AWS Console → API Gateway → API Keys → Create API Key.
- Attach API keys to usage plans to manage access.

### Creating Usage Plans

- API Gateway → Usage Plans → Create new Usage Plan.
- Attach your API Key and select your deployed stage.

### Using API Keys

Include in request headers:

```http
x-api-key: YOUR_API_KEY
```

---

## 🌐 API Endpoints

### Shorten URL

- **Endpoint:** `/shorten`
- **Method:** `POST`
- **Request Body:**

```json
{
  "longUrl": "https://example.com"
}
```

- **Response:**

```json
{
  "shortUrl": "https://your-api.com/abc123"
}
```

### Redirect URL

- **Endpoint:** `/{shortCode}`
- **Method:** `GET`
- **Behavior:** Redirects to original URL.

---

## 🖥️ Frontend Integration (Planned)

### Setup

- React.js and Tailwind CSS
- Axios for API calls

### Example Fetch Call

```js
fetch('<API_GATEWAY_ENDPOINT>/shorten', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '<YOUR_API_KEY>',
  },
  body: JSON.stringify({ longUrl: 'https://example.com' }),
})
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 📐 Testing

Use **Postman** or **Thunder Client**:

- **POST request**: `/shorten` with required headers.
- **GET request**: `/{shortCode}` should redirect.

---

## 🚩 Common Issues

- **500 Internal Server Error:** Check Lambda CloudWatch logs.
- **403 Forbidden:** Verify API Key setup.

---

## 🚀 Continuous Improvement

Future improvements include:
- Custom Domain Integration
- User Authentication
- Analytics and usage tracking

---

## 🤝 Contribution Guidelines

### Steps for Contribution

1. Fork the repository.
2. Clone your fork:
   ```bash
   git clone <your-fork-url>
   ```
3. Create your branch:
   ```bash
   git checkout -b feature/YourFeatureName
   ```
4. Commit changes:
   ```bash
   git commit -m "Added feature XYZ"
   ```
5. Push your changes:
   ```bash
   git push origin feature/YourFeatureName
   ```
6. Submit a Pull Request

---

## 📜 License

This project is licensed under the [MIT License](LICENSE) © [Your Name].


---


