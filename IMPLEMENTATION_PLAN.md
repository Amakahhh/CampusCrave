# CampusCrave Full Project Implementation Plan

## 📋 Executive Summary

We're building a complete food delivery platform with:
- **Frontend**: React (Vite) - Student, Waiter, Admin dashboards with glass morphism design
- **Backend**: Node.js + Express REST API
- **Database**: PostgreSQL (via Supabase) - managed, scalable, with built-in auth
- **Real-time**: Socket.io for order tracking updates
- **Payments**: Paystack integration
- **Storage**: Cloudinary for menu item images (free tier available)
- **Hosting**: Vercel (frontend), Railway/Render (backend)

---

## 🗂️ Tech Stack Recommendation

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (already set up)
- **Animations**: Framer Motion (already set up)
- **Icons**: Lucide React (already set up)
- **State Management**: Zustand (lightweight, no boilerplate)
- **API Client**: Axios + React Query
- **Real-time**: Socket.io Client
- **Forms**: React Hook Form + Zod (validation)

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma (type-safe, great with PostgreSQL)
- **Authentication**: JWT + OTP (Twilio for SMS)
- **Real-time**: Socket.io
- **File Upload**: Cloudinary API
- **Payment**: Paystack SDK
- **Environment**: dotenv

### Database (Supabase)
- PostgreSQL 15
- Built-in authentication (but we'll use custom OTP for MVP)
- File storage (though Cloudinary is simpler)
- Real-time subscriptions
- Free tier: 500 MB database, 1 GB bandwidth

### Why Supabase?
✅ PostgreSQL (reliable, relational)
✅ Cheap ($0-25/month for MVP)
✅ Good free tier
✅ Built-in auth (future enhancement)
✅ Managed - no DevOps overhead
✅ Prisma support
✅ Real-time subscriptions (alternative to Socket.io DB layer)

### Why NOT Firebase?
❌ Expensive after free tier
❌ Document-based (harder for relational data like orders → items)
❌ OTP integration is manual
❌ Payment webhooks are trickier

---

## 📁 Project Structure

```
campuscrave/
├── frontend/                    # React app (current directory)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx                 ✅ DONE
│   │   │   ├── AuthOTP.jsx                     (NEW)
│   │   │   ├── ProfileSetup.jsx                (NEW)
│   │   │   ├── StudentDashboard.jsx            (EXISTS - enhance)
│   │   │   ├── StudentOrder.jsx                ✅ DONE (mock data)
│   │   │   ├── StudentCheckout.jsx             (NEW)
│   │   │   ├── OrderTracking.jsx               (EXISTS - enhance)
│   │   │   ├── RateOrder.jsx                   (NEW)
│   │   │   ├── WaiterDashboard.jsx             (EXISTS - enhance)
│   │   │   ├── WaiterActiveOrder.jsx           (NEW)
│   │   │   ├── WaiterWallet.jsx                (NEW)
│   │   │   ├── AdminDashboard.jsx              (NEW)
│   │   │   ├── AdminOrders.jsx                 (NEW)
│   │   │   ├── AdminWaiters.jsx                (NEW)
│   │   │   ├── AdminPayouts.jsx                (NEW)
│   │   │   └── AdminAnalytics.jsx              (NEW)
│   │   ├── components/
│   │   │   ├── (existing)
│   │   │   ├── Cart/                           (NEW)
│   │   │   │   ├── CartItem.jsx
│   │   │   │   ├── CartSummary.jsx
│   │   │   │   └── CartModal.jsx
│   │   │   ├── Order/                          (NEW)
│   │   │   │   ├── OrderTimeline.jsx
│   │   │   │   ├── OrderList.jsx
│   │   │   │   └── StatusBadge.jsx
│   │   │   ├── Vendor/                         (NEW)
│   │   │   │   ├── VendorCard.jsx
│   │   │   │   ├── MenuItem.jsx
│   │   │   │   └── MenuCategory.jsx
│   │   │   ├── Waiter/                         (NEW)
│   │   │   │   ├── OrderCard.jsx
│   │   │   │   ├── WalletCard.jsx
│   │   │   │   └── PayoutRequest.jsx
│   │   │   └── Admin/                          (NEW)
│   │   │       ├── DataTable.jsx
│   │   │       ├── FilterBar.jsx
│   │   │       ├── StatsCard.jsx
│   │   │       └── Chart.jsx
│   │   ├── hooks/                              (NEW)
│   │   │   ├── useAuth.js
│   │   │   ├── useCart.js
│   │   │   ├── useOrders.js
│   │   │   ├── useSocket.js
│   │   │   └── usePaystack.js
│   │   ├── store/                              (NEW - Zustand)
│   │   │   ├── authStore.js
│   │   │   ├── cartStore.js
│   │   │   └── appStore.js
│   │   ├── api/                                (NEW)
│   │   │   ├── auth.js
│   │   │   ├── vendors.js
│   │   │   ├── orders.js
│   │   │   ├── payments.js
│   │   │   ├── waiters.js
│   │   │   └── admin.js
│   │   ├── services/                           (NEW)
│   │   │   ├── socket.js
│   │   │   ├── paystack.js
│   │   │   └── utils.js
│   │   └── App.jsx                             (UPDATE routes)
│
├── backend/                     # Node.js API (NEW)
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.js                         (OTP login)
│   │   │   ├── vendors.js                      (Browse vendors/menus)
│   │   │   ├── orders.js                       (CRUD orders, claim, status)
│   │   │   ├── payments.js                     (Webhook, initiate)
│   │   │   ├── waiters.js                      (Wallet, payout request)
│   │   │   └── admin.js                        (Admin operations)
│   │   ├── middleware/
│   │   │   ├── auth.js                         (JWT verification)
│   │   │   ├── errorHandler.js
│   │   │   └── validation.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── vendorController.js
│   │   │   ├── orderController.js
│   │   │   ├── paymentController.js
│   │   │   ├── waiterController.js
│   │   │   └── adminController.js
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── orderService.js
│   │   │   ├── paymentService.js
│   │   │   ├── waiterService.js
│   │   │   └── paystackService.js
│   │   ├── models/
│   │   │   └── (Prisma schema - see below)
│   │   ├── socket/
│   │   │   └── handlers.js                     (Socket.io events)
│   │   └── app.js                              (Express setup)
│   ├── prisma/
│   │   ├── schema.prisma                       (DATABASE SCHEMA)
│   │   └── migrations/
│   ├── .env.example
│   ├── package.json
│   └── index.js
│
├── DEPLOYMENT_NOTES.md
└── DATABASE_SCHEMA.md
```

---

## 🗄️ Database Schema (Prisma)

```prisma
// prisma/schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String     @id @default(cuid())
  phone         String     @unique
  name          String?
  hostel        String?
  room          String?
  isWaiter      Boolean    @default(false)
  bankDetails   Json?      // { accountNumber, accountName, bankCode }
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt

  // Relations
  orders        Order[]
  waiterWallet  WaiterWallet?
  payoutRequests PayoutRequest[]
  ratings       Rating[]

  @@map("users")
}

model Vendor {
  id        String   @id @default(cuid())
  name      String
  hall      String   // e.g., "Canteen", "Vendome", "East Campus"
  contact   String?
  createdAt DateTime @default(now())

  // Relations
  menuItems MenuItem[]
  orders    Order[]

  @@map("vendors")
}

model MenuItem {
  id          String   @id @default(cuid())
  vendorId    String
  name        String
  description String?
  price       Decimal  @db.Decimal(10, 2)
  imageUrl    String?  // Cloudinary URL
  category    String?  // "Breakfast", "Lunch", "Snacks", etc.
  available   Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  vendor      Vendor   @relation(fields: [vendorId], references: [id], onDelete: Cascade)
  orderItems  OrderItem[]

  @@index([vendorId])
  @@map("menu_items")
}

model Order {
  id                  String     @id @default(cuid())
  userId              String
  vendorId            String
  status              OrderStatus @default(PENDING)
  subtotal            Decimal    @db.Decimal(10, 2)
  deliveryFee         Decimal    @default(500) @db.Decimal(10, 2)
  gatewayFee          Decimal    @default(20) @db.Decimal(10, 2)
  total               Decimal    @db.Decimal(10, 2)
  deliveryAddress     Json       // { hostel, room }
  notes               String?
  paymentReference    String?    // Paystack reference
  assignedWaiterId    String?
  expectedWaiterFee   Decimal    @default(400) @db.Decimal(10, 2)
  createdAt           DateTime   @default(now())
  updatedAt           DateTime   @updatedAt
  deliveredAt         DateTime?

  user                User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  vendor              Vendor     @relation(fields: [vendorId], references: [id])
  assignedWaiter      User?      @relation("AssignedOrders", fields: [assignedWaiterId], references: [id])
  items               OrderItem[]
  payment             Payment?
  statusHistory       OrderStatusHistory[]
  rating              Rating?

  @@index([userId])
  @@index([vendorId])
  @@index([assignedWaiterId])
  @@index([status])
  @@map("orders")
}

model OrderItem {
  id        String   @id @default(cuid())
  orderId   String
  menuItemId String
  quantity  Int
  price     Decimal  @db.Decimal(10, 2)

  order     Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  menuItem  MenuItem @relation(fields: [menuItemId], references: [id])

  @@index([orderId])
  @@map("order_items")
}

model OrderStatus {
  PENDING
  CONFIRMED
  OPEN
  ASSIGNED
  COLLECTED
  ON_THE_WAY
  DELIVERED
  CANCELLED
}

model OrderStatusHistory {
  id        String   @id @default(cuid())
  orderId   String
  status    OrderStatus
  createdAt DateTime @default(now())

  order     Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)

  @@index([orderId])
  @@map("order_status_history")
}

model Payment {
  id              String   @id @default(cuid())
  orderId         String   @unique
  reference       String   @unique // Paystack reference
  status          PaymentStatus @default(PENDING)
  providerPayload Json?    // Paystack response
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  order           Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)

  @@index([orderId])
  @@map("payments")
}

model PaymentStatus {
  PENDING
  SUCCESS
  FAILED
  CANCELLED
}

model WaiterWallet {
  id                  String   @id @default(cuid())
  waiterId            String   @unique
  accumulatedBalance  Decimal  @default(0) @db.Decimal(10, 2)
  expectedBalance     Decimal  @default(0) @db.Decimal(10, 2)
  totalEarned         Decimal  @default(0) @db.Decimal(10, 2)
  lastPayoutDate      DateTime?
  updatedAt           DateTime @updatedAt

  user                User     @relation(fields: [waiterId], references: [id], onDelete: Cascade)
  transactions        WalletTransaction[]

  @@map("waiter_wallets")
}

model WalletTransaction {
  id        String   @id @default(cuid())
  waiterId  String
  amount    Decimal  @db.Decimal(10, 2)
  type      TransactionType // CREDIT, DEBIT
  reason    String   // "Order #123 Delivered", "Weekly Payout"
  orderId   String?
  createdAt DateTime @default(now())

  wallet    WaiterWallet @relation(fields: [waiterId], references: [id], onDelete: Cascade)

  @@index([waiterId])
  @@map("wallet_transactions")
}

enum TransactionType {
  CREDIT
  DEBIT
}

model PayoutRequest {
  id        String   @id @default(cuid())
  waiterId  String
  amount    Decimal  @db.Decimal(10, 2)
  status    PayoutStatus @default(PENDING)
  adminId   String?  // Admin who processed it
  bankDetails Json   // { accountNumber, accountName, bankCode }
  createdAt DateTime @default(now())
  processedAt DateTime?

  user      User     @relation(fields: [waiterId], references: [id], onDelete: Cascade)

  @@index([waiterId])
  @@index([status])
  @@map("payout_requests")
}

enum PayoutStatus {
  PENDING
  APPROVED
  REJECTED
  PAID
}

model Rating {
  id        String   @id @default(cuid())
  orderId   String   @unique
  userId    String
  rating    Int      // 1-5 stars
  comment   String?
  createdAt DateTime @default(now())

  order     Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@map("ratings")
}
```

---

## 🔄 Implementation Phases

### **Phase 1: Foundation (Week 1)**
**Goal**: Core infrastructure + Authentication + Vendors/Menu display

**Tasks**:
1. Set up Supabase PostgreSQL database
2. Create Node.js backend with Express
3. Prisma migrations
4. OTP authentication API
5. Vendor & Menu API endpoints
6. Frontend: AuthOTP.jsx, ProfileSetup.jsx
7. Connect frontend to backend APIs
8. Deploy backend to Railway/Render

**Deliverable**: Students can sign up, login, browse vendors and menus

---

### **Phase 2: Orders & Cart (Week 2)**
**Goal**: Full order creation workflow without payment

**Tasks**:
1. Cart state management (Zustand)
2. StudentCheckout.jsx (without payment)
3. Orders API endpoints (create, list)
4. Connect StudentOrder.jsx to real database
5. Cart UI component refinement
6. Form validation (React Hook Form)

**Deliverable**: Students can add items to cart and create orders (stuck at payment screen)

---

### **Phase 3: Payments & Order Management (Week 2-3)**
**Goal**: Paystack integration + Order tracking

**Tasks**:
1. Paystack integration (backend)
2. Payment webhook handler
3. Order status update endpoints
4. Socket.io setup for real-time updates
5. OrderTracking.jsx enhancement
6. RateOrder.jsx
7. Webhook verification

**Deliverable**: Students can complete payment, track orders, and rate

---

### **Phase 4: Waiter Features (Week 3-4)**
**Goal**: Waiter dashboard with order claiming and earnings

**Tasks**:
1. WaiterDashboard.jsx redesign
2. Order claiming endpoint (atomic)
3. WaiterActiveOrder.jsx
4. Status update buttons
5. WaiterWallet.jsx
6. Payout request UI
7. Socket.io for order notifications

**Deliverable**: Waiters can claim orders, update status, track earnings

---

### **Phase 5: Admin Panel (Week 4-5)**
**Goal**: Admin dashboard with full control

**Tasks**:
1. AdminDashboard.jsx
2. AdminOrders.jsx (filters, search)
3. AdminWaiters.jsx (manage wallets)
4. AdminPayouts.jsx (approve/reject)
5. AdminAnalytics.jsx
6. Admin auth/permissions
7. Data tables with pagination

**Deliverable**: Admins can view all orders, manage waiters, process payouts

---

### **Phase 6: Polish & Deployment (Week 5-6)**
**Goal**: Bug fixes, optimization, production launch

**Tasks**:
1. Bug fixes from testing
2. Mobile responsiveness review
3. Performance optimization
4. Error handling improvements
5. Security audit (JWT, API keys)
6. Environment variables management
7. Documentation
8. Deploy to production (Vercel + Railway)

---

## 🔐 Environment Variables Needed

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_PAYSTACK_PUBLIC_KEY=pk_test_...
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@host:5432/campuscrave
JWT_SECRET=your-super-secret-key
PAYSTACK_SECRET_KEY=sk_test_...
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
NODE_ENV=development
PORT=5000
```

---

## 💾 Supabase Setup Steps

1. **Create Project**: supabase.com → New Project
2. **Get Connection String**: Project Settings → Database → Connection String (Node.js)
3. **Copy to `.env`**: `DATABASE_URL=postgresql://...`
4. **Install Prisma**: `npm install @prisma/client prisma`
5. **Init Prisma**: `npx prisma init`
6. **Paste schema** into `prisma/schema.prisma`
7. **Create migrations**: `npx prisma migrate dev --name init`
8. **Seed data** (optional): vendors, menu items

---

## 📦 Deliverables Timeline

| Week | Phase | Deliverable |
|------|-------|-------------|
| 1 | Foundation | Login ✅ Browse menus ✅ |
| 2 | Orders & Cart | Cart system ✅ Order creation ✅ |
| 2-3 | Payments | Paystack integration ✅ Tracking ✅ |
| 3-4 | Waiter | Claiming ✅ Earnings ✅ |
| 4-5 | Admin | Full dashboard ✅ |
| 5-6 | Production | Live 🚀 |

---

## ✅ Quality Checklist

- [ ] All pages follow landing page design (glass morphism, colors, fonts)
- [ ] No hardcoded vendor/menu data (all from database)
- [ ] Real-time order tracking (Socket.io)
- [ ] Error handling with user-friendly messages
- [ ] Mobile responsive (tested on phone)
- [ ] Performance: <3s load time
- [ ] Security: JWT, API validation, rate limiting
- [ ] Database migrations versioned
- [ ] API documentation (Postman/Swagger)
- [ ] Unit tests for critical functions
- [ ] Load tested (simulate 100+ concurrent orders)

---

## 🎨 Design Consistency Notes

Every new page/component must:
- Use the **glass morphism aesthetic** (bg-white/20 backdrop-blur-lg border-white/30)
- Apply **primary/accent gradients** for CTAs
- Use **Lucide React icons** (no emojis except in landing page emojis)
- Match **typography** (Nunito font, same sizes)
- Include **Framer Motion animations** (fade in, slide, scale)
- Maintain **consistent spacing** (6 units = 24px)
- Support **dark mode** (future consideration)

---

## ❓ Questions for You Before We Start

1. **Supabase vs alternatives?** (I recommend Supabase, but open to Firebase/PlanetScale)
2. **SMS OTP provider?** (Twilio = best, costs ~$0.005/SMS; free alternatives?)
3. **File storage for images?** (Cloudinary free = 10GB storage, or Supabase Storage?)
4. **Weekly payout timing?** (Every Friday at midnight? Admin manually triggers?)
5. **Waiter verification?** (ID verification before activation? MVP skip or include?)
6. **Multi-vendor orders?** (Can student order from 2 vendors in 1 order? Or 1 vendor per order only?)
7. **Delivery zones?** (Currently "same hall". Need cross-hall deliveries?)
8. **Backend hosting budget?** (Railway free tier okay, or prefer paid tier?)

---

## 🚀 Next Steps

1. **Review & Approve** this plan
2. **Answer the 8 questions** above
3. **I set up:**
   - Supabase project
   - GitHub repo with folder structure
   - .env templates
4. **You approve**, then:
5. **We start Phase 1** (Auth + Vendors)

---

## 📞 Support & Questions

During development:
- Ask me anything about implementation
- Show me designs before coding
- Approve PRs before merge
- Test on your phone weekly
- Adjust scope if needed

---

**Ready to build the next big campus business? 🎯**

Let me know your thoughts on this plan!
