# CampusCrave - Testing & Validation Checklist

## ✅ Automated Testing Checklist

### Desktop Browser Testing (1280px and above)

#### Trending Cravings Section
- [ ] All 4 vendor cards display correctly
- [ ] Horizontal scroll works smoothly
- [ ] Scroll arrows appear on hover
- [ ] Cards lift up on hover (-translate-y-2)
- [ ] Shadow expands on hover (shadow-lg → shadow-2xl)
- [ ] Shine effect sweeps across card
- [ ] Image zooms on hover (scale-110)
- [ ] Button grows on hover
- [ ] Rating stars display correctly
- [ ] Badge has animated pulse
- [ ] Price displays in bold green

#### How It Works Section
- [ ] 3-column grid layout displays
- [ ] Huge numbers (01, 02, 03) visible with gradient
- [ ] Icon badges visible with gradients
- [ ] Titles and descriptions are readable
- [ ] Cards lift on hover (-translate-y-4)
- [ ] Bottom accent line animates on hover
- [ ] Icon scale animation on card hover
- [ ] Connector line visible between cards
- [ ] Bottom CTA button visible and hoverable
- [ ] All animations smooth (no jank)

#### Waiter CTA Section
- [ ] Full-width green gradient banner displays
- [ ] Left side text is visible and readable
- [ ] Right side floating cards visible
- [ ] Floating cards animate on banner hover
- [ ] Arrow in button slides on hover
- [ ] Yellow button is prominent and clickable
- [ ] Benefits list properly formatted
- [ ] Shine effect sweeps across banner
- [ ] Background blobs animate smoothly
- [ ] All text readable on gradient background

#### FAQ Section
- [ ] 6 FAQ items display correctly
- [ ] Icons display next to questions
- [ ] Chevron icon visible on each item
- [ ] Click to expand first item by default
- [ ] Answer smoothly expands/collapses
- [ ] Chevron rotates 180° on expand
- [ ] Answer has green gradient background
- [ ] Special badge displays on answer 3
- [ ] Hover effects work on questions
- [ ] Color transitions smooth
- [ ] Bottom CTA button visible

#### Footer Section
- [ ] 4-column layout displays correctly
- [ ] Brand section shows CampusCrave logo
- [ ] Social icons visible and hoverable
- [ ] All link categories visible
- [ ] Links have underline hover animation
- [ ] Bottom section shows copyright
- [ ] Admin and Privacy links visible
- [ ] Security badge displays correctly
- [ ] Floating decorative elements visible (xl+)
- [ ] Heart icon pulses smoothly

---

### Tablet Testing (768px - 1024px)

#### All Sections - Responsive Layout
- [ ] Single column layouts on tablet width
- [ ] Two-column layouts work properly
- [ ] Text sizes scale appropriately
- [ ] Padding adjusts for tablet
- [ ] Touch targets are large enough (44px+)
- [ ] Scroll containers work with touch swipe
- [ ] Buttons are clickable without overlap
- [ ] Images load and display correctly
- [ ] Animations are smooth (no lag)

#### Specific Responsive Checks
- [ ] Trending Cravings: Scroll arrows hidden on md
- [ ] How It Works: Connector line hidden
- [ ] Waiter CTA: Right side cards hidden on smaller screens
- [ ] FAQ: Proper spacing and readability
- [ ] Footer: 2-column layout on tablet

---

### Mobile Testing (< 640px)

#### Overall Layout
- [ ] Page is fully responsive to mobile width
- [ ] No horizontal scrolling required
- [ ] Text is readable without zoom
- [ ] All content accessible without side scroll
- [ ] Top navigation is mobile-friendly
- [ ] Buttons are touch-friendly (min 44px height)
- [ ] Spacing is adequate for touch
- [ ] Images are optimized for mobile

#### Trending Cravings - Mobile
- [ ] Scroll container visible
- [ ] Cards fit within viewport width
- [ ] Swipe scrolling works smoothly
- [ ] Scroll indicator dots visible
- [ ] "Open Now" badge visible
- [ ] Price clearly displayed
- [ ] "Order Now" button is tappable

#### How It Works - Mobile
- [ ] Single column stacked layout
- [ ] Huge numbers visible (may need smaller size)
- [ ] Arrow separators between steps
- [ ] All text readable
- [ ] Cards don't overflow

#### Waiter CTA - Mobile
- [ ] Full-width banner displays
- [ ] Text is readable
- [ ] Floating cards hidden (as designed)
- [ ] Yellow button spans width
- [ ] Benefits list properly spaced
- [ ] No horizontal overflow

#### FAQ - Mobile
- [ ] Questions readable
- [ ] Chevron icon visible and responsive
- [ ] Expand/collapse works on tap
- [ ] Answer displays below question
- [ ] Proper spacing between items
- [ ] Text wraps correctly

#### Footer - Mobile
- [ ] Single column layout
- [ ] All links visible and tappable
- [ ] Social icons in row
- [ ] Copyright centered
- [ ] Links have appropriate spacing
- [ ] No overflow of content

---

## 🎨 Visual Regression Testing

### Color Consistency
- [ ] All green elements use correct shade
- [ ] Gradient transitions are smooth
- [ ] Text contrast is sufficient (WCAG AA minimum)
- [ ] Badge colors match brand guidelines
- [ ] Button colors are consistent

### Typography Testing
- [ ] Plus Jakarta Sans font applied globally
- [ ] Font weights correct (400, 600, 700, 900)
- [ ] Font sizes scale appropriately per breakpoint
- [ ] Line heights provide good readability
- [ ] Text is properly centered/aligned

### Spacing & Layout
- [ ] Section padding consistent (py-20 to py-32)
- [ ] Card spacing even (gap-6, gap-8)
- [ ] Content centered with max-w-7xl
- [ ] Mobile padding appropriate (px-6)
- [ ] Margin between sections adequate

---

## 🎬 Animation Testing

### Framer Motion Animations
- [ ] Entrance animations trigger on scroll
- [ ] Animations don't block interaction
- [ ] Staggered animations look smooth
- [ ] No animation jank on any browser
- [ ] Animations respect reduced motion preference

### Hover Effects (Desktop)
- [ ] All cards respond to hover
- [ ] Scale effects are proportional
- [ ] Shadow effects are visible
- [ ] Color transitions are smooth
- [ ] Multiple effects don't conflict

### Tap/Click Effects (Mobile/Tablet)
- [ ] Buttons provide visual feedback on tap
- [ ] Active state (scale-95) visible
- [ ] No double-tap zoom on buttons
- [ ] Touch response time < 100ms
- [ ] Accordion expand is responsive

### Specific Animations
- [ ] Trending Cravings: Shine effect visible
- [ ] How It Works: Accordion works smoothly
- [ ] Waiter CTA: Parallax floating cards work
- [ ] FAQ: Chevron rotation smooth
- [ ] Footer: Heart pulse continuous

---

## ♿ Accessibility Testing

### WCAG 2.1 Level AA Compliance

#### Color & Contrast
- [ ] Text contrast ratio ≥ 4.5:1 for normal text
- [ ] Text contrast ratio ≥ 3:1 for large text
- [ ] Not relying on color alone for information
- [ ] Links are distinguishable from text

#### Keyboard Navigation
- [ ] Can navigate all interactive elements with Tab
- [ ] Focus order is logical
- [ ] Focus indicator is visible
- [ ] No keyboard traps
- [ ] Can submit forms with keyboard

#### Screen Reader Testing
- [ ] Headings properly nested (h1 → h2, h3)
- [ ] Links have descriptive text (not "click here")
- [ ] Images have alt text or are marked decorative
- [ ] Lists are properly marked up
- [ ] Form labels associated with inputs

#### Motion & Animation
- [ ] Animations don't auto-play for extended duration
- [ ] Can pause/stop animations if needed
- [ ] Reduce motion preferences respected
- [ ] No flashing content (< 3 Hz)

#### Mobile Accessibility
- [ ] Touch targets ≥ 44px x 44px
- [ ] Proper viewport meta tag set
- [ ] Responsive text (not fixed units)
- [ ] Zoom not disabled (maximum-scale not 1)
- [ ] Instructions don't rely on device orientation

---

## 🔍 Cross-Browser Testing

### Chrome/Edge (Latest)
- [ ] All features work
- [ ] Animations smooth
- [ ] Fonts render correctly
- [ ] SVG/Icons display
- [ ] Forms functional

### Firefox (Latest)
- [ ] Layout renders correctly
- [ ] Flexbox alignment proper
- [ ] Gradients display smoothly
- [ ] Animations fluid
- [ ] No console errors

### Safari (Latest)
- [ ] Gradient rendering correct
- [ ] Backdrop blur effect works
- [ ] Animations perform well
- [ ] Fonts display correctly
- [ ] iOS-specific testing on device

### Mobile Browsers
- [ ] Chrome Android
- [ ] Safari iOS
- [ ] Firefox Mobile
- [ ] Samsung Internet

---

## ⚡ Performance Testing

### Page Load Performance
- [ ] Time to First Byte (TTFB) < 1s
- [ ] First Contentful Paint (FCP) < 1.5s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Total page size < 2MB

### Animation Performance
- [ ] Animations run at 60 FPS
- [ ] No frame drops during animations
- [ ] Smooth scrolling (60 FPS)
- [ ] No jank on hover effects
- [ ] Mobile animations smooth (even on older devices)

### Resource Loading
- [ ] Fonts load without layout shift
- [ ] Emoji load without delay
- [ ] CSS applies before animations trigger
- [ ] No render-blocking resources
- [ ] Lazy loading optimized

---

## 🔧 Functionality Testing

### Link Functionality
- [ ] All external links work
- [ ] Admin login link functions
- [ ] Privacy link functions
- [ ] Social links open in new tab
- [ ] Internal links navigate correctly

### Form Submission (if applicable)
- [ ] Form fields validate
- [ ] Error messages display
- [ ] Success feedback shows
- [ ] Data submits correctly

### Interactive Elements
- [ ] FAQ accordion expands/collapses
- [ ] Horizontal scroll works
- [ ] Buttons are clickable
- [ ] Hover states work
- [ ] Mobile menu (if added) works

---

## 📱 Device-Specific Testing

### iPhone Testing
- [ ] iPhone 12, 13, 14, 15 (latest)
- [ ] Layout proper on notch
- [ ] Safe area respected
- [ ] Touch targets adequate
- [ ] Home indicator doesn't interfere

### Android Testing
- [ ] Pixel 6, 7, 8 (latest)
- [ ] Samsung S23 (latest)
- [ ] Layout with navigation bar
- [ ] Notch handling (if present)
- [ ] Touch accuracy

### Tablet Testing
- [ ] iPad (various sizes)
- [ ] Android tablets
- [ ] Landscape orientation
- [ ] Split screen (if applicable)

---

## 🐛 Common Issues Checklist

### Issues to Watch For
- [ ] Font not loading (check CDN)
- [ ] Animations stuttering (reduce simultaneous animations)
- [ ] Scrollbar appearing where hidden (check CSS)
- [ ] Text overflow on smaller screens (check breakpoints)
- [ ] Images not displaying (check paths)
- [ ] Colors not applying (check specificity)
- [ ] Mobile menu cutting off content (check z-index)
- [ ] Animations blocking interaction (use pointer-events-none)

---

## 📊 Testing Environment Setup

### Browser DevTools
- [ ] Responsive Design Mode activated
- [ ] Mobile device emulation enabled
- [ ] Console checked for errors
- [ ] Network tab checked for bottlenecks
- [ ] Performance tab for frame rate analysis

### Testing Tools
- [ ] Google Chrome DevTools
- [ ] Firefox Developer Tools
- [ ] Safari Web Inspector
- [ ] Physical device testing

### Lighthouse Testing
```bash
# Chrome DevTools Lighthouse
1. Open DevTools (F12)
2. Click "Lighthouse" tab
3. Select "Mobile" or "Desktop"
4. Click "Generate report"
5. Check scores for:
   - Performance > 90
   - Accessibility > 95
   - Best Practices > 90
```

---

## 📝 Testing Report Template

```
Browser: Chrome/Firefox/Safari/Mobile
Device: Desktop/Tablet/Mobile (size)
Date: YYYY-MM-DD

PASSED TESTS:
- Test name (component affected)
- Test name (component affected)

FAILED TESTS:
- Test name (component affected) - Issue description

PERFORMANCE METRICS:
- Page Load: X.XXs
- FCP: X.XXs
- LCP: X.XXs
- CLS: X.XX

NOTES:
- Observation 1
- Observation 2
```

---

## 🚀 Pre-Deployment Checklist

Before going to production:
- [ ] All tests passing
- [ ] Console clean (no errors/warnings)
- [ ] Performance score > 90
- [ ] Mobile responsive verified
- [ ] Cross-browser tested
- [ ] Accessibility verified
- [ ] All links functional
- [ ] Content proofread
- [ ] Images optimized
- [ ] Build produces no warnings
- [ ] Environment variables set
- [ ] Analytics installed
- [ ] Error tracking enabled
- [ ] CDN configured
- [ ] Caching headers set
- [ ] Monitoring active

---

## 📞 Support & Debugging

### Common Console Errors & Fixes

**Error: "Framer Motion not found"**
```bash
npm install framer-motion
```

**Error: "Plus Jakarta Sans font not loading"**
```html
<!-- Check index.html has: -->
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
```

**Issue: Animations not triggering**
- Check whileInView is properly configured
- Verify viewport={{ once: true }} if needed
- Check element is actually in viewport

**Issue: Scrollbar still visible**
- Ensure scrollbar is on scroll container only
- Check overflow-y hidden on parent
- Verify CSS classes applied correctly

---

This checklist ensures all 5 sections are production-ready! ✅
