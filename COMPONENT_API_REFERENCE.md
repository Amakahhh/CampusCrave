# CampusCrave - Visual Reference & Component API

## Section 1: Trending Cravings

### Component API
```jsx
<TrendingCravings />
```

### Props
None (data is hardcoded in component, ready to be refactored to props/API)

### Vendor Card Object Structure
```javascript
{
  id: number,
  name: string,           // "Mama T's Kitchen"
  image: string,          // Emoji: "🍲"
  rating: number,         // 4.8
  reviews: number,        // 324
  avgPrice: number,       // 1500 (naira)
  cuisine: string,        // "Nigerian"
}
```

### Key Classes
```
Container:        max-w-7xl, py-24, px-6
Scroll Container: flex gap-6 overflow-x-auto scroll-smooth
Card:             flex-shrink-0 w-72 rounded-[32px] bg-white
Image Section:    h-48 (60% of card height)
Content Section:  p-6 flex-grow
Button:           w-full py-3 rounded-xl font-bold
```

### Customization Points
```jsx
// Add more vendors
const vendors = [
  // Existing vendors...
  {
    id: 5,
    name: "New Vendor",
    image: "🥘",
    rating: 4.5,
    reviews: 150,
    avgPrice: 1300,
    cuisine: "Type",
  }
]

// Change button text
<button className="...">Custom Text</button>

// Adjust card width
w-72    →    w-80 (larger)
```

---

## Section 2: How It Works

### Component API
```jsx
<HowItWorks />
```

### Props
None

### Step Object Structure
```javascript
{
  number: string,         // "01", "02", "03"
  title: string,          // "Browse", "Pay", "Relax"
  description: string,    // Full description text
  icon: string,           // Emoji: "🔍", "💳", "🚀"
  gradient: string,       // Tailwind gradient: "from-blue-500 to-cyan-500"
}
```

### Key Classes
```
Container:        max-w-7xl, py-32, px-6
Grid:             grid grid-cols-1 md:grid-cols-3
Number:           text-9xl font-black opacity-15
Icon Badge:       p-4 rounded-2xl (gradient background)
Card:             rounded-3xl border border-gray-100
Connector Line:   hidden md:block h-1 (gradient)
```

### Customization Points
```jsx
// Add new step
const steps = [
  // Existing steps...
  {
    number: "04",
    title: "Track",
    description: "Follow your order in real-time",
    icon: "📍",
    gradient: "from-orange-500 to-red-500",
  }
]

// Change number size
text-9xl    →    text-8xl (smaller)
text-9xl    →    text-[10rem] (larger)

// Change gradient
from-blue-500 to-cyan-500    →    your-gradient-colors
```

---

## Section 3: Waiter CTA

### Component API
```jsx
<WaiterCTA />
```

### Props
None (internal state with useState)

### State
```javascript
const [isHovered, setIsHovered] = useState(false)
// Triggers animations when banner is hovered
```

### Key Classes
```
Banner:           full-width relative group overflow-hidden
Background:       bg-gradient-to-br from-green-600 to-green-700
Content:          px-8 md:px-16 py-20 md:py-28
Left Section:     flex-1 text-center md:text-left
Right Section:    flex-1 hidden md:block
Button:           px-16 py-5 bg-yellow-300 rounded-2xl
```

### Floating Cards Object Structure
```javascript
{
  title: string,          // "EARNINGS THIS WEEK"
  value: string,          // "₦12,400"
  subtitle: string,       // "32 deliveries completed"
  position: string,       // absolute positioning
  icon?: string,          // Optional emoji
}
```

### Customization Points
```jsx
// Change banner gradient
bg-gradient-to-br from-green-600 to-green-700
→ bg-gradient-to-br from-blue-600 to-blue-700

// Modify button color
bg-yellow-300    →    bg-yellow-400 (darker)

// Change floating card values
{/* Card 1 */}
<div>₦12,400</div>    →    <div>₦{dynamicValue}</div>

// Adjust hover animations
y: isHovered ? -10 : 0    →    y: isHovered ? -20 : 0 (more float)
```

---

## Section 4: FAQ Section

### Component API
```jsx
<FAQSection />
```

### Props
None

### State
```javascript
const [expandedIndex, setExpandedIndex] = useState(0)
// 0 = first item expanded by default
// -1 = all collapsed
```

### FAQ Object Structure
```javascript
{
  question: string,       // "Do you deliver to all halls?"
  answer: string,         // Full answer text
  icon: string,           // Emoji: "📍", "💳", etc.
}
```

### Key Classes
```
Container:            max-w-4xl, py-32, px-6
FAQ Items:            space-y-4 md:space-y-5
Question Button:      w-full px-6 md:px-8 py-6
Answer Container:     px-6 md:px-8 py-6
Chevron Icon:         w-6 h-6 (rotates on expand)
```

### Customization Points
```jsx
// Add new FAQ
const faqs = [
  // Existing FAQs...
  {
    question: "How do I contact support?",
    answer: "You can reach us 24/7 via...",
    icon: "📞",
  }
]

// Change default expanded item
useState(0)    →    useState(2) (expand third item)
useState(0)    →    useState(-1) (all collapsed)

// Customize answer styling
className="text-gray-700"    →    className="text-gray-600"

// Add more icons
📍, 💳, 💰, ⚡, 🗓️, ↩️    →    🎯, 🔧, ❓, etc.
```

### Special Features
```jsx
// Answer 3 has a special badge
{index === 2 && (
  <div className="bg-green-100 text-green-700">
    💚 That's it! No hidden charges.
  </div>
)}
// Add custom badges to other answers by adding similar logic
```

---

## Section 5: Footer

### Component API
```jsx
<Footer />
```

### Props
None

### Link Category Object Structure
```javascript
{
  category: string,       // "Platform", "Company", "Legal"
  items: [
    {
      label: string,      // "Order Food"
      href: string,       // "/student/login"
    }
  ]
}
```

### Social Link Object Structure
```javascript
{
  icon: Component,        // Twitter, Github, Mail (from lucide-react)
  label: string,          // "Twitter"
  href: string,           // "#twitter"
  color: string,          // Tailwind: "hover:text-blue-400"
}
```

### Key Classes
```
Container:          max-w-7xl, px-6, py-20
Top Section:        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
Links:              space-y-3
Social Icons:       flex gap-4
Bottom Section:     flex flex-col md:flex-row
Security Badge:     inline-flex items-center gap-2
```

### Customization Points
```jsx
// Add new link category
const links = [
  // Existing categories...
  {
    category: 'Resources',
    items: [
      { label: 'Blog', href: '#blog' },
      { label: 'Guide', href: '#guide' },
    ]
  }
]

// Add new social link
const socialLinks = [
  // Existing links...
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: '#linkedin',
    color: 'hover:text-blue-600'
  }
]

// Change copyright year (auto-calculated)
// Already uses: new Date().getFullYear()

// Customize floating emojis
🍕 (pizza)    →    🌮 (taco)
🥤 (drink)    →    🍔 (burger)
```

### Accessibility Features
```jsx
// All links are semantic <a> tags
// Proper heading hierarchy with <h4>
// Icons are decorative (no alt text needed)
// Footer is semantic <footer> element
```

---

## Global Animation Patterns

### Scroll Entrance Animation (Used in All Sections)
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}      // Fade in + slide up
  whileInView={{ opacity: 1, y: 0 }}   // Final state
  viewport={{ once: true }}             // Animate only once
  transition={{ delay: index * 0.1 }}  // Stagger each item
>
  {/* Content */}
</motion.div>
```

### Hover Scale Animation (Buttons)
```jsx
whileHover={{ scale: 1.05 }}    // Grow 5%
whileTap={{ scale: 0.95 }}      // Shrink on click
transition={{ duration: 0.3 }}  // Smooth 300ms
```

### Chevron Rotation (FAQ)
```jsx
animate={{ rotate: isExpanded ? 180 : 0 }}
transition={{ duration: 0.3 }}
```

### Color Transition (Hover Effects)
```jsx
className="text-gray-600 hover:text-green-600 transition-colors duration-300"
```

### Smooth Expand/Collapse
```jsx
initial={{ opacity: 0, height: 0, marginTop: 0 }}
animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
exit={{ opacity: 0, height: 0, marginTop: 0 }}
transition={{ duration: 0.3 }}
```

---

## Tailwind Utility Classes Quick Reference

### Colors Used
```
Green:          green-50 to green-700
Emerald:        emerald-50 to emerald-700
Yellow:         yellow-50 to yellow-400
Blue:           blue-100 to blue-500
Purple:         purple-500
Pink:           pink-500
Orange:         orange-100
Gray:           gray-50 to gray-900
```

### Sizing
```
Text:           text-xs to text-9xl
Padding:        px-4 to px-16, py-2 to py-32
Width:          w-2 to w-96
Height:         h-1 to h-96
Gap:            gap-2 to gap-8
```

### Effects
```
Shadow:         shadow-lg to shadow-2xl
Opacity:        opacity-0 to opacity-100
Blur:           blur-xl, blur-3xl
Rounded:        rounded-full, rounded-2xl, rounded-3xl, rounded-[32px]
```

### Responsive Prefixes
```
sm:             640px and up
md:             768px and up
lg:             1024px and up
xl:             1280px and up
```

---

## Animation Timing Reference

Standard durations:
```
Fast:           150ms, 200ms
Normal:         300ms, 400ms
Slow:           500ms, 600ms
Very Slow:      1s, 1.5s, 2s, 3s
```

Standard delays:
```
Immediate:      0ms
Stagger:        index * 0.1s (100ms between items)
Stagger Slow:   index * 0.2s (200ms between items)
Sequential:     index * 0.3s, 0.4s, etc.
```

---

## Component Export Statements

All components are default exports:
```jsx
export default TrendingCravings
export default HowItWorks
export default WaiterCTA
export default FAQSection
export default Footer
```

Import them in LandingPage:
```jsx
import TrendingCravings from '../components/TrendingCravings'
import HowItWorks from '../components/HowItWorks'
import WaiterCTA from '../components/WaiterCTA'
import FAQSection from '../components/FAQSection'
import Footer from '../components/Footer'
```

---

## Performance Tips

### To improve performance:
1. **Lazy load images** (when using real images instead of emojis)
2. **Code-split components** using React.lazy()
3. **Memoize expensive components** with React.memo()
4. **Optimize animations** on lower-end devices
5. **Use native CSS for simple effects** instead of JS animations

### Current optimizations already in place:
✅ `whileInView` prevents animating off-screen elements  
✅ `once: true` prevents re-triggering animations  
✅ GPU-accelerated transforms (scale, translateY)  
✅ Staggered animations reduce rendering spike  
✅ Hidden scrollbars improve visual performance  

---

This guide covers all customizable aspects of the 5 sections!
