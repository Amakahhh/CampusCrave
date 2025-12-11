# Advanced Styling & Animation Guide

## 1. TRENDING CRAVINGS - Advanced Features

### Card Hover Effects
```jsx
{/* Card Container - Advanced Multi-layered Effects */}
.group {
  // Base effect: lift on hover
  hover:-translate-y-2 (move up 8px)
  
  // Shadow expansion: subtle → prominent
  shadow-lg → hover:shadow-2xl
  
  // Image section zoom
  .image-section: hover:scale-110 (zoom 10%)
  
  // Shine effect overlay
  .shine-effect: 
    - opacity-0 → group-hover:opacity-20
    - Slides across card with skew animation
    
  // Button scale effect
  .button: group-hover:scale-105 (grow 5%)
  
  // Nested animations
  button: origin-bottom (grows from bottom)
}
```

### Scroll Container
```jsx
// Hidden scrollbar using Tailwind utilities
[&::-webkit-scrollbar]:hidden      // Webkit browsers
[-ms-overflow-style]:none          // IE/Edge
[overflow-y]:hidden                // Hide Y scrollbar

// Smooth scroll behavior
scroll-smooth                       // Native smooth scrolling
```

### Badge Animation
```jsx
// Live indicator badge
<div className="animate-pulse">
  {/* Pulse effect: opacity 1 → 0.5 → 1, 2s cycle */}
</div>
```

---

## 2. HOW IT WORKS - Typography & Animation

### Huge Number Typography
```jsx
// Massive semi-transparent numbers as background
<div className="text-9xl font-black bg-gradient-to-br from-blue-500 to-cyan-500 bg-clip-text text-transparent opacity-15">
  01
</div>
```

The opacity-15 creates a watermark effect that doesn't overwhelm content.

### Card Animations
```jsx
// Staggered entrance animation
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ delay: index * 0.2 }}
// Results in: Card 1 at 0ms, Card 2 at 200ms, Card 3 at 400ms

// Hover lift with shadow
hover:-translate-y-4              // Move up 16px
hover:shadow-2xl                  // Large shadow drop

// Bottom accent line animation
.accent-line:
  scale-x-0 → group-hover:scale-x-100
  transform scale-x
  transition-transform duration-300
  // Line grows from left to right on hover
```

### Icon Badge Animation
```jsx
.badge:
  group-hover:scale-110
  transition-transform duration-300
  // Icon grows 10% on card hover
```

### Connector Lines
```jsx
// Desktop only connector
.connector-line:
  hidden md:block
  h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent
  // Subtle gray line with transparent ends
```

---

## 3. WAITER CTA - Dynamic Visual Effects

### Banner Hover Effects
```jsx
onMouseEnter={() => setIsHovered(true)}
onMouseLeave={() => setIsHovered(false)}

// When hovered:
- Floating blobs translate (translate-x-16 from translate-x-32)
- Background particles move toward center
- Shine effect sweeps across banner
- Card animations trigger (float up/down)
- Arrow indicator in button slides right
- Text scales up (1 → 1.05)
```

### Floating Cards Illustration
```jsx
// Card 1: Earnings
animate={{
  y: isHovered ? -10 : 0,        // Floats up 10px
  rotate: -5,                     // Slight tilt
  scale: 1.05,                    // Grows 5%
}}
transition={{ duration: 0.5 }}

// Card 2: Stats
animate={{
  y: isHovered ? 10 : 0,         // Floats down 10px
  rotate: 5,                      // Tilt opposite direction
  scale: 1,                       // Stays normal
}}

// Creates depth illusion with parallax effect
```

### Glass Morphism Cards
```jsx
bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl
// Creates frosted glass effect with slight transparency
```

### Button Animation
```jsx
whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
whileTap={{ scale: 0.95 }}
// Grows on hover, shrinks on click for tactile feedback

// Arrow indicator
animate={{ x: isHovered ? 10 : 0 }}
// Slides right when banner is hovered
```

### Shine Effect
```jsx
// Animated gradient sweep across entire banner
animate={{ x: isHovered ? '100%' : '-100%' }}
transition={{ duration: 0.6 }}
className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent w-96"

// Creates light sweep effect that travels left to right
```

---

## 4. FAQ SECTION - Accordion Interactions

### Expand/Collapse Animation
```jsx
// Button click triggers expansion
expandedIndex === index ? expand : collapse

// Smooth height animation
initial={{ opacity: 0, height: 0, marginTop: 0 }}
animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
exit={{ opacity: 0, height: 0, marginTop: 0 }}
transition={{ duration: 0.3 }}

// Result: Content gracefully expands/collapses with opacity fade
```

### Chevron Rotation
```jsx
<motion.div
  animate={{ rotate: expandedIndex === index ? 180 : 0 }}
  transition={{ duration: 0.3 }}
>
  <ChevronDown />
</motion.div>

// Rotates 180° when expanded, smooth transition
```

### Color Transitions
```jsx
// Question button on hover
group-hover:text-green-600        // Changes text color
transition-colors duration-300    // Smooth color transition

// Background on hover
absolute inset-0 bg-gradient-to-r from-green-100 to-emerald-100
opacity-0 group-hover:opacity-100
// Background fades in behind accordion item
```

### Answer Content Animation
```jsx
// Answer appears with staggered animation
initial={{ opacity: 0, y: -10 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -10 }}
transition={{ delay: 0.1 }}

// Answer appears AFTER expand animation completes
// Smooth fade-in with slight upward movement
```

### Badge Animation
```jsx
// Special badge for answer 3 appears after answer
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.2 }}

// Appears after answer content, with positive feedback
```

---

## 5. FOOTER - Micro-interactions

### Link Underline Animation
```jsx
<span className="relative">
  {text}
  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
</span>

// Underline grows from left to right on hover
// Width: 0 → 100% (full width)
// Smooth 300ms transition
```

### Social Icon Animation
```jsx
whileHover={{ scale: 1.2, y: -4 }}  // Grow 20% and float up
whileTap={{ scale: 0.95 }}          // Shrink on click
transition={{ duration: 0.3 }}

// Hoverable social buttons with tactile feedback
```

### Animated Heart Icon
```jsx
<motion.span
  animate={{ scale: [1, 1.3, 1] }}
  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
>
  <Heart className="fill-red-500" />
</motion.span>

// Heartbeat effect: 0.6s animation, repeats every 2.6s
// Creates emotional, brand-aligned effect
```

### Floating Decorative Elements
```jsx
// Right side floating pizza (xl screens only)
<motion.div
  animate={{ y: [0, -20, 0] }}
  transition={{ duration: 3, repeat: Infinity }}
  className="text-4xl opacity-10 pointer-events-none"
>
  🍕
</motion.div>

// Gentle up-down bobbing motion
// Very low opacity so it's decorative, not intrusive
// Infinite loop with 3s cycle
```

---

## Advanced Responsive Techniques

### Mobile Optimization

```jsx
// Hidden on mobile, visible on md+
className="hidden md:flex"
className="hidden lg:block"
className="block md:hidden"

// Text size scaling
className="text-4xl md:text-5xl lg:text-6xl"

// Padding adjustments
className="px-6 md:px-8 lg:px-16"
className="py-20 md:py-24 lg:py-32"

// Grid to stacked
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Gap adjustments
className="gap-4 md:gap-6 lg:gap-8"
```

### Touch-Friendly Interactions
```jsx
// Larger tap targets on mobile
className="px-6 py-4 md:px-8 md:py-5"

// Removed hover-only states on mobile
className="hover:scale-105" // Only on desktop with mouse
// Mobile gets active:scale-95 for feedback

// Simplified animations on smaller screens
// Fewer simultaneous animations to prevent jank
```

---

## Performance Optimization

### Animation Best Practices
```jsx
// Only animate when visible
whileInView={{ /* animate */ }}
viewport={{ once: true }}
// Prevents off-screen rendering

// Use transform properties (GPU accelerated)
// ✅ transform, opacity, scale, rotate
// ❌ width, height, left, right (causes layout shift)

// Stagger animations to reduce jank
transition={{ delay: index * 0.1 }}
// Spreads animation load over time

// Use will-change sparingly
// Only on elements that will definitely animate
```

### Shadow Effects
```jsx
// Shadow on hover only (not default)
shadow-lg hover:shadow-2xl transition-shadow

// Prevents cumulative shadow rendering
// Only renders expensive shadow when needed
```

### Scroll Performance
```jsx
// Hidden scrollbar is GPU-efficient
[&::-webkit-scrollbar]:hidden

// Smooth scrolling
scroll-smooth

// Passive event listeners (handled by browser)
```

---

## Color Gradients Used

### Primary Gradients
```css
from-green-600 to-emerald-600      /* Main brand gradient */
from-green-500 to-emerald-600      /* Buttons */
from-yellow-300 to-yellow-400      /* Accents */
```

### Step Gradients (How It Works)
```css
from-blue-500 to-cyan-500          /* Step 1: Browse */
from-purple-500 to-pink-500        /* Step 2: Pay */
from-green-500 to-emerald-500      /* Step 3: Relax */
```

### Background Gradients
```css
to-yellow-50/50                    /* Section backgrounds */
from-white to-yellow-50/50         /* Subtle fades */
from-green-50/50 to-white          /* Decorative backgrounds */
```

### Text Gradients
```jsx
bg-gradient-to-r from-green-600 to-emerald-600
bg-clip-text text-transparent
/* Creates gradient text effect */
```

---

## Conclusion

These sections showcase:
- **Advanced animation patterns** with Framer Motion
- **Layered hover effects** for depth
- **Thoughtful color gradients** for brand consistency
- **Mobile-first responsive design** with device-specific optimizations
- **Performance-conscious animations** using GPU acceleration
- **Accessible interactions** with clear visual feedback
- **Unique micro-interactions** that delight without overwhelming
- **Professional polish** in every detail

The design is intentionally NOT generic—it combines sophisticated techniques like parallax cards, sweep animations, glass morphism, and staggered transitions to create a premium, modern experience that engages users while maintaining excellent performance across all devices.
