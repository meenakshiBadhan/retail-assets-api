# Retail Assets Management API

A Node.js/Express REST API for managing retail store device inventory and tracking. Built with Sequelize, PostgreSQL support, and JOI validations.

## Features

- Store management (create, update, list, get details)
- Expected device management (create, update, list, delete)
- Device assignment

## Tech Stack

- **Runtime**: Node.js v22.20.0
- **Framework**: Express.js
- **Database**: PostgreSQL (with Sequelize)
- **Validation**: Joi
- **CORS**: Enabled

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env` file in the root directory:

```env
NODE_ENV = 'development'
DB_PORT = '5432'
DB_HOST = localhost
DB_NAME = 'retail_assets_dev'
DB_USER = 'username'
DB_PASSWORD = ''
DB_LOGGING = true
TEST_DB_NAME = 'retail_assets_test'

# Pagination
PAGE_NUM = 1
PER_PAGE_LIMIT = 15
```

## Database Setup

```bash
# Create database
npm run db:create

# Run migrations
npm run migrate

# Seed device types
npm run seed
```

## Running the Server

```bash
npm run start
```

The APIs will be available at `http://localhost:8000`

## Testing API

A Postman collection is included: `docs/Retail Assets.postman_collection.json`

Database schema diagram: `docs/retail-assets.drawio.png`

## API Endpoints

### Stores

- `POST /api/stores` - Create a new store
- `PUT /api/stores/:id` - Update store details
- `GET /api/stores` - List all stores (paginated)
- `GET /api/stores/:id` - Get store details with device counts

### Store Expected Devices

- `GET /api/expected-devices?storeId=1` - List expected devices for a store
- `POST /api/stores/1/expected-devices` - Create expected device for a store
- `PUT /api/stores/1/expected-devices/1` - Update expected device
- `DELETE /api/stores/1/expected-devices/1` - Delete expected device

### Device Types

- `GET /api/device-types` - List all device types (paginated)

### Devices

- `POST /api/devices` - Register a new device
- `GET /api/devices` - List all devices (paginated, filterable by status)

## Key Implementation Details

### Project Architecture

The API follows a clean, layered architecture:

1. **Routes Layer**: Define API endpoints and map to controllers
2. **Controllers Layer**: Handle HTTP requests/responses and validation
3. **Services Layer**: Contain business logic and database operations
4. **Models Layer**: Define database schema and associations
5. **Validators Layer**: Request validation using Joi schemas
6. **Middleware Layer**: Custom error handling and response formatting

### Development Workflow

1. Set up environment variables
2. Create PostgreSQL database
3. Run database migrations
4. Seed initial data (device types)
5. Start development server
6. Test APIs using included Postman collection

## What I'd Improve With More Time

With additional time, I'd focus on:

1. **Authentication & Authorization**

   - JWT-based auth for stores and warehouse users
   - Role-based access control (RBAC)
   - Store-specific data isolation

2. **Audit Logging**

   - Track all user actions (create, update, delete)

3. **Store Status Automation**

   - Automated status transitions (IN_PREPARATION → IN_ROLLOUT → DELIVERED)

4. **Testing**

   - Unit tests for business logic
   - Integration tests for API endpoints
