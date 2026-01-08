# 🎨 CampusCrave Brand Colors

## Primary Color (Main Brand)
**Name**: Maroon Red  
**Hex**: `#8B2635`  
**RGB**: `rgb(139, 38, 53)`  
**Tailwind**: `primary`  
**Usage**: Primary buttons, headings, brand accents, CTAs

**Example**: 
```jsx
<button className="bg-primary text-white">Order Now</button>
<h1 className="text-primary">CampusCrave</h1>
```

---

## Secondary Color (Accent/Complement)
**Name**: Berry Pink  
**Hex**: `#A23B72`  
**RGB**: `rgb(162, 59, 114)`  
**Tailwind**: `secondary`  
**Usage**: Secondary buttons, highlight accents, decorative elements

**Example**:
```jsx
<button className="bg-secondary text-white">Earn Money</button>
<div className="border-secondary">Featured Vendor</div>
```

---

## Dark Accent Color (Deep Burgundy)
**Name**: Deep Burgundy  
**Hex**: `#5C1A1F`  
**RGB**: `rgb(92, 26, 31)`  
**Tailwind**: `accent`  
**Usage**: Hover states, borders, subtle backgrounds, dark text on light backgrounds

**Example**:
```jsx
<button className="bg-primary hover:bg-accent">CTA Button</button>
<span className="text-accent">Small labels</span>
```

---

## Supporting Colors

### Background
**Hex**: `#F5F5F5`  
**RGB**: `rgb(245, 245, 245)`  
**Tailwind**: `background`  
**Usage**: Page backgrounds, section backgrounds

### Surface
**Hex**: `#FFFFFF`  
**RGB**: `rgb(255, 255, 255)`  
**Tailwind**: `surface`  
**Usage**: Cards, containers, glass morphism base

### Text
**Hex**: `#2D2D2D`  
**RGB**: `rgb(45, 45, 45)`  
**Tailwind**: `text`  
**Usage**: Body text, default text color

---

## Glass Morphism Palette

These are the **derived colors** used throughout the app for the glass effect:

### Glass Light (Primary-based)
```css
background-color: rgba(139, 38, 53, 0.2);  /* bg-primary/20 */
border-color: rgba(255, 255, 255, 0.3);    /* border-white/30 */
backdrop-filter: blur(10px);
```
**Usage**: Buttons, input fields, light glass containers

### Glass Medium (Visibility)
```css
background-color: rgba(255, 255, 255, 0.4);  /* bg-white/40 */
border-color: rgba(255, 255, 255, 0.4);      /* border-white/40 */
backdrop-filter: blur(10px);
```
**Usage**: FAQ cards, prominent sections, high visibility needs

### Glass Hover
```css
background-color: rgba(139, 38, 53, 0.3);  /* bg-primary/30 */
border-color: rgba(255, 255, 255, 0.5);    /* border-white/50 */
```
**Usage**: Button hover states, interactive elements

---

## Color Combinations (Approved Pairings)

### For Text on Primary Background
- **Text**: White (#FFFFFF)
- **Hover**: Accent (#5C1A1F)

### For Text on Secondary Background
- **Text**: White (#FFFFFF)
- **Hover**: Primary (#8B2635)

### For CTAs (Buttons)
- **Primary**: Maroon (#8B2635) with white text
- **Secondary**: Berry Pink (#A23B72) with white text
- **Ghost**: White text on transparent glass background

### For Badges/Labels
- **Success**: Use Primary (#8B2635)
- **Pending**: Use Secondary (#A23B72)
- **Error**: Use Accent (#5C1A1F)

---

## Usage Examples Across Pages

### Student Pages
- **Order Button**: Primary maroon background, white text
- **Vendor Cards**: Glass container with border-white/40
- **Cart Button**: Primary with floating animation
- **Order Status Timeline**: Icons in Primary, text in dark gray

### Waiter Pages
- **Claim Order Button**: Primary background, white text
- **Wallet Card**: Glass morphism with Secondary accent
- **Online Toggle**: Primary when active
- **Earnings Display**: Secondary text for amount

### Admin Pages
- **Dashboard Stats**: Cards in glass with Primary border
- **Approve Button**: Primary
- **Reject Button**: Accent (deep burgundy)
- **Charts**: Use Primary and Secondary for data visualization

---

## Dark Mode (Future)
When implementing dark mode, these will invert:
- Primary: `#8B2635` → `#FF6B7A` (lighter)
- Secondary: `#A23B72` → `#FF88C5` (lighter)
- Text: `#2D2D2D` → `#F5F5F5` (inverted)
- Background: `#F5F5F5` → `#1A1A1A` (dark)

---

## Quick Reference (For Backend/API Docs)

If designing status badges or payment UIs outside React:

| Color | Hex | Use Case |
|-------|-----|----------|
| Primary | #8B2635 | Main CTA, active states |
| Secondary | #A23B72 | Earn/Waiter features |
| Accent | #5C1A1F | Hover, emphasis |
| Background | #F5F5F5 | Page/section bg |
| Surface | #FFFFFF | Cards, containers |
| Text | #2D2D2D | Body text |

---

## Implementation Checklist

When building new pages:

- [ ] All buttons use Primary or Secondary as background
- [ ] All text uses #2D2D2D or white (not arbitrary grays)
- [ ] Glass containers use `bg-white/40 backdrop-blur-lg border border-white/40`
- [ ] Hover states darken to Accent (#5C1A1F)
- [ ] Icons use Lucide React in Primary color
- [ ] Gradients use Primary → Secondary
- [ ] No hardcoded colors (use Tailwind classes)
- [ ] Responsive design maintains color contrast (WCAG AA minimum)

---

**Color Palette Created**: December 22, 2025  
**Brand Identity**: CampusCrave - Premium, Modern, Food Delivery for Students
