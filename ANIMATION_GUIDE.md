# Premium Animation System Documentation

## Overview
This landing page features a comprehensive animation system with stacked sections, glassmorphism effects, 3D objects, and micro-interactions for a premium, futuristic feel.

## 🎨 Core Components

### 1. **Animation Variants Library** (`src/lib/animations.ts`)
Reusable Framer Motion variants with optimized performance:

- `fadeSlideUp` - Smooth fade & slide entrance
- `staggerContainer` - Staggered children animations
- `scaleIn` - Scale & blur entrance effect
- `parallaxLayer(depth)` - Depth-based parallax
- `floating` - Continuous floating motion
- `cardReveal` - 3D card reveal animation
- `hoverScale`, `hoverLift`, `hoverGlow` - Hover micro-interactions
- `buttonTap` - Button press feedback

**Easing curves:**
- `smooth`: [0.43, 0.13, 0.23, 0.96] - Premium smooth transitions
- `bouncy`: [0.68, -0.55, 0.265, 1.55] - Playful bounce
- `soft`: [0.25, 0.46, 0.45, 0.94] - Subtle easing

### 2. **Floating 3D Objects** (`src/components/Floating3DObject.tsx`)
React Three Fiber 3D elements with scroll interactions:

**Features:**
- Three shape types: `sphere`, `box`, `torus`
- Auto-rotation with scroll parallax
- Distortion material effects
- Premium lighting setup
- Performance optimized with Suspense

**Usage:**
```tsx
<Floating3DObject 
  type="sphere" 
  enableControls={false}
  className="w-full h-full"
/>
```

**Lighting Style:**
- Ambient: 0.5 intensity (base illumination)
- Spotlight: (10,10,10) position, focused beam
- Point light: (-10,-10,-10) fill light
- Directional: (0,5,5) key light

**Scroll Behavior:**
- Rotates based on scroll position
- Floating Y-axis animation
- Configurable `scrollFactor` parameter

### 3. **Glassmorphism Cards** (`src/components/GlassmorphismCard.tsx`)
Modern frosted glass effect cards:

**Variants:**
- `light` - White transparent (bg-white/10)
- `dark` - Black transparent (bg-black/20)
- `accent` - Accent colored (bg-accent/10)

**Blur Levels:**
- `sm`, `md`, `lg`, `xl` - Backdrop blur intensity

**Features:**
- Shine effect on hover
- Automatic reveal animation
- Hover lift effect
- Border glow transitions

**Usage:**
```tsx
<GlassmorphismCard 
  variant="light" 
  blur="xl"
  hoverable={true}
  animate={true}
>
  {/* Your content */}
</GlassmorphismCard>
```

### 4. **Stacked Sections** (`src/components/StackedSection.tsx`)
Layered sections with parallax depth:

**Features:**
- Parallax scrolling based on depth (0-3)
- Scale transform on scroll
- Opacity fade transitions
- Sticky positioning option
- Automatic depth gradients

**Depth Levels:**
- `0` - No parallax (static)
- `1` - Subtle depth
- `2` - Medium depth
- `3` - Strong depth effect

**Usage:**
```tsx
<StackedSection 
  depth={2}
  sticky={true}
  backgroundColor="bg-background"
>
  {/* Section content */}
</StackedSection>
```

### 5. **Premium Hero** (`src/components/PremiumHero.tsx`)
Full-featured hero section with:

**Elements:**
- Animated gradient orbs (pulsing background)
- Floating grid pattern overlay
- Two 3D objects (sphere + torus)
- Animated badges with icons
- Gradient text with shimmer effect
- CTA buttons with shine animation
- Glassmorphism stat cards
- Scroll indicator animation

**Performance Optimizations:**
- useTransform for GPU-accelerated parallax
- Conditional rendering for mobile
- Optimized 3D object sizes

### 6. **Animated Feature Cards** (`src/components/AnimatedFeatureCard.tsx`)
Feature cards with premium interactions:

**Features:**
- Icon with glow effect
- Hover scale & rotation
- Title color transition
- Animated accent line on hover
- Staggered entrance animation

### 7. **Animated Badges** (`src/components/AnimatedBadge.tsx`)
Floating badges with micro-interactions:

**Variants:**
- `primary` - Accent gradient
- `secondary` - Foreground gradient
- `accent` - Solid accent

**Animations:**
- Spring entrance animation
- Scale & lift on hover
- Optional floating motion
- Configurable delay

## 🎬 Animation Techniques

### Stacked Section Transitions
Each section layers over the previous one with:
1. Scale transformation (0.95 → 1 → 0.95)
2. Opacity fade (0.5 → 1 → 0.5)
3. Parallax Y-axis movement
4. Depth-based blur

### Parallax Depth System
```
depth=0: No movement
depth=1: 100px down → -50px up
depth=2: 200px down → -100px up
depth=3: 300px down → -150px up
```

### Micro-interactions
- **Buttons**: Scale on tap (0.95), shine on hover
- **Cards**: Lift (-8px), scale (1.02), shadow increase
- **Icons**: Rotate & scale on hover
- **Badges**: Floating animation, scale on hover

### Scroll-Based Triggers
```tsx
viewport={{ 
  once: true,      // Animate only once
  amount: 0.3      // Trigger at 30% visibility
}}
```

## 🎨 Visual Style Guide

### Gradients
```css
/* Hero Background */
bg-gradient-to-br from-background via-background to-accent/5

/* Accent Text */
bg-gradient-to-r from-accent via-accent/80 to-accent/60

/* CTA Section */
bg-gradient-to-br from-accent/10 via-background to-accent/5
```

### Shadows & Glows
```css
/* Card Shadow */
shadow-2xl

/* Accent Glow */
shadow-xl shadow-accent/20

/* Hover Glow */
box-shadow: 0 0 30px rgba(214, 129, 79, 0.6)
```

### Glass Effect Formula
```css
backdrop-blur-xl        /* Blur intensity */
bg-white/10            /* Transparent background */
border border-white/20 /* Subtle border */
```

## 🚀 Performance Optimizations

1. **GPU Acceleration**
   - All transforms use `transform` (not top/left)
   - Opacity changes for fades
   - will-change on animations

2. **Lazy Loading**
   - 3D objects wrapped in Suspense
   - Conditional rendering for mobile
   - Images with loading states

3. **Animation Throttling**
   - `once: true` for entrance animations
   - useTransform for scroll parallax
   - RequestAnimationFrame in Three.js

4. **Mobile Responsiveness**
   - 3D objects hidden on small screens
   - Reduced animation complexity
   - Touch-optimized interactions

## 📱 Mobile Optimizations

### Breakpoints
```tsx
sm:  640px  - Small tablets
md:  768px  - Tablets
lg:  1024px - Desktops (3D objects show)
xl:  1280px - Large desktops
```

### Mobile Adjustments
- Simplified animations (reduced motion)
- No 3D objects below `lg` breakpoint
- Stack grids vertically
- Reduced blur intensity
- Smaller font sizes

## 🎯 Best Practices

### Adding New Sections
1. Wrap in `<StackedSection>`
2. Increment depth value (1, 2, 3...)
3. Use `staggerContainer` for multiple elements
4. Apply `fadeSlideUp` to children
5. Add `viewport={{ once: true }}`

### Creating New Animations
1. Define in `src/lib/animations.ts`
2. Export as const
3. Use with `variants` prop
4. Consider mobile performance

### 3D Object Placement
- Hero: Large objects (400px+)
- Sections: Medium (250-350px)
- Background: Large, low opacity (0.2-0.3)
- Always hidden on mobile

## 🛠️ Customization

### Adjusting Animation Speed
Edit in `src/lib/animations.ts`:
```tsx
duration: 0.8  // Increase for slower
```

### Changing 3D Materials
In `Floating3DObject.tsx`:
```tsx
<MeshDistortMaterial
  color="#YOUR_COLOR"
  distort={0.4}        // 0-1, distortion amount
  speed={2}            // Animation speed
  roughness={0.3}      // 0-1, surface roughness
  metalness={0.8}      // 0-1, metallic appearance
/>
```

### Modifying Parallax Depth
In component:
```tsx
<StackedSection depth={2}> // 0-3
```

## 📦 Dependencies

```json
{
  "@react-three/fiber": "^8.17.10",
  "@react-three/drei": "^9.114.3",
  "three": "^0.x.x",
  "framer-motion": "^12.23.24"
}
```

## 🎨 Color Scheme
Based on vintage theme with warm tones:
- Primary: HSL(18, 65%, 52%) - Burnt orange
- Background: HSL(35, 25%, 92%) - Soft cream
- Accent: HSL(18, 65%, 52%) - Terracotta

## 📄 Files Structure

```
src/
├── lib/
│   └── animations.ts          # Animation variants
├── components/
│   ├── PremiumHero.tsx        # Hero section
│   ├── Floating3DObject.tsx   # 3D elements
│   ├── GlassmorphismCard.tsx  # Glass cards
│   ├── StackedSection.tsx     # Section wrapper
│   ├── AnimatedFeatureCard.tsx # Feature cards
│   └── AnimatedBadge.tsx      # Badges
└── pages/
    └── Index.tsx              # Main landing page
```

## 🎬 Animation Timeline

**Hero Section (0-2s):**
- 0s: Background fades in
- 0.2s: Badges appear (staggered)
- 0.4s: Title fades & slides up
- 0.6s: Subtitle appears
- 0.8s: Buttons reveal
- 1.0s: Stat cards animate in
- 1.5s: 3D objects fade in

**Section Scroll:**
- Parallax starts when 30% visible
- Stagger children every 0.15s
- Complete animation in 0.8s per element

---

**Created for:** Chandan Trading Company
**Style:** Premium, Futuristic, Modern
**Framework:** React + Framer Motion + Three.js

