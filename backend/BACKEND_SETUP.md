# CampusCrave Backend Setup Guide

## 🚀 Quick Start

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login
3. Create a new project
4. Copy your **Database Connection String** (PostgreSQL URL)
   - Settings → Database → Connection String (Node.js)
   - Should look like: `postgresql://postgres:password@host:5432/campuscrave`

### Step 2: Clone Repository & Install Dependencies

```bash
cd backend
npm install
```

### Step 3: Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and fill in:

```env
# Replace with your Supabase URL
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@YOUR_HOST:5432/campuscrave

# Generate a random secret key (min 32 characters)
JWT_SECRET=your-super-secret-key-min-32-characters-long

# Your email (for OTP sending - optional for MVP)
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password

# Paystack (get from dashboard.paystack.com)
PAYSTACK_SECRET_KEY=sk_test_xxxxx
PAYSTACK_PUBLIC_KEY=pk_test_xxxxx

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### Step 4: Set Up Database

```bash
# Install Prisma globally (optional)
npm install -g prisma

# Create migrations and push to database
npx prisma migrate dev --name init

# Seed sample data (vendors, menu items)
npm run prisma:seed

# View database (optional)
npm run prisma:studio
```

### Step 5: Start Backend Server

```bash
npm run dev
```

Expected output:
```
🚀 CampusCrave API running on http://localhost:5000
📊 Database connected
```

---

## 🛠️ Configuration Details

### Email/OTP Setup (Optional for MVP)

**For Gmail:**
1. Enable 2-factor authentication on your Google account
2. Create an App Password: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Use that password in `.env` as `SMTP_PASSWORD`

**Alternative:** For MVP, OTPs are logged to console (development mode).

### Paystack Setup

1. Sign up at [paystack.com](https://dashboard.paystack.com)
2. Get Test Keys from Dashboard
3. Add to `.env`:
   ```
   PAYSTACK_SECRET_KEY=sk_test_xxxxx
   PAYSTACK_PUBLIC_KEY=pk_test_xxxxx
   ```

### JWT Secret Generation

```bash
# Generate random string
openssl rand -base64 32
```

Or just use:
```
JWT_SECRET=your-super-secret-key-must-be-at-least-32-characters-long-12345
```

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── app.js                 # Express setup
│   ├── index.js               # Server entry point
│   ├── routes/
│   │   ├── authRoutes.js      # OTP, login, profile
│   │   ├── vendorRoutes.js    # Vendors, menus
│   │   ├── orderRoutes.js     # Orders, claiming
│   │   ├── paymentRoutes.js   # Paystack integration
│   │   └── waiterRoutes.js    # Wallet, payouts
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── vendorController.js
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   └── waiterController.js
│   ├── services/
│   │   ├── authService.js     # OTP, JWT logic
│   │   ├── vendorService.js   # Vendor queries
│   │   ├── orderService.js    # Order logic
│   │   ├── paymentService.js  # Payment handling
│   │   └── waiterService.js   # Wallet logic
│   └── middleware/
│       ├── auth.js            # Token verification
│       ├── errorHandler.js    # Error handling
│       └── validation.js      # Input validation
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.js                # Sample data
├── .env.example
├── package.json
└── README.md
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/otp/request` - Request OTP
- `POST /api/auth/otp/verify` - Verify OTP & login
- `GET /api/auth/profile` - Get user profile (auth required)
- `PUT /api/auth/profile` - Update profile (auth required)

### Vendors & Menus
- `GET /api/vendors` - List all vendors
- `GET /api/vendors?hall=Canteen` - Filter by hall
- `GET /api/vendors/halls` - Get all halls
- `GET /api/vendors/:id` - Get vendor details
- `GET /api/vendors/:id/menu` - Get vendor's menu

### Orders
- `POST /api/orders` - Create order (auth required)
- `GET /api/orders` - Get my orders (auth required)
- `GET /api/orders/:id` - Get order details (auth required)
- `GET /api/orders/available` - Get available orders for claiming
- `POST /api/orders/:id/claim` - Claim order (waiter only)
- `POST /api/orders/:id/status` - Update order status (auth required)

### Payments
- `POST /api/payments/initiate` - Start payment (auth required)
- `GET /api/payments/:id` - Check payment status (auth required)
- `POST /api/payments/webhook` - Paystack webhook (no auth)

### Waiter Features
- `GET /api/waiters/wallet` - Get wallet balance (waiter only)
- `POST /api/waiters/payout/request` - Request payout (waiter only)
- `GET /api/waiters/payouts` - Payout history (waiter only)

---

## 🧪 Testing Endpoints

### Test OTP Request
```bash
curl -X POST http://localhost:5000/api/auth/otp/request \
  -H "Content-Type: application/json" \
  -d '{"phone": "+2348012345678"}'
```

### Test OTP Verify
```bash
curl -X POST http://localhost:5000/api/auth/otp/verify \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+2348012345678",
    "otp": "123456",
    "name": "John Doe",
    "hostel": "Vendome",
    "room": "201",
    "matricNumber": "2023/12345"
  }'
```

### Test Get Vendors
```bash
curl http://localhost:5000/api/vendors
```

### Test Get Vendor Menu
```bash
curl http://localhost:5000/api/vendors/{vendor_id}/menu
```

---

## 🗄️ Database Schema Overview

### Users
- `id`, `phone` (unique), `name`, `hostel`, `room`, `matricNumber`
- `isWaiter`, `bankDetails` (JSON)

### Vendors
- `id`, `name` (unique), `hall`, `contact`, `imageUrl`

### MenuItems
- `id`, `vendorId`, `name`, `price`, `description`, `category`

### Orders
- `id`, `userId`, `vendorId`, `status`, `subtotal`, `deliveryFee`, `gatewayFee`, `total`
- `assignedWaiterId`, `deliveryAddress` (JSON), `paymentReference`

### OrderItems
- `id`, `orderId`, `menuItemId`, `quantity`, `price`

### WaiterWallet
- `id`, `waiterId`, `accumulatedBalance`, `expectedBalance`, `totalEarned`

### Payments
- `id`, `orderId`, `reference`, `status`, `providerPayload` (JSON)

### PayoutRequests
- `id`, `waiterId`, `amount`, `status`, `bankDetails` (JSON)

---

## ⚠️ Common Issues & Solutions

### Error: "Can't reach database server"
- ✅ Check DATABASE_URL in .env
- ✅ Verify Supabase project is running
- ✅ Check if IP is whitelisted in Supabase

### Error: "EADDRINUSE: address already in use :::5000"
- ✅ Port 5000 is already in use
- ✅ Change PORT in .env or kill process: `lsof -ti:5000 | xargs kill -9`

### OTP not sending
- ✅ For MVP, check console logs instead
- ✅ Set up email in later phase
- ✅ In dev mode, OTP is returned in API response

### Migration failed
- ✅ Run `npx prisma migrate reset` to clear and retry
- ✅ Check syntax in `schema.prisma`

---

## 📦 Dependencies Overview

- **express** - Web framework
- **@prisma/client** - Database ORM
- **jsonwebtoken** - JWT auth
- **cors** - Cross-origin requests
- **nodemailer** - Email sending (optional)
- **express-validator** - Input validation
- **dotenv** - Environment variables

---

## 🔐 Security Notes

- ✅ All sensitive data in `.env` (never commit)
- ✅ JWT tokens expire in 30 days
- ✅ OTP sessions expire in 10 minutes
- ✅ Passwords/secrets never logged
- ✅ SQL injection prevented via Prisma
- ✅ CORS configured to frontend only

---

## 🚀 Next Steps

1. **Test the API** using provided curl commands above
2. **Connect frontend** to this backend (update VITE_API_URL)
3. **Test OTP flow** - sign up → login
4. **Test order flow** - browse → create order → initiate payment
5. **Test waiter flow** - claim orders → update status

---

## 📞 Support

If you encounter issues:
1. Check `.env` is correct
2. Check database connection: `npx prisma db execute --stdin` 
3. View logs: `npm run prisma:studio`
4. Reset database: `npx prisma migrate reset`

---

**Created**: December 22, 2025
**Backend Ready**: Phase 1 ✅
