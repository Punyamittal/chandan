# Advanced Animation System Documentation

## 🎨 Multi-Theme Color System

### Available Themes

#### 1. **Dark Neon** - Cyberpunk Aesthetic
```typescript
Colors: Deep black background with neon purple, pink, and cyan accents
Use Case: Tech products, gaming, futuristic brands
Mood: Energetic, modern, edgy
```

#### 2. **Pastel Gradient** - Soft & Dreamy
```typescript
Colors: Light backgrounds with soft pink, blue, and lavender gradients
Use Case: Creative agencies, lifestyle brands, fashion
Mood: Gentle, approachable, artistic
```

#### 3. **Soft Glass** - Glassmorphism
```typescript
Colors: Dark blue-gray with bright blue accents and frosted glass effects
Use Case: SaaS products, professional services, corporate
Mood: Premium, sophisticated, modern
```

#### 4. **Minimal White** - Clean & Simple
```typescript
Colors: Pure white with subtle gray accents and shadows
Use Case: Minimalist brands, architecture, portfolios
Mood: Clean, professional, timeless
```

#### 5. **Cyber Blue** - Digital Future
```typescript
Colors: Dark navy with electric blue, purple, and green accents
Use Case: Technology, AI, blockchain, cybersecurity
Mood: Futuristic, high-tech, innovative
```

#### 6. **Vintage** - Warm & Classic
```typescript
Colors: Cream backgrounds with burnt orange and brown accents
Use Case: Traditional businesses, heritage brands, crafts
Mood: Warm, trustworthy, established
```

### Theme Structure

```typescript
interface Theme {
  id: string;
  name: string;
  colors: {
    background: string;    // Base background color
    foreground: string;    // Primary text color
    primary: string;       // Main brand color
    secondary: string;     // Supporting brand color
    accent: string;        // Highlight/CTA color
    muted: string;         // Subdued text/elements
    border: string;        // Border colors
    card: string;          // Card backgrounds
  };
  gradients: {
    hero: string;          // Hero section gradients
    section: string;       // Section backgrounds
    card: string;          // Card overlays
    accent: string;        // Accent gradients
  };
  effects: {
    glow: string;          // Glow/shadow effects
    shadow: string;        // Box shadows
    blur: string;          // Blur intensity
  };
}
```

## 🎭 Dynamic Background Components

### 1. ParticleField
**Description:** Floating particles with parallax effect

**Props:**
- `count` (number, default: 50) - Number of particles
- `theme` ('light' | 'dark' | 'color') - Particle color scheme
- `className` (string) - Additional CSS classes

**Best Use:**
- Minimal backgrounds
- Subtle movement
- Performance-friendly option

**Animation:**
- Particles float vertically and horizontally
- Opacity fades in and out
- Duration: 10-30 seconds per particle

### 2. FloatingBlobs
**Description:** Animated gradient blobs with blur effect

**Props:**
- `theme` (Theme) - Current theme object
- `count` (number, default: 3) - Number of blobs
- `className` (string)

**Best Use:**
- Bold, colorful backgrounds
- Modern aesthetic
- Hero sections

**Animation:**
- Movement: X: [-100, 100], Y: [-100, 100]
- Scale: [1, 1.2, 0.8, 1]
- Duration: 20-40 seconds
- Blur: Theme-based (60-100px)

### 3. WaveBackground
**Description:** Animated SVG waves with gradient fills

**Props:**
- `theme` (Theme)
- `className` (string)

**Best Use:**
- Bottom sections
- Footer areas
- Flowing, organic feel

**Animation:**
- Wave paths morph smoothly
- Two overlapping waves
- Duration: 15-20 seconds
- Gradient fills based on theme

### 4. GradientOrbs
**Description:** Pulsing gradient orbs with glow effects

**Props:**
- `theme` (Theme)
- `count` (number, default: 5)
- `className` (string)

**Best Use:**
- Hero sections
- Premium feel
- Most versatile option

**Animation:**
- Scale: [1, 1.3, 1]
- Opacity: [0.3, 0.5, 0.3]
- Position movement
- Duration: 10-20 seconds
- Blur: 80px

### 5. Particles3D
**Description:** Interactive 3D particle field with Three.js

**Props:**
- `theme` (Theme)
- `count` (number, default: 1000)
- `className` (string)

**Best Use:**
- Premium landing pages
- Tech/futuristic themes
- Desktop-focused experiences

**Animation:**
- Rotation: Continuous slow rotation
- Scroll-based interaction
- Pulsing scale effect
- Sphere distribution

**Performance:**
- Uses WebGL
- Hardware accelerated
- Suspense boundary for loading
- Consider mobile performance

## 🎬 Zoom Reveal Section Wrapper

### ZoomRevealSection
**Description:** Pop-up enlargement effect with smooth transitions

**Props:**
- `children` (ReactNode) - Section content
- `theme` (Theme) - Current theme
- `className` (string)
- `zoomIntensity` ('subtle' | 'medium' | 'strong', default: 'medium')
- `sticky` (boolean, default: true)

**Zoom Intensity Scales:**
```typescript
subtle: [0.92, 1, 1, 0.92]   // Gentle effect
medium: [0.85, 1, 1, 0.85]   // Balanced
strong: [0.75, 1, 1, 0.75]   // Dramatic
```

**Animation Phases:**
1. **Enter (0-30%):** Zoom from scale to 1.0
2. **Active (30-70%):** Full scale, no zoom
3. **Exit (70-100%):** Zoom back down

**Effects:**
- Scale transformation
- Opacity fade
- Blur effect (0-10px)
- Border radius (modal-expansion feel)
- Theme-based glow on edges

**Best Practices:**
- Use different intensities for variety
- Stack multiple sections for depth
- Combine with background components
- Test scroll performance on mobile

## 🚀 Advanced Animation Variants

### Entrance Animations

#### zoomIn
```typescript
Scale: 0.5 → 1.0
Opacity: 0 → 1
Blur: 20px → 0px
Duration: 0.8s
Easing: premium cubic bezier
```

#### popEffect
```typescript
Scale: 0 → 1
Opacity: 0 → 1
Transition: Spring physics
Stiffness: 400, Damping: 25
```

#### slideScale
```typescript
Y: 100 → 0
Scale: 0.8 → 1.0
Opacity: 0 → 1
Duration: 0.9s
Easing: dramatic
```

#### flipIn
```typescript
RotateX: -90deg → 0deg
Scale: 0.8 → 1.0
Opacity: 0 → 1
Duration: 0.8s
```

#### spiralIn
```typescript
Scale: 0 → 1
Rotate: -180deg → 0deg
Opacity: 0 → 1
Duration: 1s
```

### Interactive Animations

#### magneticHover
```typescript
Scale: 1.05 on hover
Transition: Elastic spring
Tap: Scale 0.95
```

#### glowPulse
```typescript
Box Shadow: Pulsing glow
Colors: Theme-based
Duration: 2s infinite
```

#### textShimmer
```typescript
Background Position: Moving gradient
Duration: 3s infinite
Linear easing
```

#### morphShape
```typescript
Border Radius: Organic morphing
Duration: 10s infinite
Smooth easing
```

### Grid Animations

#### staggeredGrid
```typescript
Stagger Children: 0.08s delay
Delay Children: 0.1s initial
When: beforeChildren
```

#### gridItem
```typescript
Scale: 0.8 → 1.0
Y: 20 → 0
Opacity: 0 → 1
Transition: Elastic spring
```

#### waveStagger
```typescript
Stagger Children: 0.05s
Direction: Forward
Spring physics
```

## 🎯 Easing Curves

### Premium Smooth
```typescript
[0.6, 0.01, 0.05, 0.95]
Use: Hero animations, important elements
Feel: Smooth, professional, polished
```

### Dramatic
```typescript
[0.87, 0, 0.13, 1]
Use: Bold entrances, attention-grabbing
Feel: Powerful, impactful, cinematic
```

### Springy
```typescript
{ type: 'spring', stiffness: 400, damping: 25 }
Use: Buttons, interactive elements
Feel: Playful, responsive, bouncy
```

### Elastic
```typescript
{ type: 'spring', stiffness: 200, damping: 12 }
Use: Icons, badges, small elements
Feel: Energetic, fun, lively
```

### Anticipate
```typescript
[0.68, -0.55, 0.265, 1.55]
Use: Modals, overlays, surprises
Feel: Overshoot, playful, unexpected
```

## 🎨 ThemedHero Component

### Background Types

1. **particles** - Subtle floating particles
2. **blobs** - Colorful gradient blobs
3. **waves** - Flowing SVG waves
4. **orbs** - Pulsing gradient orbs (recommended)
5. **3d** - Interactive 3D particles

### Recommended Pairings

```typescript
Dark Neon → 3d particles
Pastel Gradient → waves
Soft Glass → orbs
Minimal White → particles
Cyber Blue → 3d particles
Vintage → orbs
```

### Hero Structure
1. Dynamic background (theme-based)
2. Animated badges
3. Gradient shimmer title
4. Animated subtitle
5. CTA buttons with micro-interactions
6. Stats grid with glassmorphism
7. Scroll indicator

## 🎭 Theme Switcher

### Features
- Floating button (bottom-right)
- Smooth panel transitions
- Visual theme previews
- Color swatches
- Active indicator
- Backdrop blur overlay

### Interaction Flow
1. Click floating button (palette icon)
2. Panel slides up with spring animation
3. Grid of theme options
4. Click theme to switch
5. Panel dismisses automatically
6. Entire page re-themes smoothly

## 📱 Responsive Optimizations

### Mobile Adjustments
```typescript
// Reduce particle count
Particles: Desktop 1000 → Mobile 300

// Disable 3D on small screens
< 768px: No Three.js components

// Simplify animations
Reduce blur intensity
Shorter durations
Fewer stagger delays

// Zoom intensity
Strong → Medium on mobile
```

### Breakpoints
```typescript
sm: 640px   - Simplified animations
md: 768px   - Full animations, no 3D
lg: 1024px  - All features enabled
xl: 1280px  - Optimal experience
```

## ⚡ Performance Guidelines

### Background Components
```typescript
Particles: Light (~5ms per frame)
Blobs: Medium (~10ms per frame)
Waves: Light (~3ms per frame)
Orbs: Light (~7ms per frame)
3D Particles: Heavy (~20ms per frame)
```

### Optimization Tips

1. **Limit 3D Usage**
   - Max 1 3D component per page
   - Use on hero only
   - Disable on mobile

2. **Stagger Wisely**
   - Max 0.15s stagger delay
   - Limit to 20 children max
   - Use `once: true` viewport

3. **Blur Effects**
   - Expensive operation
   - Limit to 3-4 blurred elements
   - Use backdrop-blur for better performance

4. **Theme Switching**
   - CSS variables for instant updates
   - No page reload needed
   - Smooth transitions

## 🎨 Color Balance Recommendations

### Light Themes (Minimal White, Pastel)
- Use subtle shadows
- Lower opacity overlays (10-20%)
- Gentle blur (40-60px)
- Soft accent colors

### Dark Themes (Dark Neon, Cyber Blue, Soft Glass)
- Strong contrast
- Higher opacity overlays (20-40%)
- Heavy blur (80-100px)
- Vibrant accent colors
- Use glow effects

### Balanced Theme (Vintage)
- Medium contrast
- Moderate overlays (15-30%)
- Medium blur (60-80px)
- Warm accent colors
- Subtle shadows

## 🌟 3D Element Placement

### Hero Section
**Position:** Background, full coverage
**Type:** Particles3D or Floating3DObject
**Opacity:** 0.4-0.6
**Interaction:** Scroll-based rotation

### Feature Sections
**Position:** Background, subtle
**Type:** Small floating objects
**Opacity:** 0.2-0.3
**Interaction:** Hover effects

### CTA Sections
**Position:** Accent element
**Type:** Decorative 3D icon
**Opacity:** 0.8-1.0
**Interaction:** Hover scale

## 🎯 Lighting Recommendations

### For 3D Objects

**Ambient Light:**
```typescript
Intensity: 0.5
Purpose: Base illumination
```

**Spotlight:**
```typescript
Position: [10, 10, 10]
Angle: 0.15
Penumbra: 1
Intensity: 1.0
Purpose: Main highlight
```

**Point Light:**
```typescript
Position: [-10, -10, -10]
Intensity: 0.5
Purpose: Fill light
```

**Directional Light:**
```typescript
Position: [0, 5, 5]
Intensity: 0.8
Color: White
Purpose: Key light
```

### Color Temperature

**Warm Themes (Vintage):**
- Slight orange tint: `#fff8f0`
- Lower color intensity
- Softer shadows

**Cool Themes (Cyber Blue, Soft Glass):**
- Slight blue tint: `#f0f8ff`
- Higher color intensity
- Sharper shadows

**Neutral Themes (Minimal White):**
- Pure white: `#ffffff`
- Balanced intensity
- Subtle shadows

## 📦 Component Usage Examples

### Basic Setup
```tsx
import { useState } from 'react';
import ThemedHero from '@/components/ThemedHero';
import ZoomRevealSection from '@/components/ZoomRevealSection';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { getTheme } from '@/lib/themes';

function App() {
  const [theme, setTheme] = useState(getTheme('darkNeon'));

  return (
    <div>
      <ThemeSwitcher 
        currentTheme={theme} 
        onThemeChange={setTheme} 
      />
      
      <ThemedHero 
        theme={theme} 
        backgroundType="orbs" 
      />
      
      <ZoomRevealSection 
        theme={theme}
        zoomIntensity="medium"
      >
        {/* Your content */}
      </ZoomRevealSection>
    </div>
  );
}
```

### Advanced Animation
```tsx
import { motion } from 'framer-motion';
import { zoomIn, slideScale, staggeredGrid, gridItem } from '@/lib/advancedAnimations';

function Section() {
  return (
    <motion.section variants={zoomIn} initial="hidden" whileInView="visible">
      <motion.div variants={staggeredGrid} initial="hidden" animate="visible">
        {items.map((item, i) => (
          <motion.div key={i} variants={gridItem}>
            {item.content}
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
```

---

**Created for:** Modern, aesthetic landing pages with premium animations
**Technologies:** React, Framer Motion, Three.js, Tailwind CSS
**Theme System:** 6 pre-built color schemes with full customization
**Performance:** Optimized for 60fps on desktop, 30fps on mobile

