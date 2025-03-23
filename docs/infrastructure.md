# 🛠 Infrastructure with AWS SAM

---

## 📁 Files & Structure

```bash
infrastructure/
├── template.yaml         # Main SAM template
├── samconfig.toml        # Deployment configs
```

---

## 🧾 template.yaml Breakdown

```yaml
Resources:
  UrlFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.handler
      Runtime: nodejs18.x
      CodeUri: ../backend
      MemorySize: 128
      Timeout: 5
      Environment:
        Variables:
          TABLE_NAME: UrlTable
          BASE_URL: https://your-api.com
          AWS_REGION: ap-south-1
      Events:
        Shorten:
          Type: Api
          Properties:
            Path: /shorten
            Method: POST
        Redirect:
          Type: Api
          Properties:
            Path: /{shortCode}
            Method: GET

  UrlTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: UrlTable
      BillingMode: PAY_PER_REQUEST
      AttributeDefinitions:
        - AttributeName: shortCode
          AttributeType: S
      KeySchema:
        - AttributeName: shortCode
          KeyType: HASH
```

---

## 🏗️ Deployment

```bash
cd infrastructure
sam build
sam deploy --guided
```

> First time deploy will ask for:
> - Stack name
> - Region
> - S3 bucket (for packaging)

---

## 🔍 Validate Template

```bash
sam validate
```

---

## 🔁 Update Stack

```bash
sam deploy
```

---

## 🧪 Test Locally

```bash
sam local start-api
```

---

## 📊 Monitoring

Use CloudWatch Logs:
```bash
sam logs -n UrlFunction --tail
```

---

## 🧠 Tips

- Enable versioning in S3
- Use parameters for table name, region
- Add usage plan and throttling to API Gateway

---
