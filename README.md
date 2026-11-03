# JWT Authentication & Authorization System

A production-oriented authentication and authorization application built using **React.js, Node.js, Express.js, and MongoDB**.

This project demonstrates how to design and implement a secure JWT-based authentication system following industry-standard practices.

## 1. Project Overview

The objective is to build a complete authentication and authorization layer covering:

- User registration and login.
- Secure password hashing.
- JWT-based authentication.
- Access token and refresh token management.
- HTTP-only cookie-based refresh token storage.
- Token refresh and rotation.
- Protected API endpoints.
- Role-Based Access Control (RBAC).
- Secure logout and session management.
- Frontend authentication state management.

The implementation will prioritize security, scalability, maintainability, and clean architecture.

## 2. Technology Stack

### Frontend

| Technology        | Purpose                         |
| ----------------- | ------------------------------- |
| React.js          | UI development                  |
| Vite              | Frontend build tooling          |
| Axios             | HTTP client and API integration |
| React Context API | Authentication state management |
| React Router      | Client-side routing             |

### Backend

| Technology    | Purpose                         |
| ------------- | ------------------------------- |
| Node.js       | JavaScript runtime              |
| Express.js    | REST API framework              |
| MongoDB       | Database                        |
| Mongoose      | MongoDB object modeling         |
| bcrypt        | Password hashing                |
| jsonwebtoken  | JWT generation and verification |
| cookie-parser | Cookie parsing                  |
| cors          | Cross-origin resource sharing   |
| helmet        | HTTP security headers           |
| dotenv        | Environment configuration       |

### Development Tools

- Nodemon
- npm
- Git

## 3. High-Level Architecture

```text
                 React Application
                        |
                        |
                 Axios HTTP Client
                        |
                        |
                 Express REST API
                        |
             Authentication Middleware
                        |
             Authorization Middleware
                        |
                 Service Layer
                        |
                  Data Models
                        |
                    MongoDB
```

### Token Management Strategy

This project follows a dual-token architecture.

| Token         | Storage                 | Purpose                   |
| ------------- | ----------------------- | ------------------------- |
| Access Token  | Frontend memory         | Authenticate API requests |
| Refresh Token | HTTP-only Secure Cookie | Obtain a new access token |

**Access Token**

- Short-lived.
- Used to access protected resources.
- Sent through the Authorization header.
- Not persisted in localStorage or sessionStorage.

**Refresh Token**

- Longer-lived.
- Stored in an HTTP-only cookie.
- Rotated when used to obtain a new access token.
- Server-side session tracking supports revocation and reuse detection.

## 4. Project Structure

```text
jwt-auth-project/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── routes/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│   │
│   └── package.json
│
├── .gitignore
└── README.md
```

### Folder Responsibilities

| Folder            | Responsibility                                |
| ----------------- | --------------------------------------------- |
| config            | Database and application configuration        |
| controllers       | Handle HTTP requests and responses            |
| middleware        | Authentication, authorization, and validation |
| models            | MongoDB schemas                               |
| routes            | API endpoint definitions                      |
| services          | Business logic                                |
| utils             | Reusable helper functions                     |
| context           | Frontend authentication state                 |
| components        | Reusable UI components                        |
| pages             | Application pages                             |
| services (client) | API communication                             |
| routes (client)   | Protected and public route definitions        |

## 5. Authentication Flow

### Registration

1. User submits registration details.
2. Backend validates the input.
3. Password is hashed using bcrypt.
4. User information is stored in MongoDB.
5. Backend returns an appropriate response.

### Login

1. User submits email and password.
2. Backend validates the credentials.
3. Password is verified using bcrypt.
4. Backend generates an access token and refresh token.
5. Access token is returned to the frontend.
6. Refresh token is set as an HTTP-only cookie.
7. Frontend stores the access token in memory.

### Access Protected Resources

1. React sends an API request.
2. Axios attaches the access token.
3. Authentication middleware verifies the JWT.
4. Authorization middleware checks user permissions when required.
5. Backend returns the requested resource.

### Token Refresh

1. Access token expires.
2. Frontend requests a new access token.
3. Browser automatically sends the refresh cookie.
4. Backend validates the refresh token and associated session.
5. Backend rotates the refresh token.
6. New access token is returned.
7. Frontend retries the original failed request.

### Logout

1. Frontend sends a logout request.
2. Backend invalidates the refresh token session.
3. Refresh cookie is cleared.
4. Frontend clears the in-memory access token and authentication state.

## 6. Implementation Roadmap

The project will be implemented incrementally.

- [ ] **Phase 1 — Project Setup**

  - Initialize React using Vite.
  - Initialize Node.js and Express.
  - Configure project structure.
  - Configure environment variables.

- [ ] **Phase 2 — Database Setup**

  - Configure MongoDB connection.
  - Create User schema.
  - Define user roles and account properties.

- [ ] **Phase 3 — User Registration**

  - Registration API.
  - Input validation.
  - Password hashing.
  - Duplicate user handling.

- [ ] **Phase 4 — User Authentication**

  - Login API.
  - Credential verification.
  - Access token generation.
  - Refresh token generation.

- [ ] **Phase 5 — Token Lifecycle Management**

  - Access token verification.
  - Refresh token validation.
  - Refresh token rotation.
  - Token reuse detection.
  - Logout and session revocation.

- [ ] **Phase 6 — Backend Authorization**

  - Authentication middleware.
  - Authorization middleware.
  - Role-Based Access Control.
  - Protected API endpoints.

- [ ] **Phase 7 — React Integration**

  - Registration and login UI.
  - Authentication context.
  - Axios configuration.
  - Request and response interceptors.
  - Automatic token refresh.
  - Protected routes.

- [ ] **Phase 8 — Security Hardening**

  - XSS prevention.
  - CSRF protection.
  - CORS configuration.
  - Rate limiting.
  - Secure cookie configuration.
  - Error handling and input validation.

- [ ] **Phase 9 — Testing**

  - Authentication API tests.
  - Authorization tests.
  - Token expiration tests.
  - Refresh token rotation tests.
  - Frontend authentication tests.
  - Security scenario testing.

## 7. Security Considerations

The implementation will follow these principles:

1. Never store plaintext passwords.
2. Never store access or refresh tokens in localStorage.
3. Use HTTP-only cookies for refresh token storage.
4. Use Secure cookies in production.
5. Configure appropriate SameSite cookie policies.
6. Validate JWT signatures, expiration, issuer, and audience as applicable.
7. Use strong, independently generated secrets.
8. Implement refresh token rotation and reuse detection.
9. Apply rate limiting to authentication endpoints.
10. Validate all incoming user inputs.
11. Implement CSRF protection for cookie-authenticated endpoints where required.
12. Enforce authorization on the backend, not only in React.
13. Avoid exposing sensitive information in API responses and logs.

## 8. Environment Configuration

Backend `.env` example:

```env
PORT=5000
NODE_ENV=development

MONGODB_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

CLIENT_URL=http://localhost:5173
```

**Important:** Never commit `.env` files or production secrets to Git.

Use separate secrets for access and refresh tokens. Generate cryptographically secure random secrets.

## 9. Running the Project

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Frontend:

`http://localhost:5173`

Backend:

`http://localhost:5000`

## 10. Learning Objectives

By completing this project, the developer should be able to:

- Explain JWT structure and signature verification.
- Understand authentication versus authorization.
- Implement secure access and refresh token handling.
- Understand HTTP-only cookies and browser security.
- Design authentication middleware in Express.
- Implement RBAC in a full-stack application.
- Handle expired tokens and concurrent API requests.
- Understand XSS and CSRF attack scenarios.
- Design a maintainable authentication architecture.
- Apply production-oriented security practices.

## 11. Development Philosophy

This project is being developed incrementally with an emphasis on understanding the reasoning behind every implementation decision.

Each phase includes:

- Conceptual understanding.
- Architecture and design discussion.
- Hands-on implementation.
- Code review.
- Security review.
- Testing and validation.

**The goal is not merely to make JWT login work, but to understand how to design, implement, and maintain a secure authentication and authorization system in a real-world application.**
