# Mobile Website Revamp - SKZ Peptides

## Plan

### 1. MobileHome.jsx - Add animations & layout improvements
- [ ] Add framer-motion imports and wrap sections with motion components (fade-in, stagger)
- [ ] Categories: add tap scale effect (`whileTap`) and subtle shadow on press
- [ ] Featured products: change from `grid-cols-1` to `grid-cols-2` layout
- [ ] Free Essential Kit: redesign as a compact, cleaner card with gradient border
- [ ] Add Free Shipping promo banner (matching desktop's style, mobile-adapted)
- [ ] Quick Actions: add gradient backgrounds, icons, and motion hover effects

### 2. MobileProductCard.jsx - Redesign for 2-column grid
- [ ] Make image aspect-ratio based instead of fixed `h-48`
- [ ] Tighter padding (p-3 instead of p-4)
- [ ] Smaller text sizes for compact grid cards
- [ ] Larger, more touch-friendly add-to-cart button (min 44px)
- [ ] Remove description text (too cramped in 2-col), keep name + price + category

### 3. MobileHeader.jsx - Frosted glass + slide-in menu
- [ ] Add `backdrop-blur-lg bg-white/80 dark:bg-gray-900/80` for frosted glass effect
- [ ] Menu overlay: change from instant appear to slide-in from right with framer-motion
- [ ] Bottom nav: add frosted glass effect to match

### 4. MobileProducts.jsx - 2-column grid + horizontal category chips
- [ ] Replace filter button with horizontal scrolling category chips
- [ ] Change product grid from single column (`space-y-4`) to `grid-cols-2 gap-3`
- [ ] Keep search bar, remove filter modal (categories inline now)

### 5. MobileProductDetail.jsx - Full-width image + sticky cart bar
- [ ] Make image full-width (remove padding/container)
- [ ] Add sticky bottom add-to-cart bar (fixed, always visible)
- [ ] Remove the inline add-to-cart button (replaced by sticky bar)
- [ ] Better tab content spacing

### 6. MobileCart.jsx - Tighten spacing + subtle animations
- [ ] Add framer-motion for item enter/exit animations
- [ ] Tighten card spacing and padding
- [ ] Add subtle scale animation on quantity change

### 7. Build verification
- [ ] Run `npm run build` to verify everything compiles

## Review
_(To be filled after implementation)_
