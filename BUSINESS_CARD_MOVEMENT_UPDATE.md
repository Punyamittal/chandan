# Business Card Movement & Texture Update

## Overview
This update implements the wedding card texture using `digit.png` and creates a smooth downward-right movement for the business card that gets stuck at a fixed position.

## Changes Made

### 1. **Wedding Card Texture** (`Card3DShowcase.tsx`)
- Applied `digit.png` as a texture on both wedding card panels
- Removed redundant decorative elements (flowers, palm leaves, calligraphy geometry) since they're now part of the printed texture
- Kept subtle sparkle effects for visual enhancement

```tsx
const cardTexture = useTexture('/models/vintage_camera/digit.png');

// Applied to both card panels
<meshStandardMaterial
  map={cardTexture}
  roughness={0.3}
  metalness={0.05}
  envMapIntensity={0.3}
/>
```

### 2. **Business Card Movement Path**
The business card now follows this movement pattern:

| Phase | Scroll Range | X Position | Y Position | Description |
|-------|-------------|------------|------------|-------------|
| Start (Wedding) | 0-20% | 4 (right) | 0 (center) | Wedding card at right side |
| Envelope Formation | 20-70% | 4 → -4 (left) | 0 → 1 (up) | Moves diagonally to left |
| Business Card | 70-90% | -4 → 5 (right) | 1 → -2.5 (down) | Moves **downwards** to bottom-right |
| **Stuck** | 90%+ | **5 (fixed)** | **-2.5 (fixed)** | **Remains fixed at bottom-right corner** |

### 3. **Smooth Transitions**
- **Scaling**: Business card shrinks to 35% of original size
  - During animation (70-90%): Gradually scales down
  - When stuck (90%+): Fixed at 35% scale

- **Opacity**: Smooth fade-in with guaranteed visibility
  - Gradual fade during emergence
  - Locked at 100% opacity when stuck

- **Rotation**: Natural tilt during emergence, flat when stuck
  - Tilts slightly while emerging from envelope
  - Returns to flat (0°) when fixed in corner

### 4. **Phase Labels**
Updated phase indicators to reflect new behavior:
- 🌺 **Tropical Wedding Card** (0-20%)
- 📧 **Folding Into Envelope** (20-40%)
- 🔄 **Rotating Envelope** (40-65%)
- ✨ **Card Emerging** (65-85%)
- ↘️ **Moving to Corner** (85-90%)
- 📌 **Business Card (Fixed)** (90%+) ← NEW!

### 5. **Fixed Position Behavior**
Once scrollProgress reaches 90%:
- Position X: **Fixed at 5** (bottom-right)
- Position Y: **Fixed at -2.5** (bottom)
- Scale: **Fixed at 35%**
- Opacity: **Fixed at 100%**
- Rotation: **Fixed at 0° (flat)**
- **Stays visible when scrolling up or down**

## Technical Implementation

### Movement Logic
```tsx
if (scrollProgress >= 0.7) {
  if (scrollProgress < 0.9) {
    // Animate from left to bottom-right
    const moveProgress = easedPhase4 * 1.5;
    const actualProgress = Math.min(moveProgress, 1);
    posX = -4 + actualProgress * 9; // -4 → 5
    posY = 1 - actualProgress * 3.5; // 1 → -2.5 (DOWNWARDS)
  } else {
    // STUCK at final position
    posX = 5;
    posY = -2.5;
  }
}
```

### Scale and Opacity
```tsx
const scale = scrollProgress < 0.9 
  ? 1 - easedPhase4 * 0.65  // Shrink during animation
  : 0.35; // Stay at 35% when stuck

const cardOpacity = scrollProgress >= 0.9 
  ? 1 // Fully visible when stuck
  : Math.min(easedEmergence * 1.5, 1);
```

## User Experience
1. **Wedding card** appears from the right with printed texture
2. **Folds into envelope** while moving diagonally to the left
3. **Envelope rotates** to show the wax seal
4. **Business card emerges** from the top of the envelope
5. **Moves downward-right** smoothly to the bottom-right corner
6. **Gets stuck** at bottom-right corner at 90% scroll
7. **Remains visible** as a fixed element for the rest of the page

## Files Modified
- `src/pages/Card3DShowcase.tsx` - Main 3D card component
- `src/pages/Index.tsx` - Added promotional banner for 3D demo
- `src/App.tsx` - Added route for `/3d-card`
- `src/components/Navigation.tsx` - Added "3D Demo" navigation link

## Testing
To test the new behavior:
1. Navigate to `/3d-card`
2. Scroll down slowly to observe:
   - Wedding card texture with printed design
   - Smooth folding into envelope
   - Envelope rotation
   - Business card emerging and moving down-right
   - Business card getting stuck at bottom-right corner at ~90% scroll
3. Continue scrolling down - business card stays fixed
4. Scroll back up - business card remains in corner

## Assets Used
- `/models/vintage_camera/digit.png` - Wedding invitation texture

## Performance
- Texture loading optimized with `useTexture` hook
- Easing functions for smooth transitions
- Fixed position after 90% reduces computation
- No unnecessary re-renders when card is stuck

