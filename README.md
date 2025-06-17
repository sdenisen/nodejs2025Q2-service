# 🏠 Home Library Service

## 📦 Prerequisites

- Git – [Download](https://git-scm.com/downloads)
- Node.js – [Download](https://nodejs.org/en/download/)
- Docker & Docker Compose – [Get Docker](https://docs.docker.com/get-docker/)

---

## 🚀 Start the Application

```bash
git clone https://github.com/sdenisen/nodejs2025Q2-service
cd nodejs2025Q2-service
git checkout dev-authentication
npm install
npm run docker:start
```

This will launch two Docker containers:
- postgres-db 
- rest-service

After start, the app will be available at:
🔗 http://localhost:4000/

## 🧪 Testing

To run all tests without authorization
```
npm run test
```

To run only one of all test suites
```
npm run test -- <path to suite>
```

To run all test with authorization
```
npm run test:auth
```


### 🧹 Code Quality

```
npm run lint      # fix lint issues
npm run format    # format code
```