# Texture & Auto-Rotation Update

## Overview
This update ensures the wedding invitation texture appears only once (no repeating) and adds automatic rotation when scrolling stops.

## Changes Made

### 1. **Single Texture Display (No Repeating)**

The `digit.png` texture now appears exactly once on the wedding card without any tiling or repetition:

```tsx
// Configure texture to not repeat - show only once
cardTexture.wrapS = THREE.ClampToEdgeWrapping;
cardTexture.wrapT = THREE.ClampToEdgeWrapping;
cardTexture.needsUpdate = true;
```

**Technical Details:**
- `wrapS`: Controls horizontal wrapping (ClampToEdge = no repeat)
- `wrapT`: Controls vertical wrapping (ClampToEdge = no repeat)
- `ClampToEdgeWrapping`: Ensures the texture edge pixels extend to fill the space rather than repeating

### 2. **Continuous Auto-Rotation**

The 3D card now rotates continuously at all times, even while scrolling:

```tsx
// Continuous auto-rotation animation
useFrame((state) => {
  if (groupRef.current) {
    // Gentle continuous Y-axis rotation (always active)
    groupRef.current.rotation.y += 0.005;
    
    // Subtle floating on wedding card phase
    if (phase1 === 1 && phase2 === 0) {
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.8) * 0.002;
    }
  }
});
```

## Behavior

### Texture Display
- ✅ Wedding invitation appears **exactly once** on each card panel
- ✅ No tiling or repetition
- ✅ Clear, crisp print quality
- ✅ Text and decorations (flowers, palm leaves) remain sharp

### Auto-Rotation
| User Action | 3D Object Behavior |
|-------------|-------------------|
| **Scrolling** | Follows scroll-driven transformations (folding, rotating, moving) **WHILE continuously rotating on Y-axis** |
| **Stops Scrolling** | Continues rotating on Y-axis (gentle spin) |
| **All Times** | **Always rotating** - never stops |

### Rotation Characteristics
- **Speed**: Gentle, slow rotation (`0.005` radians per frame ≈ 17° per second)
- **Axis**: Y-axis (horizontal spin)
- **Trigger**: Activates 150ms after scroll stops
- **Wedding Card Phase**: Also includes subtle floating animation

## User Experience

1. **User scrolls down**: 
   - Card transforms according to scroll position (folding, envelope, business card)
   - **Card continuously rotates on Y-axis throughout the entire journey**
   - Creates a dynamic 3D showcase effect

2. **User stops scrolling**:
   - Card continues rotating
   - Great for examining details of the wedding invitation from all angles

3. **Wedding Card Phase**:
   - Rotates continuously while floating
   - Shows off the tropical print design from multiple perspectives

4. **Business card stuck at corner**:
   - Continues rotating in place at bottom-right position
   - Maintains its fixed position while spinning
   - Creates an elegant focal point

## Technical Implementation

### Rotation Logic
- Uses `useFrame` from `@react-three/fiber`
- **Rotates continuously at all times** - no conditional logic
- Incremental rotation: `groupRef.current.rotation.y += 0.005`
- Runs on every frame (~60fps)
- Maintains other animations (floating) during rotation
- No state management needed - pure animation loop

## Material Properties (Enhanced for Clarity)

```tsx
<meshStandardMaterial
  map={cardTexture}           // Wedding invitation texture
  color="#2a2a2a"             // Very dark tint for clear print
  roughness={0.5}             // Matte finish
  metalness={0}               // No metallic effect
  envMapIntensity={0.1}       // Minimal environmental lighting
  toneMapped={false}          // Preserve original colors
/>
```

## Performance
- **Texture Loading**: Optimized with `useTexture` hook
- **Wrapping Configuration**: No performance impact
- **Continuous Rotation**: Minimal computation (simple increment per frame)
- **No State Management**: Eliminates re-render overhead
- **Smooth 60fps**: Runs efficiently in the animation loop

## Files Modified
- `src/pages/Card3DShowcase.tsx` - Main 3D card component

## Testing Checklist
- [x] Texture appears only once (no repetition)
- [x] Text is clear and readable
- [x] Flowers and palm leaves are crisp
- [x] Rotation is continuous at all times
- [x] Rotation continues while scrolling
- [x] Rotation continues when scroll stops
- [x] Business card rotates when stuck at bottom-right
- [x] No performance issues or lag
- [x] Smooth 60fps animation

## Benefits
1. **Better Visual Quality**: Single texture display ensures clarity
2. **Enhanced User Experience**: Continuous rotation showcases all angles automatically
3. **Professional Polish**: Creates a dynamic, premium 3D showcase effect
4. **Simple Implementation**: No complex state management or scroll detection needed
5. **Always Engaging**: Card is always in motion, creating visual interest

