# Contact Management System API

This is a Contact Management System API built with Next.js and MySQL, featuring user authentication, data validation, and secure data handling. The API includes CRUD operations for managing contacts and provides advanced functionality such as file handling and time zone conversions.

---

## Features

1. **User Authentication**
   - JWT-based user registration and login.
   - Email verification upon registration.
   - Password reset functionality via one-time code.

2. **Data Validation**
   - Validates user inputs (e.g., registration and contact details) using `yup`.
   - Enforces unique email constraints in both `users` and `contacts` tables.

3. **Database Setup**
   - MySQL database with a normalized schema.
   - Separate tables for `users` and `contacts`, with relationships as needed.
   - `is_verified` column implemented as a `TINYINT` in the `users` table with a default value of `0`.

4. **Security**
   - Password hashing using a secure hashing algorithm.
   - Rate limiting on sensitive endpoints (e.g., login and registration) to prevent abuse.
   - Proper error handling for expired or invalid JWT tokens.

## Requirements Checklist

- [x] **User Authentication**
  - Implemented user registration, login, email verification, and password reset.
- [x] **Data Validation**
  - All endpoints validate inputs with `yup` to ensure data integrity.
- [x] **Database Setup**
  - MySQL database set up with normalized schema, migrations, and relationships.
- [x] **Security**
  - Password hashing and rate limiting in place for secure and scalable usage.
- [ ] **Contact Management**
  - Create, update, retrieve, and delete contact endpoints (in progress).
- [ ] **Date-Time Handling**
  - Store timestamps in UTC and convert them to user-specified time zones.
- [ ] **File Handling**
  - Bulk contact creation and updates via CSV/Excel upload.
  - Download all contacts as CSV/Excel with creation dates and time zones.
- [ ] **Deployment**
  - Deploy API on a platform like Heroku, Vercel, or Render.

## Challenges

1. **Email Verification Not Updating in Database**  
   A major challenge I encountered was getting the `is_verified` field to update correctly in the database upon email verification. While I set up the email verification flow with JWT, ensuring the token decoded correctly and then updating the database was unexpectedly complex. Debugging involved tracing the asynchronous API calls, adjusting the SQL update query, and carefully testing each step of the JWT verification.

2. **Learning Next.js from Scratch**  
   Since Next.js was new to me, I had to learn its unique structure and conventions. Understanding Next.js API routes, data fetching methods, and server-side versus client-side handling was initially confusing. However, working through the documentation and applying concepts directly in this project helped me develop a solid foundation.


## Installation
   **Clone the repository:**

```
    git clone <repository-url>
    cd <repository-folder>
```



**Install dependencies:**
```
    npm install
```

Set up MySQL database and update .env.local file with your database credentials.

**Run database migrations (if applicable):**
```
    npm run migrate
```
**Start the development server**

```
    npm run dev
```

