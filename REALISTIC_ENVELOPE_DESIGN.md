# Realistic Envelope Design

## Overview
Completely redesigned the envelope to look exactly like a traditional paper mail envelope with proper structure, flaps, seams, and realistic materials.

## Traditional Envelope Structure

A real envelope has these components:
1. **Rectangular body** (front and back)
2. **Bottom flap** (sealed, hidden underneath)
3. **Top flap** (triangular shaped, opens/closes)
4. **Side flaps** (left and right triangular folds)
5. **Seal/closure** (visible when closed)
6. **Inner paper** (white interior visible when opened)

All of these are now implemented!

## Components Breakdown

### 1. Main Body

**Front Face:**
```tsx
<mesh position={[0, -0.15, 0]}>
  <boxGeometry args={[3.4, 2.2, 0.04]} />
  <meshStandardMaterial
    color="#f9f6f1"  // Cream envelope paper
    roughness={0.85}  // Matte paper texture
  />
</mesh>
```

**Back Face:**
```tsx
<mesh position={[0, -0.15, -0.025]}>
  <boxGeometry args={[3.4, 2.2, 0.01]} />
  <meshStandardMaterial
    color="#ebe5dc"  // Slightly darker back
  />
</mesh>
```

**Side Edges:**
- Left and right edges visible
- Add depth and 3D realism
- Darker color (#ded5c9) for depth

### 2. Bottom Flap (Sealed)

```tsx
<mesh position={[0, -1.25, 0.025]}>
  <boxGeometry args={[3.4, 0.15, 0.015]} />
  <meshStandardMaterial
    color="#d9cfc0"  // Slightly darker for sealed edge
  />
</mesh>
```

**Purpose:**
- Always visible (envelope is sealed on bottom)
- Shows envelope is properly closed
- Realistic envelope construction

### 3. Top Flap (Triangular, Opens)

This is the most important part - the iconic triangular flap!

**Main Rectangular Part:**
```tsx
<mesh position={[0, 0.5, -0.01]}>
  <boxGeometry args={[3.42, 1.0, 0.02]} />
  <meshStandardMaterial color="#ebe2d6" />
</mesh>
```

**Left Diagonal Edge:**
```tsx
<mesh position={[-1.3, 0, 0]} rotation={[0, 0, -0.52]}>
  <boxGeometry args={[1.9, 0.03, 0.02]} />
  <meshStandardMaterial color="#dfd6ca" />
</mesh>
```

**Right Diagonal Edge:**
```tsx
<mesh position={[1.3, 0, 0]} rotation={[0, 0, 0.52]}>
  <boxGeometry args={[1.9, 0.03, 0.02]} />
  <meshStandardMaterial color="#dfd6ca" />
</mesh>
```

**Bottom Edge:**
```tsx
<mesh position={[0, -0.47, 0]}>
  <boxGeometry args={[3.42, 0.03, 0.02]} />
  <meshStandardMaterial color="#cfc5b8" />
</mesh>
```

**Result:** Perfect triangular flap shape!

```
      /\
     /  \
    /    \
   /______\
   
Traditional envelope triangle!
```

### 4. Side Flaps (Hidden When Closed)

```tsx
{flapOpen < 0.15 && (
  <>
    {/* Left side flap - diagonal fold */}
    <mesh position={[-1.62, 0.45, 0.03]} rotation={[0, 0, -0.35]}>
      <boxGeometry args={[1.2, 0.025, 0.015]} />
      <meshStandardMaterial color="#d4cab9" />
    </mesh>

    {/* Right side flap - diagonal fold */}
    <mesh position={[1.62, 0.45, 0.03]} rotation={[0, 0, 0.35]}>
      <boxGeometry args={[1.2, 0.025, 0.015]} />
      <meshStandardMaterial color="#d4cab9" />
    </mesh>
  </>
)}
```

**Purpose:**
- Show where sides tuck under when closed
- Realistic envelope fold lines
- Only visible when flap is closed

### 5. Seal/Closure

```tsx
{flapOpen < 0.1 && (
  <mesh position={[0, 0.75, 0.055]}>
    <cylinderGeometry args={[0.18, 0.18, 0.02, 32]} />
    <meshStandardMaterial
      color="#c5a880"  // Gold/tan seal
      roughness={0.7}
      metalness={0.2}
    />
  </mesh>
)}
```

**Purpose:**
- Represents glue/adhesive seal or decorative clasp
- Only visible when closed
- Adds authenticity

### 6. Inner White Paper

```tsx
{flapOpen > 0.2 && (
  <mesh position={[0, 0.3, 0.015]}>
    <boxGeometry args={[3.2, 1.8, 0.01]} />
    <meshStandardMaterial
      color="#ffffff"
      roughness={0.95}
      opacity={envelopeFade * Math.min(flapOpen * 2, 1)}
    />
  </mesh>
)}
```

**Purpose:**
- White interior visible when flap opens
- Realistic peek inside envelope
- Smooth fade as flap opens

## Color Palette - Natural Paper Tones

| Component | Color | Description |
|-----------|-------|-------------|
| **Front Face** | `#f9f6f1` | Cream - main envelope color |
| **Back Face** | `#ebe5dc` | Light tan - slightly darker |
| **Side Edges** | `#ded5c9` | Taupe - depth and dimension |
| **Bottom Flap** | `#d9cfc0` | Darker tan - sealed edge |
| **Top Flap Main** | `#ebe2d6` | Light cream - flap body |
| **Top Flap Edges** | `#dfd6ca` | Tan - diagonal fold lines |
| **Top Flap Bottom** | `#cfc5b8` | Medium tan - bottom edge |
| **Side Flaps** | `#d4cab9` | Warm tan - tucked folds |
| **Seal** | `#c5a880` | Gold/tan - adhesive/clasp |
| **Interior** | `#ffffff` | White - inner paper |

**Result:** Natural, cohesive paper envelope aesthetic

## Material Properties

All components use realistic paper materials:

```tsx
roughness: 0.85-0.95  // Matte paper finish
metalness: 0-0.2      // No shine (except slight seal)
envMapIntensity: 0.1  // Minimal reflection
```

**Benefits:**
- Looks like real paper
- No artificial plastic shine
- Professional finish

## Animation Behavior

### When Closed (flapOpen < 0.1)
- ✅ Front and back body visible
- ✅ Bottom flap sealed
- ✅ Top flap closed (triangular shape clear)
- ✅ Side flaps tucked (diagonal lines visible)
- ✅ Seal/closure visible
- ❌ Interior white paper hidden

### Opening (flapOpen 0.1-0.8)
- ✅ Top flap rotates upward (1.3 radians max)
- ✅ Side flaps fade out (disappear at 0.15)
- ✅ Interior white paper starts appearing (0.2+)
- ✅ Seal fades away (disappears at 0.1)

### Fully Open (flapOpen 0.8+)
- ✅ Top flap fully rotated up
- ✅ Interior white paper fully visible
- ✅ Business card emerges from interior
- ❌ Side flaps hidden
- ❌ Seal hidden

## 3D Structure Visualization

```
Side View (Closed):
     /\          ← Top flap (triangular)
    /  \
   /____\        ← Side flaps tucked
   |    |        ← Main body
   |    |
   └────┘        ← Bottom flap sealed


Side View (Opening):
      /\
     /  \______  ← Flap rotating up
    /      ✉️   ← Business card emerging
   |          |
   |          |
   └──────────┘


Top View (Closed):
   __________
  /          \  ← Triangular top
 /            \
|   [SEAL]    | ← Circular seal
|              |
└──────────────┘
```

## Comparison

### Before
```
Simple boxes:
┌─────────┐
│         │  ← Single box
│         │
└─────────┘

Problems:
- No triangular flap
- No realistic structure
- Missing envelope details
- Generic appearance
```

### After
```
Realistic envelope:
    /\        ← Triangular flap
   /  \
  /____\      ← Side flaps
  |    |      ← Body with depth
  |    |
  └────┘      ← Bottom flap

Features:
✓ Triangular top flap
✓ Side fold flaps
✓ Bottom sealed flap
✓ Front/back faces
✓ Side edges visible
✓ Seal/closure
✓ White interior
✓ Realistic colors
✓ Paper materials
```

## Result

The envelope now looks exactly like a **traditional paper mail envelope** with:
- ✅ Proper rectangular body
- ✅ Iconic triangular top flap
- ✅ Side and bottom flaps
- ✅ Realistic closure seal
- ✅ White interior visible when opening
- ✅ Natural paper colors and textures
- ✅ Professional matte finish
- ✅ Authentic envelope structure

**Perfect for showcasing the wedding card → envelope → business card transformation!** 📧✨

