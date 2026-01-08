# CampusCrave Development Plan

## Completed Sections
✅ Landing Page with:
- Animated hero section
- Professional glass morphism design
- "Why Choose Campus Crave" section with professional icons
- Trending Cravings carousel with navigation
- How It Works roadmap section
- Mobile Waiter CTA section
- FAQ section
- Footer with links

---

## Next Priority: Order Management Pages

### 1. **Student Order Page** (`/src/pages/StudentOrder.jsx`)
**Purpose:** Main page where students browse and place food orders

**Key Features:**
- **Search & Filter Bar**
  - Search by vendor name or food type
  - Filter by cuisine type, price range, rating
  - Sorting options (newest, most popular, fastest delivery, highest rating)

- **Vendor Grid Display**
  - Show available vendors/food stalls
  - Display: vendor name, rating, food image, estimated delivery time, average price
  - Quick info badges (new, popular, top-rated)

- **Food Item Details Modal/Card**
  - Food image
  - Description and ingredients
  - Price
  - Customization options (sizes, add-ons, special requests)
  - Quantity selector
  - Add to cart button

- **Shopping Cart Sidebar**
  - List of items added
  - Item count and total price
  - ₦500 delivery fee display
  - Checkout button
  - Continue shopping button

- **Responsive Design**
  - Mobile: stacked layout
  - Tablet: 2-column grid
  - Desktop: 3-4 column grid with sidebar cart

---

### 2. **Student Cart & Checkout Page** (`/src/pages/StudentCheckout.jsx`)
**Purpose:** Review order and process payment

**Sections:**
- **Order Summary**
  - All items with quantities and prices
  - Ability to edit quantities or remove items
  - Subtotal calculation

- **Delivery Details**
  - Student name (auto-filled from profile)
  - Phone number (auto-filled from profile)
  - Hall selection (dropdown)
  - Room number
  - Delivery instructions (optional textarea)
  - Confirm delivery address

- **Cost Breakdown**
  - Subtotal
  - Delivery fee (₦500)
  - Total amount

- **Payment Method Selection**
  - Paystack integration
  - Bank transfer details
  - Display which is recommended

- **Order Confirmation**
  - Success message
  - Order number
  - Estimated delivery time
  - Real-time order tracking link

---

### 3. **Student Order Tracking Page** (`/src/pages/OrderTracking.jsx` - Enhance existing)
**Purpose:** Track active and past orders

**Features:**
- **Active Orders**
  - Current status (preparing, on the way, delivered)
  - Progress timeline/stepper
  - Estimated arrival time with countdown
  - Waiter location (if available)
  - Chat with waiter option
  - Real-time updates

- **Order History**
  - List of past orders
  - Filter by date range
  - Re-order button for quick reordering
  - Rating & review option for completed orders

- **Notifications**
  - Real-time push notifications for status updates
  - Bell icon with notification count

---

### 4. **Student Dashboard Enhancements** (`/src/pages/StudentDashboard.jsx`)
**Purpose:** Student hub and profile management

**Sections:**
- **Quick Stats**
  - Total orders
  - Total spent
  - Favorite vendors
  - Loyalty points/rewards (if applicable)

- **Profile Management**
  - Edit profile picture
  - Edit name, phone, email
  - Manage saved addresses (multiple halls/rooms)
  - Payment methods
  - Dietary preferences/allergies

- **Recent Orders Quick Access**
  - Last 3-5 orders
  - Quick re-order buttons
  - Links to track current order

- **Settings**
  - Notification preferences
  - Privacy settings
  - Account security

---

## Admin Section Pages

### 1. **Admin Login Page** (`/src/pages/AdminLogin.jsx`)
**Purpose:** Secure admin authentication

**Features:**
- Email/username login
- Password field with show/hide toggle
- Remember me option
- Forgot password link
- Responsive design matching landing page aesthetic

---

### 2. **Admin Dashboard** (`/src/pages/AdminDashboard.jsx`)
**Purpose:** Main admin hub with overview and controls

**Sections:**
- **Key Metrics Cards**
  - Total orders today
  - Total revenue
  - Active waiters online
  - Pending orders count
  - Average delivery time

- **Recent Activity Feed**
  - Latest orders
  - New user sign-ups
  - System alerts

- **Quick Actions**
  - View all orders
  - Manage waiters
  - View reports
  - Message center

- **Charts & Analytics**
  - Orders by hour/day
  - Revenue trends
  - Top vendors
  - User growth

---

### 3. **Orders Management Page** (`/src/pages/AdminOrders.jsx`)
**Purpose:** View and manage all orders

**Features:**
- **Orders Table/List**
  - Columns: Order ID, Student Name, Vendor, Items, Amount, Status, Time, Action buttons
  - Sorting and filtering by status, date, vendor, student
  - Search by order ID or student name

- **Order Details Modal**
  - Full order information
  - Items ordered with prices
  - Student delivery address
  - Assigned waiter info
  - Status timeline
  - Contact options

- **Order Actions**
  - Assign to waiter
  - Change status manually (if needed)
  - Cancel order (with confirmation)
  - Refund order
  - Add notes/comments

- **Filtering & Search**
  - Status filter (pending, preparing, on way, delivered, cancelled)
  - Date range picker
  - Vendor filter
  - Search functionality

---

### 4. **Waiters Management Page** (`/src/pages/AdminWaiters.jsx`)
**Purpose:** Manage waiter accounts and assignments

**Features:**
- **Waiters List**
  - Name, email, phone, status (online/offline)
  - Total deliveries, rating, earnings this month
  - Action buttons

- **Waiter Profile**
  - Edit personal info
  - View verification documents
  - View performance metrics
  - View assigned orders
  - Earnings breakdown

- **Actions**
  - Approve/reject new waiter applications
  - Activate/deactivate account
  - View detailed ratings and reviews
  - Message waiter
  - View payment history

---

### 5. **Reports & Analytics Page** (`/src/pages/AdminReports.jsx`)
**Purpose:** Business intelligence and metrics

**Sections:**
- **Date Range Selector**
  - Preset ranges (today, this week, this month)
  - Custom date picker

- **Revenue Analytics**
  - Total revenue
  - Revenue by vendor
  - Revenue by waiter
  - Payment method breakdown
  - Charts and graphs

- **Orders Analytics**
  - Total orders
  - Orders by vendor
  - Orders by status
  - Peak hours
  - Average order value

- **User Analytics**
  - New students
  - Repeat customers
  - Top customers
  - Geographic distribution (by halls)

- **Performance Metrics**
  - Average delivery time
  - Delivery success rate
  - Top performing waiters
  - Customer satisfaction ratings

- **Export Options**
  - Download as CSV/PDF
  - Email reports

---

### 6. **Settings & Configuration Page** (`/src/pages/AdminSettings.jsx`)
**Purpose:** System-wide configuration

**Sections:**
- **General Settings**
  - App name, description
  - Support contact info
  - Operating hours

- **Delivery Settings**
  - Delivery fee amount (₦500)
  - Delivery areas/halls configuration
  - Estimated delivery time settings

- **Payment Settings**
  - Paystack API keys (with masked display)
  - Payment processing options
  - Refund policies configuration

- **Notifications Settings**
  - Email templates
  - SMS templates
  - Notification triggers

- **User Management**
  - Create admin accounts
  - Manage admin permissions
  - View admin activity logs

---

## Implementation Order

### Phase 1 (Week 1-2): Core Student Features
1. StudentOrder.jsx (Browse & Add to Cart)
2. StudentCheckout.jsx (Payment Processing)
3. Enhance StudentDashboard.jsx

### Phase 2 (Week 2-3): Admin Foundation
1. AdminLogin.jsx
2. AdminDashboard.jsx
3. AdminOrders.jsx (View & Manage)

### Phase 3 (Week 3-4): Admin Features
1. AdminWaiters.jsx
2. AdminReports.jsx
3. AdminSettings.jsx

### Phase 4 (Week 4+): Polish & Integration
1. Real-time updates with websockets
2. Payment integration (Paystack)
3. Push notifications
4. Mobile responsiveness improvements

---

## Design System Consistency

### Colors Already Established
- Primary: Brand color (maroon/dark red)
- Accent: Secondary brand color
- Glass effect: `bg-white/20 backdrop-blur-lg border border-white/30`
- Text: Gray-900 for headings, gray-700 for body

### Component Patterns to Follow
- Use glass morphism for cards and containers
- Icons from lucide-react (no emojis)
- Smooth animations with framer-motion
- Glass buttons with proper hover states
- Professional gradients for accents

### Layout Standards
- Max-width: 7xl for large containers
- Padding: 6 units (24px) for sections
- Gap: 4-6 units between elements
- Responsive: Mobile-first approach

---

## Technical Stack
- **Frontend:** React + Vite + Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Forms:** React Hook Form (recommended)
- **State Management:** TBD (Context API or Zustand)
- **Payment:** Paystack Integration
- **Routing:** React Router

---

## Database Schema (Conceptual)

### Collections Needed
1. **Users** (Students & Admins)
   - ID, name, email, phone, role, profile_image, halls, rooms, created_at

2. **Waiters**
   - ID, name, email, phone, status, rating, total_deliveries, bank_info, documents, created_at

3. **Orders**
   - ID, student_id, vendor_id, waiter_id, items, total_amount, delivery_fee, status, delivery_address, created_at, updated_at

4. **OrderItems**
   - ID, order_id, food_item_id, quantity, price, customizations

5. **Vendors**
   - ID, name, description, rating, opening_hours, menu_items, location

6. **FoodItems**
   - ID, vendor_id, name, description, price, image, category, customizations

7. **Transactions**
   - ID, order_id, amount, status, payment_method, paystack_ref, created_at

8. **Reviews**
   - ID, order_id, student_id, waiter_id, rating, comment, created_at

---

## Next Steps
1. ✅ Fix footer borders (DONE)
2. Create StudentOrder.jsx with vendor grid and food listing
3. Create shopping cart component and context
4. Create StudentCheckout.jsx with payment flow
5. Setup admin authentication pages
6. Create admin dashboard with metrics

