# RFQ Marketplace

A mini B2B Request for Quotation (RFQ) marketplace where buyers can post business requirements and suppliers can discover RFQs and submit quotations.

## Overview

The RFQ Marketplace provides two user roles:

- **Buyer** — Creates and manages RFQs and reviews supplier quotations.
- **Supplier** — Browses available RFQs and submits quotations.

The application includes authentication, role-based authorization, validation, persistent PostgreSQL storage, REST APIs, and a responsive React frontend.

---

## Features

### Authentication & Authorization

- User registration and login
- JWT-based authentication
- Password hashing using bcrypt
- Role-based authorization
- Buyer and Supplier roles
- Protected frontend routes
- Backend authorization middleware

### Buyer

- Create RFQs
- Edit RFQs
- Delete RFQs
- View own RFQs
- View quotations submitted for an RFQ
- Manage business requirements

### Supplier

- Browse available RFQs
- Search RFQs
- Filter RFQs by delivery location
- View RFQ details
- Submit quotations
- View submitted quotations
- Prevent duplicate quotations for the same RFQ

### Validation & Error Handling

- Request validation using Zod
- Frontend form validation
- Authentication error handling
- Authorization checks
- Ownership checks
- Duplicate quotation prevention
- Standard HTTP status codes
- Loading, empty, and error states in the frontend

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- JavaScript
- JWT
- bcrypt
- Zod

### Database

- PostgreSQL
- Prisma ORM

### Development & Deployment

- Git
- GitHub
- Supabase PostgreSQL
- Render

---

## Architecture

```text
                    ┌──────────────────────┐
                    │      React UI        │
                    │      Vite App        │
                    └──────────┬───────────┘
                               │
                         HTTP / JSON
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Express.js API    │
                    ├──────────────────────┤
                    │ Routes               │
                    │ Middleware           │
                    │ Validation           │
                    │ Controllers           │
                    │ Services              │
                    └──────────┬───────────┘
                               │
                             Prisma
                               │
                               ▼
                    ┌──────────────────────┐
                    │     PostgreSQL       │
                    │      Database        │
                    └──────────────────────┘






Request Flow

React
  ↓
Axios
  ↓
Express Route
  ↓
Authentication / Authorization
  ↓
Zod Validation
  ↓
Controller
  ↓
Service
  ↓
Prisma
  ↓
PostgreSQL





User Roles

Buyer
A buyer can:
- Register and login
- Create an RFQ
- Edit an RFQ
- Delete an RFQ
- View their RFQs
- View quotations submitted by suppliers

Supplier
A supplier can:
- Register and login
- Browse active RFQs
- Search and filter RFQs
- View RFQ details
- Submit a quotation
- View their submitted quotations

RFQ Fields
Each RFQ contains:
- Product / Service name
- Description
- Quantity
- Delivery location
- Deadline
- Buyer
- Creation timestamp
- Last updated timestamp

Quotation Fields
Each quotation contains:
- RFQ
- Supplier
- Quoted price
- Estimated delivery time
- Message / notes
- Creation timestamp
- Last updated timestamp

A supplier can submit only one quotation for a particular RFQ.






Database Schema

User

User
├── id
├── name
├── email
├── password
├── role
├── createdAt
└── updatedAt

RFQ

RFQ
├── id
├── buyerId
├── productName
├── description
├── quantity
├── deliveryLocation
├── deadline
├── createdAt
└── updatedAt

Quotation

Quotation
├── id
├── rfqId
├── supplierId
├── quotedPrice
├── estimatedDeliveryTime
├── message
├── createdAt
└── updatedAt

Relationships

User (Buyer)
    │
    └── has many RFQs

RFQ
    │
    └── has many Quotations

User (Supplier)
    │
    └── has many Quotations






API Endpoints

Authentication

Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login user


RFQs

Method	Endpoint	Description
POST	/api/rfqs	Create an RFQ
GET	/api/rfqs	Browse active RFQs
GET	/api/rfqs/my	Get buyer's RFQs
GET	/api/rfqs/:id	Get RFQ details
PUT	/api/rfqs/:id	Update an RFQ
DELETE	/api/rfqs/:id	Delete an RFQ


Quotations

Method	Endpoint	Description
POST	/api/rfqs/:id/quotations	Submit quotation
GET	/api/quotations/my	Get supplier's quotations
GET	/api/rfqs/:id/quotations	Get quotations for an RFQ


Health Check

Method	Endpoint	Description
GET	/api/health	Check API availability




Project Structure

rfq-marketplace/
│
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validators/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md




Environment Variables

Backend

Create a .env file inside the backend directory:
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
PORT=5000

Frontend

Create a .env file inside the frontend directory:
VITE_API_URL=http://localhost:5000/api

Environment files containing secrets are excluded from Git using .gitignore.

Local Setup
1. Clone the Repository
git clone https://github.com/Rahul-Biradar-09/rfq-marketplace.git
cd rfq-marketplace

2. Setup Backend
cd backend
npm install

Create the backend .env file and configure the required environment variables.

Generate the Prisma client:
npx prisma generate

Run database migrations:
npx prisma migrate deploy

Start the backend:
npm run dev

The backend runs on:
http://localhost:5000

3. Setup Frontend
Open another terminal:
cd frontend
npm install

Create the frontend .env file:
VITE_API_URL=http://localhost:5000/api

Start the frontend:
npm run dev

The frontend runs on:
http://localhost:5173

Business Rules
- Only authenticated users can access protected functionality.
- Buyers can create, update, and delete their own RFQs.
- Buyers cannot modify another buyer's RFQ.
- Suppliers can browse RFQs but cannot create or modify them.
- Only suppliers can submit quotations.
- A supplier can submit only one quotation for an RFQ.
- Quotations cannot be submitted for expired RFQs.
- RFQ deadlines must be in the future when creating or updating an RFQ.
- User IDs are obtained from the authenticated JWT rather than trusted from frontend input.
- Passwords are stored using bcrypt hashing rather than plaintext.

Validation

The backend uses Zod for request validation.
Examples of validation rules include:
- Valid email format
- Password minimum length
- Valid user role
- RFQ product/service name requirements
- Positive RFQ quantity
- Required delivery location
- Future RFQ deadline
- Positive quotation price
- Required estimated delivery time
- Message length limits

Error Handling
The API uses standard HTTP status codes including:
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
500 Internal Server Error

The frontend provides:
- Loading states
- Empty states
- API error messages
- Form validation messages
- Authentication handling

Security Considerations
- JWT authentication
- bcrypt password hashing
- Role-based authorization
- Ownership verification
- Server-side validation
- Protected API routes
- Environment variables for secrets
- CORS configuration
- Unique database constraint for duplicate quotations

Deployment
The application is designed to use:
Frontend  → Render Static Site
Backend   → Render Web Service
Database  → Supabase PostgreSQL

The production backend uses the Supabase PostgreSQL connection through Prisma.
Production environment variables are configured through the hosting platform rather than committed to the repository.

Assumptions
- An RFQ remains available to suppliers while its deadline has not passed.
- A supplier can submit at most one quotation per RFQ.
- Buyers can view quotations submitted for their own RFQs.
- Suppliers cannot modify RFQs.
- Authentication and authorization are enforced on the backend even when frontend routes are protected.
- PostgreSQL is the persistent data store.

Future Improvements
Possible future enhancements include:

- Pagination for large RFQ lists
- Advanced RFQ filtering
- Sorting by deadline or creation date
- Email notifications
- Supplier profiles
- Buyer/supplier ratings
- File attachments
- Quotation status management
- Admin dashboard
- Real-time notifications
