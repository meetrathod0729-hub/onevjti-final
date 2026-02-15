# API Contract — User & Authentication Service

## Base Url
```bash
/api/v1/users
```
## Common Response Shape (json)
```json
{
    "statusCode" : 201,
    "data" : {},
    "message" : "string",
    "success" : true
}
```
## Auth Header (where required)
```bash
Authorization: Bearer <ACCESS_TOKEN>
```

## Authentication Flow Summary

Access Token → short-lived (used in headers)

Refresh Token → long-lived (stored securely, often in HTTP-only cookie)

Logout invalidates refresh token

---
## 1. Register User

### Endpoint
POST /register

### Auth Required
No

### Content-Type
multipart/form-data

### Body (Form Data)
| Field      | Type          | Required |
|------------|---------------|----------|
| fullName   | string        | true     |
| username   | string        | true     |
| email      | string        | true     |
| password   | string        | true     |
| department | string        | true     |
| year       | string        | true     |
| avatar     | file (image)  | false    |

### Success Response (201)
```json
{
  "statusCode": 201,
  "data": {
    "_id": "696379b43234f9f86caf08fc",
    "username": "jdeo",
    "email": "johndoe@vjti.com",
    "fullName": "john doe",
    "avatar": "",
    "department": "textile",
    "year": "last",
    "createdAt": "2026-01-11T10:21:40.510Z",
    "updatedAt": "2026-01-11T10:21:40.510Z",
    "__v": 0
  },
  "message": "User registered successfully!",
  "success": true
}
```

### Error Responses
400 → Missing fields

409 → User already exists

500 → Internal Error


## 2. Login User

### Endpoint
POST /login

### Auth Required
No

### Body (JSON)
```json
{
    "email": "aa@kam.com",
    "password": "1234",
    "username": "aashaykk"
}
```

### Success Response (200)
```json
{
    "statusCode": 200,
    "data": {
        "user": {
            "_id": "6962b63121cd661955dba833",
            "username": "aashaykk",
            "email": "aa@kam.com",
            "fullName": "aashay",
            "avatar": "",
            "department": "IT",
            "year": "secondd",
            "createdAt": "2026-01-10T20:27:29.149Z",
            "updatedAt": "2026-01-11T10:49:17.567Z",
            "__v": 0
        },
        "accessToken": "eyJhbGciOiJIUzI1...",
        "refreshToken": "eyJhbGciOiJIUzI1N..."
    },
    "message": "User logged In successfully!",
    "success": true
}
```

### Error Responses
400 → Missing fields

404 → User does not exist

401 → Invalid User Credentials

## 3. Logout User

### Endpoint
POST /logout

### Auth Required
Yes

### Success Response (200)
```json
{
    "statusCode": 200,
    "data": {},
    "message": "User Logged Out",
    "success": true
}
```
## 4. Refresh Access Token

### Endpoint
POST /refresh-token

### Auth Required
No

### Success Response (200)
```json
{
    "statusCode": 200,
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1N..."
    },
    "message": "Access token refreshed",
    "success": true
}
```
## 5. Get Current User

### Endpoint
GET /current-user

### Auth Required
Yes

### Success Response (200)
```json
{
    "statusCode": 200,
    "data": {
        "_id": "6962b63121cd661955dba833",
        "username": "aashaykk",
        "email": "aa@kam.com",
        "fullName": "aashay",
        "avatar": "",
        "department": "IT",
        "year": "secondd",
        "createdAt": "2026-01-10T20:27:29.149Z",
        "updatedAt": "2026-01-11T10:59:48.657Z",
        "__v": 0
    },
    "message": "User fetched successfully!",
    "success": true
}
```
## 6. Update Account Details

### Endpoint
PATCH /update-account

### Auth Required
Yes

### Body (JSON)
```json
{
    "email" : "aa@kam.go",
    "year" : "third",
    "department": "tronics",
    "fullName": "kamble"
}
```

### Success Response (200)
```json
{
    "statusCode": 200,
    "data": {},
    "message": "Account details updated successfully",
    "success": true
}
```