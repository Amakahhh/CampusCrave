# CampusCrave Landing Page - Complete Structure

```
Landing Page Layout
├── Hero Section (Existing)
│   ├── Navigation Bar (Floating Glass Design)
│   ├── Typewriter Heading with Rotating Messages
│   ├── Subheading
│   └── CTA Buttons (Order Food / Become a Waiter)
│
├── Features Section (Existing)
│   ├── "Why Choose CampusCrave?"
│   └── 3 Feature Cards (Speed, Affordability, Quality)
│
├── CTA Section (Existing)
│   └── "Ready to satisfy your cravings?"
│
├──────────────────────────────────────────────────────────
│ NEW SECTIONS BUILT BELOW
├──────────────────────────────────────────────────────────
│
├── 1. TRENDING CRAVINGS GRID (TrendingCravings.jsx)
│   │
│   ├── Section Header
│   │   ├── "Trending Cravings" (with gradient)
│   │   └── Subheading
│   │
│   ├── Horizontal Scroll Container
│   │   ├── Left Scroll Button (hidden on mobile)
│   │   ├── Vendor Cards (4 total, repeatable)
│   │   │   ├── Image Section (60% height)
│   │   │   │   ├── Large Emoji (🍲, 🥐, 🌶️, 🍝)
│   │   │   │   ├── Gradient Background
│   │   │   │   └── "Open Now" Badge (with pulse)
│   │   │   │
│   │   │   └── Content Section (40% height)
│   │   │       ├── Vendor Name (Mama T's Kitchen)
│   │   │       ├── Cuisine Type
│   │   │       ├── Star Rating (4.8 ⭐)
│   │   │       ├── Review Count
│   │   │       ├── Average Price (₦1500)
│   │   │       └── "Order Now" Button
│   │   │
│   │   └── Right Scroll Button (hidden on mobile)
│   │
│   └── Mobile Scroll Indicator (3 dots)
│
│
├── 2. HOW IT WORKS (HowItWorks.jsx)
│   │
│   ├── Section Header
│   │   ├── "How It Works" (with gradient)
│   │   └── "Three simple steps to satisfaction"
│   │
│   ├── Steps Grid (3 columns on desktop, stacked on mobile)
│   │   ├── Connector Line (desktop only)
│   │   │
│   │   ├── Step 01: Browse
│   │   │   ├── Huge Number "01" (90% opacity gradient)
│   │   │   ├── Icon Badge (🔍 in blue-cyan gradient)
│   │   │   ├── Title: "Browse"
│   │   │   └── Description: "Pick from your favorite campus spots..."
│   │   │
│   │   ├── Step 02: Pay
│   │   │   ├── Huge Number "02" (90% opacity gradient)
│   │   │   ├── Icon Badge (💳 in purple-pink gradient)
│   │   │   ├── Title: "Pay"
│   │   │   └── Description: "Flat ₦500 delivery. No hidden fees..."
│   │   │
│   │   ├── Step 03: Relax
│   │   │   ├── Huge Number "03" (90% opacity gradient)
│   │   │   ├── Icon Badge (🚀 in green-emerald gradient)
│   │   │   ├── Title: "Relax"
│   │   │   └── Description: "We bring it straight to your hostel door..."
│   │   │
│   │   └── Mobile Separators (↓ arrows between steps)
│   │
│   └── Bottom CTA Button
│       └── "Get Started Now"
│
│
├── 3. WAITER CTA SECTION (WaiterCTA.jsx)
│   │
│   ├── Full-Width Banner (green-emerald gradient)
│   │ │
│   │ ├── Background Pattern
│   │ │   ├── Animated floating blobs
│   │ │   ├── Grid pattern overlay
│   │ │   └── Shine sweep effect
│   │ │
│   │ ├── Left Side Content (flex-1)
│   │ │   ├── Badge: "⚡ Easy Money"
│   │ │   ├── Main Heading: "Walking to class? Make ₦400"
│   │ │   ├── Subheading: "Earn money with your campus access..."
│   │ │   │
│   │ │   └── Benefits List (3 items)
│   │ │       ├── ⚡ Flexible hours
│   │ │       ├── 💰 Keep 80% of earnings
│   │ │       └── 📱 Get paid via Paystack
│   │ │
│   │ ├── Right Side (hidden on mobile, flex-1 on desktop)
│   │ │   └── Floating Cards Illustration
│   │ │       ├── Card 1: "Earnings This Week" (₦12,400)
│   │ │       └── Card 2: "Quick Stats" (4.9 ⭐)
│   │ │
│   │ └── Bottom CTA
│   │     ├── Yellow "Start Earning" Button (prominent)
│   │     └── "Join 2,400+ waiters already earning"
│   │
│   └── [All within one rounded-4xl container with shadows]
│
│
├── 4. FAQ SECTION (FAQSection.jsx)
│   │
│   ├── Section Header
│   │   ├── "Frequently Asked Questions" (with gradient)
│   │   └── "Everything you need to know..."
│   │
│   ├── Accordion Items (6 total)
│   │   │
│   │   ├── Item 1: "Do you deliver to all halls?" 📍
│   │   │   └── [Expandable Answer]
│   │   │
│   │   ├── Item 2: "How do I pay?" 💳
│   │   │   └── [Expandable Answer]
│   │   │
│   │   ├── Item 3: "Is there a service fee?" 💰
│   │   │   └── [Expandable Answer with badge: "💚 No hidden charges"]
│   │   │
│   │   ├── Item 4: "What if my food arrives late?" ⚡
│   │   │   └── [Expandable Answer]
│   │   │
│   │   ├── Item 5: "Can I schedule orders in advance?" 🗓️
│   │   │   └── [Expandable Answer]
│   │   │
│   │   └── Item 6: "What's your refund policy?" ↩️
│   │       └── [Expandable Answer]
│   │
│   ├── Each Accordion Item Features:
│   │   ├── Icon (emoji)
│   │   ├── Question Text
│   │   ├── Chevron Icon (rotates on expand)
│   │   ├── Hover State (color change)
│   │   └── Expanded State
│   │       └── Green gradient background
│   │           └── Answer text with smooth animation
│   │
│   └── Bottom CTA: "Contact Support"
│
│
└── 5. FOOTER (Footer.jsx)
    │
    ├── Top Section - 4 Columns (responsive grid)
    │   │
    │   ├── Column 1: Brand
    │   │   ├── "CampusCrave" Logo/Title
    │   │   ├── Tagline: "Food delivery by students, for students"
    │   │   └── Social Links
    │   │       ├── Twitter (blue hover)
    │   │       ├── GitHub (gray hover)
    │   │       └── Email (red hover)
    │   │
    │   ├── Column 2: Platform Links
    │   │   ├── Order Food
    │   │   ├── Become a Waiter
    │   │   ├── How It Works
    │   │   └── For Vendors
    │   │
    │   ├── Column 3: Company Links
    │   │   ├── About Us
    │   │   ├── Blog
    │   │   ├── Careers
    │   │   └── Contact
    │   │
    │   └── Column 4: Legal Links
    │       ├── Privacy Policy
    │       ├── Terms of Service
    │       ├── Cookie Policy
    │       └── Safety
    │
    ├── Divider Line (gradient)
    │
    ├── Middle Section
    │   ├── Copyright: "CampusCrave © 2024. Made with ❤️ for Babcock."
    │   │                                              ^
    │   │                                    (animated pulse)
    │   │
    │   └── Admin Links
    │       ├── "Login as Admin"
    │       └── "Privacy"
    │
    ├── Security Badge
    │   └── "🔒 Secure payments via Paystack"
    │
    └── Floating Decorative Elements (xl screens only)
        ├── Floating 🍕 (animated)
        └── Floating 🥤 (animated)

```

## Design Specifications

### Color Scheme
```
Primary Green: #10B981 (emerald-600)
Primary Gradient: from-green-600 to-emerald-600
Accent Yellow: #FCD34D
Background: White, yellow-50, green-50, emerald-50
Text: gray-900, gray-600, gray-700
Borders: gray-100, green-100
```

### Font
- **Family**: Plus Jakarta Sans (all text)
- **Sizes**: 5xl (80px), 6xl (96px), 7xl (112px), 4xl, 3xl, 2xl, xl, lg, base, sm, xs
- **Weights**: 400 (normal), 600 (semibold), 700 (bold), 900 (black)

### Spacing
- **Section Padding**: py-20 to py-32 (80px to 128px)
- **Content Max-Width**: max-w-7xl (80rem)
- **Gap Sizes**: gap-4, gap-6, gap-8

### Border Radius
- **Cards**: rounded-2xl, rounded-3xl, rounded-[32px]
- **Buttons**: rounded-2xl, rounded-full
- **Badges**: rounded-full

### Animations
- **Standard Duration**: 300ms
- **Scroll Trigger**: whileInView
- **Stagger**: 0.1s - 0.2s delays
- **Hover Effects**: scale, translateY, opacity, shadows
- **Transitions**: smooth, cubic-bezier

### Responsive Breakpoints
```
Mobile: < 640px (default)
Tablet: md (768px+)
Desktop: lg (1024px+)
Large: xl (1280px+)
```

## Performance Considerations
- Lazy animations with whileInView (only animate when visible)
- Optimized shadow effects (hover states only)
- Hardware-accelerated transforms (scale, translateY)
- Minimal re-renders with proper component isolation
- Smooth scrolling behavior for horizontal scroll
- No blocking animations on page load

## Accessibility Features
- High contrast ratios for text
- Semantic HTML structure
- Clear visual hierarchy
- Keyboard-friendly navigation
- Touch-friendly tap targets
- Clear button intent and affordance

