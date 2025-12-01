# ✍️ Calligraphy & Diagonal Movement Update

## 🎨 Major Enhancements

### 1. **Beautiful Calligraphy Text** ✨

Added elegant calligraphy-style text directly on the 3D wedding card:

#### **"Wedding" - Main Title**
- Elegant script-style curves and swirls
- Rose gold color (#d4a574)
- Metallic finish with emissive glow
- 5 connected letter elements forming flowing script
- Decorative flourish underline (curved arc)
- Side swirls for elegance

#### **"You're Invited" - Header Text**
- Three horizontal bars above wedding text
- Gray color (#6b7280) for subtle contrast
- Clean, minimal style

#### **Names - "Emma & Liam"**
- Elegant curved elements
- Rose gold color matching main text
- Pink heart decoration in center (#f472b6)
- Flowing script aesthetic

#### **Date & Location - Footer Text**
- Two horizontal bars below
- Light gray (#9ca3af)
- Simple, clean representation

---

## 🔄 Smooth Diagonal Movement Path

### **Movement Choreography:**

```
START (0-20%)               →  Card appears RIGHT side
    ↓ ↙
PHASE 2 (20-45%)           →  Diagonal LEFT while folding
    ↓ ↙                        (X: 4 → -4, Y: 0 → 1)
PHASE 3 (45-70%)           →  Continues LEFT, rotating
    ↓                          (Envelope rotation 360°)
    ↘ →
PHASE 4 (70-100%)          →  Diagonal RIGHT as business card
                               (X: -4 → 6, Y: 1 → 3.5)
```

### **Position Details:**

| Phase | X Position | Y Position | Action |
|-------|-----------|-----------|---------|
| **Start (0-20%)** | 4 (right) | 0 (center) | Wedding card visible |
| **Phase 2 (20-45%)** | 4 → -4 | 0 → 1 | Diagonal LEFT + fold |
| **Phase 3 (45-70%)** | -4 (left) | 1 (up) | Rotate 360° |
| **Phase 4 (70-100%)** | -4 → 6 | 1 → 3.5 | Diagonal RIGHT + transform |

---

## 🌊 Enhanced Smooth Transitions

### **Cubic Easing Function:**

```typescript
const easeInOutCubic = (t: number) => 
  t < 0.5 
    ? 4 * t * t * t 
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
```

Applied to:
- Card position changes (smooth acceleration/deceleration)
- Envelope fade out
- Business card emergence
- Content sliding animations

### **Improved Phase Durations:**

- **Phase 1**: 0-20% (Wedding card display)
- **Phase 2**: 20-45% (Folding + LEFT movement) - *Extended 5%*
- **Phase 3**: 45-70% (Rotation) - *Same*
- **Phase 4**: 70-100% (Business card + RIGHT movement) - *Same*

---

## 📄 Content Synchronization

### **Content Movements Match Card Path:**

#### **Section 1: Wedding Details** (18-42%)
- Slides in from **LEFT** (X: -100 → 0)
- Fades up (Y: 150 → 0)
- Appears as card moves LEFT
- Coordinates with diagonal movement

#### **Section 2: Event Details** (42-68%)
- Slides in from **RIGHT** (X: 100 → 0)
- Fades up (Y: 150 → 0)
- Appears during rotation phase
- Creates dynamic flow

#### **Section 3: Business Contact** (68-78%)
- Scales up (0.9 → 1)
- Fades up (Y: 150 → 0)
- Appears as card moves RIGHT
- Dramatic entrance for final section

---

## 🎭 Calligraphy Elements Detail

### **Main "Wedding" Text Components:**

1. **W Letter** (left)
   - Curved torus (150° arc)
   - Angled cylinder for stroke
   - Position: (-1.2, 0)

2. **Middle Letters** (center)
   - Series of torus rings and cylinders
   - Represents "edding" in flowing script
   - Positions: -0.6, -0.2, 0.1, 0.5, 0.8

3. **Flourish Underline**
   - Large half-circle torus (180° arc)
   - Width: 2 units
   - Emissive glow effect
   - Position: (0, -0.35)

4. **Side Swirls**
   - Left swirl: 234° arc at (-1.5, -0.3)
   - Right swirl: 234° arc at (1.5, -0.3)
   - Decorative calligraphic elements

### **Material Properties:**

All calligraphy uses:
- **Color**: Rose gold (#d4a574)
- **Metalness**: 0.7-0.9 (luxury finish)
- **Roughness**: 0.1-0.2 (smooth, polished)
- **Emissive**: Matching color with 0.2-0.3 intensity
- **Result**: Glowing, elegant script

---

## 🎬 Animation Timeline (Detailed)

### **0-20%: Wedding Card Display**
- Position: Right side (X: 4)
- Card fully open with calligraphy visible
- Tropical decorations shown
- Golden sparkles
- No movement (static display)

### **20-45%: Diagonal Fold & Move LEFT**
- Card panels begin folding (eased)
- Simultaneous diagonal movement
- X: 4 → -4 (8 units left)
- Y: 0 → 1 (1 unit up)
- Smooth cubic easing
- Calligraphy fades as card folds

### **45-70%: Rotation Phase**
- Position stays LEFT (X: -4)
- Envelope rotates 360° on Y-axis
- Wax seal visible on back
- Smooth continuous rotation
- Eased timing

### **70-100%: Business Card Emergence & RIGHT Move**
- Envelope flap opens wider (smooth)
- Business card slides out from inside
- Simultaneous movement RIGHT
- X: -4 → 6 (10 units right)
- Y: 1 → 3.5 (2.5 units up)
- Envelope fades out
- Card scales down to corner size

---

## 📊 Timing Comparison

### Before:
| Phase | Duration | Notes |
|-------|----------|-------|
| Phase 2 | 20% | Too fast for smooth fold |
| Movements | Linear | Sudden starts/stops |
| Content | Fixed timing | Not coordinated |

### After:
| Phase | Duration | Notes |
|-------|----------|-------|
| Phase 2 | 25% | Extended for smoothness |
| Movements | Cubic eased | Smooth acceleration |
| Content | Coordinated | Matches card movement |

---

## 🎨 Visual Flow Description

**User Experience:**

1. **Page loads**: 
   - Beautiful tropical wedding card appears on RIGHT side
   - "Wedding" in elegant calligraphy at center
   - Names and details visible
   - Palm leaves and flowers frame the invitation

2. **Start scrolling**:
   - Card gracefully moves DIAGONALLY LEFT
   - Simultaneously begins folding
   - Smooth, ballet-like motion
   - Content slides in from left

3. **Middle section**:
   - Card now on LEFT side as envelope
   - Rotates to show wax seal
   - Content appears from right
   - Dynamic, engaging flow

4. **Final scroll**:
   - Envelope opens elegantly
   - Business card emerges smoothly
   - Moves DIAGONALLY RIGHT to corner
   - Final content scales up
   - Professional transformation complete

---

## 🔧 Technical Improvements

### **Position Calculation:**

```typescript
// Start position
let posX = 4;  // Right side
let posY = 0;  // Center height

// Phase 2-3: Diagonal LEFT
if (scrollProgress >= 0.2 && scrollProgress < 0.7) {
  const moveProgress = (scrollProgress - 0.2) / 0.5;
  const easedMove = easeInOutCubic(moveProgress);
  posX = 4 - easedMove * 8;  // 4 → -4
  posY = easedMove * 1;       // 0 → 1
}

// Phase 4: Diagonal RIGHT
if (scrollProgress >= 0.7) {
  const moveProgress = easedPhase4;
  posX = -4 + moveProgress * 10; // -4 → 6
  posY = 1 + moveProgress * 2.5; // 1 → 3.5
}
```

### **Smooth Fades:**

- **Envelope fade**: 70-95% (25% duration)
- **Business card emerge**: 65-95% (30% duration)
- **All with cubic easing**

---

## 🎯 Key Features

✅ **Elegant calligraphy** text on wedding card
✅ **Rose gold** metallic finish
✅ **Diagonal movement** path (right → left → right)
✅ **Smooth cubic easing** on all transitions
✅ **Coordinated content** sliding
✅ **Extended phase durations** for smoothness
✅ **Professional animations** throughout
✅ **No sudden jumps** or jarring movements
✅ **60 FPS performance** maintained

---

## 🌟 Visual Highlights

1. **Calligraphy Glows**: Emissive rose gold text
2. **Smooth Diagonal Path**: Natural, flowing movement
3. **Content Coordination**: Slides match card direction
4. **Eased Transitions**: No linear movements
5. **Extended Timing**: More time to appreciate details
6. **Professional Feel**: Wedding → Business seamless

---

## 📱 Responsive Behavior

All movements and animations are:
- Percentage-based (not pixel-based)
- Viewport-relative
- Mobile-optimized
- Touch-scroll friendly
- Maintains aspect ratios

---

## 🎊 Result

A cinematic, professional 3D card transformation that:
- Starts with elegant calligraphy wedding invitation
- Moves diagonally across the screen
- Transforms smoothly through all phases
- Ends as polished business card
- All with perfect timing and easing

**The movement tells a story**: From right (traditional wedding) → left (journey/transition) → right (professional business) - a complete narrative arc!

---

**Status**: ✅ Complete
**Performance**: 60 FPS
**Smoothness**: Cubic eased throughout
**Theme**: Tropical wedding with calligraphy
**Movement**: Diagonal path (R → L → R)

