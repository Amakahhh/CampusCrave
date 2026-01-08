# CampusCrave API Documentation

**Base URL**: `http://localhost:5000/api` (development)

---

## Authentication Endpoints

### Request OTP
```http
POST /auth/otp/request
Content-Type: application/json

{
  "phone": "+2348012345678"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "phone": "+2348012345678",
  "otp": "123456" // Only in development mode
}
```

---

### Verify OTP & Login
```http
POST /auth/otp/verify
Content-Type: application/json

{
  "phone": "+2348012345678",
  "otp": "123456",
  "name": "John Doe",
  "hostel": "Vendome",
  "room": "201B",
  "matricNumber": "2023/12345",
  "isWaiter": false,
  "bankDetails": {
    "accountNumber": "1234567890",
    "accountName": "John Doe",
    "bankCode": "011"
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clq1v3j4p0000qz088g8g8g8g",
    "phone": "+2348012345678",
    "name": "John Doe",
    "hostel": "Vendome",
    "room": "201B",
    "matricNumber": "2023/12345",
    "isWaiter": false
  }
}
```

---

### Get User Profile
```http
GET /auth/profile
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "id": "clq1v3j4p0000qz088g8g8g8g",
  "phone": "+2348012345678",
  "name": "John Doe",
  "hostel": "Vendome",
  "room": "201B",
  "matricNumber": "2023/12345",
  "isWaiter": false,
  "createdAt": "2025-12-22T10:30:00Z",
  "waiterWallet": null
}
```

---

### Update User Profile
```http
PUT /auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Updated",
  "hostel": "East Campus",
  "room": "105A"
}
```

**Response (200):** Updated user object

---

## Vendor Endpoints

### Get All Vendors
```http
GET /vendors
```

**Optional Query Parameters:**
- `hall` - Filter by hall (Canteen, Vendome, East Campus)

**Response (200):**
```json
[
  {
    "id": "vendor1",
    "name": "Mama T's Kitchen",
    "hall": "Canteen",
    "contact": "08012345678",
    "imageUrl": "https://...",
    "menuItems": [
      {
        "id": "item1",
        "name": "Jollof Rice & Chicken",
        "description": "Delicious jollof with grilled chicken",
        "price": 2500,
        "imageUrl": "https://...",
        "category": "Main Courses",
        "available": true
      }
    ]
  }
]
```

---

### Get Vendor Halls
```http
GET /vendors/halls
```

**Response (200):**
```json
{
  "halls": [
    "Canteen",
    "East Campus",
    "Vendome"
  ]
}
```

---

### Get Vendor Details
```http
GET /vendors/:id
```

**Response (200):**
```json
{
  "id": "vendor1",
  "name": "Mama T's Kitchen",
  "hall": "Canteen",
  "contact": "08012345678",
  "imageUrl": "https://...",
  "menuItems": [
    // Array of menu items
  ]
}
```

---

### Get Vendor Menu (Grouped by Category)
```http
GET /vendors/:id/menu
```

**Response (200):**
```json
{
  "vendor": {
    "id": "vendor1",
    "name": "Mama T's Kitchen",
    "hall": "Canteen",
    "contact": "08012345678",
    "imageUrl": "https://..."
  },
  "categories": {
    "Main Courses": [
      {
        "id": "item1",
        "name": "Jollof Rice & Chicken",
        "price": 2500,
        "description": "...",
        "imageUrl": "https://..."
      }
    ],
    "Sides": [
      // More items
    ]
  }
}
```

---

## Order Endpoints

### Create Order
```http
POST /orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "vendorId": "vendor1",
  "items": [
    {
      "menuItemId": "item1",
      "quantity": 2
    },
    {
      "menuItemId": "item2",
      "quantity": 1
    }
  ],
  "deliveryAddress": {
    "hostel": "Vendome",
    "room": "201B"
  },
  "notes": "Extra pepper please"
}
```

**Response (201):**
```json
{
  "orderId": "order123",
  "amount": 7020,
  "reference": "CAMPUS_ORDER123"
}
```

---

### Get My Orders
```http
GET /orders
Authorization: Bearer {token}
```

**Optional Query Parameters:**
- `status` - Filter by status (PENDING, CONFIRMED, ASSIGNED, DELIVERED, etc.)

**Response (200):**
```json
[
  {
    "id": "order123",
    "userId": "user1",
    "vendorId": "vendor1",
    "status": "DELIVERED",
    "subtotal": 5000,
    "deliveryFee": 500,
    "gatewayFee": 20,
    "total": 5520,
    "createdAt": "2025-12-22T10:30:00Z",
    "vendor": {
      "id": "vendor1",
      "name": "Mama T's Kitchen",
      "hall": "Canteen"
    },
    "items": [
      {
        "id": "oi1",
        "quantity": 2,
        "price": 2500,
        "menuItem": { /* menu item details */ }
      }
    ],
    "rating": {
      "id": "rating1",
      "rating": 5,
      "comment": "Excellent service!"
    }
  }
]
```

---

### Get Order Details
```http
GET /orders/:id
Authorization: Bearer {token}
```

**Response (200):** Single order object (same as above)

---

### Get Available Orders (For Waiters to Claim)
```http
GET /orders/available
```

**Optional Query Parameters:**
- `vendorHall` - Filter by vendor location (Canteen, Vendome, East Campus)
- `deliveryHall` - Filter by delivery hall (hostel name)

**Example:**
```
GET /orders/available?vendorHall=Canteen&deliveryHall=Vendome
```

**Response (200):**
```json
[
  {
    "id": "order123",
    "status": "CONFIRMED",
    "vendor": {
      "id": "vendor1",
      "name": "Mama T's Kitchen",
      "hall": "Canteen"
    },
    "user": {
      "id": "user1",
      "name": "John Doe",
      "phone": "+2348012345678"
    },
    "deliveryAddress": {
      "hostel": "Vendome",
      "room": "201B"
    },
    "total": 5520,
    "expectedWaiterFee": 400,
    "items": [
      // Menu items in order
    ],
    "createdAt": "2025-12-22T10:30:00Z"
  }
]
```

---

### Claim Order (Waiter)
```http
POST /orders/:id/claim
Authorization: Bearer {token}
```

**Requirements:**
- User must be a waiter (`isWaiter: true`)
- Order status must be `CONFIRMED`

**Response (200):**
```json
{
  "id": "order123",
  "status": "ASSIGNED",
  "assignedWaiterId": "waiter1",
  "vendor": {
    "name": "Mama T's Kitchen",
    "hall": "Canteen"
  },
  "user": {
    "name": "John Doe",
    "hostel": "Vendome",
    "room": "201B"
  }
}
```

**Errors:**
- `409` - Order already claimed
- `403` - User is not a waiter

---

### Update Order Status (Waiter)
```http
POST /orders/:id/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "COLLECTED"
}
```

**Valid Status Progression:**
1. `ASSIGNED` - Initial state after claiming
2. `COLLECTED` - Picked up from vendor
3. `ON_THE_WAY` - Heading to delivery location
4. `DELIVERED` - Delivered to customer (waiter gets ₦400 credited)

**Response (200):**
```json
{
  "id": "order123",
  "status": "DELIVERED",
  "deliveredAt": "2025-12-22T10:45:00Z",
  "items": [
    // Order items
  ]
}
```

---

### Get Waiter's Active Orders
```http
GET /orders/waiter/active
Authorization: Bearer {token}
```

**Requirements:** User must be a waiter

**Response (200):**
```json
[
  {
    "id": "order123",
    "status": "ON_THE_WAY",
    "vendor": {
      "name": "Mama T's Kitchen",
      "hall": "Canteen"
    },
    "user": {
      "name": "John Doe",
      "phone": "+2348012345678",
      "hostel": "Vendome",
      "room": "201B"
    },
    "items": [ /* items */ ],
    "statusHistory": [
      { "status": "CONFIRMED", "createdAt": "..." },
      { "status": "ASSIGNED", "createdAt": "..." },
      { "status": "COLLECTED", "createdAt": "..." },
      { "status": "ON_THE_WAY", "createdAt": "..." }
    ]
  }
]
```

---

## Payment Endpoints

### Initiate Payment
```http
POST /payments/initiate
Authorization: Bearer {token}
Content-Type: application/json

{
  "orderId": "order123"
}
```

**Response (200):**
```json
{
  "paymentId": "payment1",
  "orderId": "order123",
  "amount": 5520,
  "reference": "CAMPUS_ORDER123",
  "checkoutUrl": "https://checkout.paystack.com/CAMPUS_ORDER123"
}
```

**Frontend Action:**
- Redirect to `checkoutUrl`
- Paystack handles payment
- On success, webhook updates order to `CONFIRMED`

---

### Get Payment Status
```http
GET /payments/:id
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "id": "payment1",
  "orderId": "order123",
  "reference": "CAMPUS_ORDER123",
  "status": "SUCCESS",
  "providerPayload": { /* Paystack response */ },
  "createdAt": "2025-12-22T10:30:00Z",
  "updatedAt": "2025-12-22T10:31:00Z"
}
```

---

### Paystack Webhook (Server to Server)
```http
POST /payments/webhook
Content-Type: application/json
X-Paystack-Signature: {signature_hash}

{
  "event": "charge.success",
  "data": {
    "id": 123456,
    "reference": "CAMPUS_ORDER123",
    "amount": 552000,
    "status": "success",
    "customer": {
      "id": 1,
      "email": "user@example.com",
      "phone": "+2348012345678"
    }
  }
}
```

**Handled by Backend:**
- Verifies signature
- Updates order status to `CONFIRMED`
- Updates order to `OPEN` (ready for waiters to claim)
- Records payment transaction

---

## Waiter Wallet Endpoints

### Get Wallet Balance
```http
GET /waiters/wallet
Authorization: Bearer {token}
```

**Requirements:** User must be a waiter

**Response (200):**
```json
{
  "id": "wallet1",
  "waiterId": "waiter1",
  "accumulatedBalance": 12000,
  "expectedBalance": 400,
  "totalEarned": 12400,
  "lastPayoutDate": "2025-12-15T00:00:00Z",
  "transactions": [
    {
      "id": "txn1",
      "amount": 400,
      "type": "CREDIT",
      "reason": "Order ORDER123 Delivered",
      "createdAt": "2025-12-22T10:45:00Z"
    },
    {
      "id": "txn2",
      "amount": 12000,
      "type": "DEBIT",
      "reason": "Weekly Payout",
      "createdAt": "2025-12-15T00:00:00Z"
    }
  ]
}
```

---

### Request Payout
```http
POST /waiters/payout/request
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 10000,
  "bankDetails": {
    "accountNumber": "1234567890",
    "accountName": "John Doe",
    "bankCode": "011"
  }
}
```

**Response (201):**
```json
{
  "id": "payout1",
  "waiterId": "waiter1",
  "amount": 10000,
  "status": "PENDING",
  "bankDetails": {
    "accountNumber": "1234567890",
    "accountName": "John Doe",
    "bankCode": "011"
  },
  "createdAt": "2025-12-22T11:00:00Z"
}
```

**Notes:**
- Amount is deducted from `accumulatedBalance`
- Admin approves payout (weekly process)
- Funds transferred via bank

---

### Get Payout History
```http
GET /waiters/payouts
Authorization: Bearer {token}
```

**Requirements:** User must be a waiter

**Response (200):**
```json
[
  {
    "id": "payout1",
    "waiterId": "waiter1",
    "amount": 10000,
    "status": "APPROVED",
    "createdAt": "2025-12-22T11:00:00Z",
    "processedAt": "2025-12-23T09:00:00Z",
    "adminId": "admin1"
  },
  {
    "id": "payout2",
    "waiterId": "waiter1",
    "amount": 5000,
    "status": "PENDING",
    "createdAt": "2025-12-25T10:00:00Z"
  }
]
```

---

## Error Responses

### 400 - Validation Error
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "phone",
      "message": "Invalid phone number format"
    }
  ]
}
```

### 401 - Unauthorized
```json
{
  "error": "Invalid or expired token"
}
```

### 403 - Forbidden
```json
{
  "error": "Only waiters can access this resource"
}
```

### 404 - Not Found
```json
{
  "error": "Order not found"
}
```

### 409 - Conflict
```json
{
  "error": "Order already claimed"
}
```

### 500 - Server Error
```json
{
  "error": "Internal Server Error"
}
```

---

## Authentication

All endpoints requiring authentication use:
```
Authorization: Bearer {token}
```

Token obtained from `POST /auth/otp/verify`

**Token Format:**
- JWT token
- Expires in 30 days
- Contains: `id`, `phone`, `isWaiter`, `name`

---

## Rate Limiting

Not implemented in MVP, but recommended for production:
- 100 requests per 15 minutes per IP
- OTP endpoints: 5 requests per 30 minutes per phone

---

## Timeouts & Constraints

- OTP valid for 10 minutes
- OTP allows 5 failed attempts before expiry
- Order claim is atomic (prevents race conditions)
- Waiter assignment requires `isWaiter: true`

---

**Last Updated**: December 22, 2025
**API Version**: 1.0.0
**Status**: Production Ready
