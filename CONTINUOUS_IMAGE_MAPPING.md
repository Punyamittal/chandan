# Continuous Image Mapping Update

## Overview
Updated the wedding card texture mapping so that ONE image spans across both panels, creating a continuous panoramic view instead of showing two duplicate/mirrored images.

## Problem Before
- Each panel showed the complete `digit.png` image independently
- Result: Two identical wedding invitations side-by-side
- Visual: Duplicated content, looked repetitive
- Not utilizing the full image as intended

## Solution After
- Single image split across two panels
- Left panel shows **left 50%** of the image
- Right panel shows **right 50%** of the image
- When open: One continuous panoramic image
- When folding: Image closes like a book

## Technical Implementation

### Texture Splitting
```tsx
// Create two texture instances for split image
const leftTexture = cardTexture.clone();
leftTexture.repeat.set(0.5, 1); // Show left half only
leftTexture.offset.set(0, 0);   // Start from left edge
leftTexture.needsUpdate = true;

const rightTexture = cardTexture.clone();
rightTexture.repeat.set(0.5, 1); // Show right half only
rightTexture.offset.set(0.5, 0); // Start from middle
rightTexture.needsUpdate = true;
```

### UV Mapping Explanation

**Original Image (100% width):**
```
┌─────────────────────────────────┐
│  Left Wedding  │  Right Wedding │
│   Invitation   │   Invitation   │
└─────────────────────────────────┘
     0 → 0.5           0.5 → 1.0
```

**Left Panel Mapping:**
- `repeat.set(0.5, 1)` - Show only 50% of width, 100% of height
- `offset.set(0, 0)` - Start from position 0 (left edge)
- **Shows:** First invitation (left half)

**Right Panel Mapping:**
- `repeat.set(0.5, 1)` - Show only 50% of width, 100% of height
- `offset.set(0.5, 0)` - Start from position 0.5 (middle)
- **Shows:** Second invitation (right half)

### Applied to Meshes

```tsx
{/* Left Panel */}
<mesh position={[-1.25, 0, 0.01]}>
  <planeGeometry args={[2.5, 3.2]} />
  <meshStandardMaterial map={leftTexture} />
</mesh>

{/* Right Panel */}
<mesh position={[1.25, 0, 0.01]}>
  <planeGeometry args={[2.5, 3.2]} />
  <meshStandardMaterial map={rightTexture} />
</mesh>
```

## Visual Result

### Before (Duplicated)
```
┌──────────┐  ┌──────────┐
│ Wedding  │  │ Wedding  │
│ Emma &   │  │ Emma &   │
│ Liam     │  │ Liam     │
│ (flowers)│  │ (flowers)│
└──────────┘  └──────────┘
  Left Panel    Right Panel
  (Duplicate)   (Duplicate)
```

### After (Continuous)
```
┌──────────┬──────────┐
│ Wedding  │ Emma &   │
│ Text     │ Liam     │
│ (Left    │ (Right   │
│  flowers)│  flowers)│
└──────────┴──────────┘
  Left Half   Right Half
  (One continuous image)
```

## Benefits

1. **Better Content Utilization**
   - Uses full image width efficiently
   - No repetitive/duplicate content
   - More professional appearance

2. **Book-like Experience**
   - Opens like a real wedding invitation
   - Left and right pages work together
   - Natural reading flow

3. **Smooth Folding**
   - Image closes seamlessly
   - Two halves merge visually when folding
   - Natural transformation to envelope

4. **Panoramic Effect**
   - When fully open: Wide, impressive view
   - Creates sense of space and elegance
   - More cinematic presentation

## User Experience

### Opening the Card
```
Closed → Slightly Open → Fully Open
  │           │              │
  └───────────┴──────────────┘
         One continuous image
         spreads across both panels
```

### What User Sees

1. **Fully Open (0-15%)**
   - Wide panoramic wedding invitation
   - Left panel + Right panel = Complete image
   - Tropical flowers frame the entire scene

2. **Folding (15-40%)**
   - Image closes like a book
   - Two halves coming together
   - Natural folding motion

3. **Envelope (40-70%)**
   - Card fully closed
   - Transforms into envelope
   - Clean transition

## Geometry Change

Changed from `boxGeometry` to `planeGeometry`:

**Why?**
- Flatter surface for better texture display
- Cleaner texture mapping
- Less geometry complexity
- Better UV coordinate handling

```tsx
// Before
<boxGeometry args={[2.5, 3.2, 0.03]} />

// After
<planeGeometry args={[2.5, 3.2]} />
```

## Files Modified
- `src/pages/Card3DShowcase.tsx` - Texture splitting and mapping

## Testing

Verify that:
- [x] Left panel shows left half of image
- [x] Right panel shows right half of image
- [x] Together they form one complete image
- [x] No duplication when fully open
- [x] Smooth folding animation
- [x] Clean texture quality
- [x] Proper brightness and visibility

## Result

The wedding card now displays **ONE continuous image** split across two panels, creating a panoramic effect when open and folding naturally like a real book! 📖✨

