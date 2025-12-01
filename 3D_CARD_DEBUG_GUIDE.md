# 🔧 3D Card Animation Debug Guide

## ✅ What I Just Fixed

The 3D model wasn't animating because the scroll progress wasn't being passed reactively to the Canvas component.

### Changes Made:

1. **Added State Management**
   ```tsx
   const [scrollProgress, setScrollProgress] = useState(0);
   ```

2. **Added Scroll Listener**
   ```tsx
   useEffect(() => {
     const unsubscribe = scrollYProgress.on('change', (latest) => {
       setScrollProgress(latest);
       console.log('Scroll:', latest); // Debug logging
     });
     return unsubscribe;
   }, [scrollYProgress]);
   ```

3. **Pass State to 3D Scene**
   ```tsx
   <Scene scrollProgress={scrollProgress} />
   ```

---

## 🧪 How to Test

### 1. Open Browser Console
Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)

### 2. Go to the Page
```
http://localhost:8080/3d-card
```

### 3. Watch for Scroll Logs
As you scroll, you should see in the console:
```
Scroll: 0.0
Scroll: 0.05
Scroll: 0.1
...
```

### 4. Observe the Indicators
- **Bottom-right**: Progress percentage (0% - 100%)
- **Top-left**: Current phase label

---

## 📊 Expected Behavior

| Scroll % | What Should Happen | Phase Label |
|----------|-------------------|-------------|
| **0-20%** | Wedding card visible with sparkles | 💝 Wedding Invitation |
| **20-40%** | Card panels fold together and go into envelope | 📧 Into Envelope |
| **40-70%** | Envelope rotates 360°, see red wax seal on back | 🔄 Rotating |
| **70-100%** | Business card slides out, moves to top-right | 💼 Business Card |

---

## 🐛 Troubleshooting

### Issue: Nothing is scrolling

**Check:**
1. Is the page height set correctly?
   - Should be `900vh` (9× viewport height)
   - Look for: `style={{ height: '900vh' }}`

2. Is the container positioned?
   - Should have `position: 'relative'`

**Fix:**
```tsx
<div style={{ height: '900vh', position: 'relative' }}>
```

### Issue: Console shows no "Scroll:" logs

**Problem**: Scroll listener not working

**Check:**
1. Is `useScroll` from framer-motion imported?
2. Is `containerRef` attached to the scroll container?

**Verify:**
```tsx
const containerRef = useRef<HTMLDivElement>(null);
// ...
<div ref={containerRef} style={{ height: '900vh' }}>
```

### Issue: 3D model appears but doesn't animate

**Problem**: Scroll progress not reaching the 3D component

**Debug:**
Add this inside `Card3D` component:
```tsx
console.log('Card3D received scrollProgress:', scrollProgress);
```

### Issue: Page is blank/white

**Problem**: Canvas error

**Check browser console for errors:**
- Environment preset issues
- Missing dependencies
- WebGL errors

---

## 🎯 Manual Animation Test

If scroll isn't working, you can manually test the animations:

### Edit the Scene Component:
```tsx
// Temporarily hardcode a scroll value
<Scene scrollProgress={0.5} /> // Test rotation phase
```

### Test Values:
- `0.0` = Wedding card
- `0.3` = Folding into envelope
- `0.5` = Rotating
- `0.8` = Business card emerging

---

## 🔍 Detailed Phase Calculations

The animations are calculated as follows:

```tsx
// Phase 1: Wedding card (0-20%)
const phase1 = Math.min(scrollProgress / 0.2, 1);

// Phase 2: Fold into envelope (20-40%)
const phase2 = Math.min(Math.max((scrollProgress - 0.2) / 0.2, 0), 1);

// Phase 3: Rotate envelope (40-70%)
const phase3 = Math.min(Math.max((scrollProgress - 0.4) / 0.3, 0), 1);

// Phase 4: Business card (70-100%)
const phase4 = Math.min(Math.max((scrollProgress - 0.7) / 0.3, 0), 1);
```

### Transformations Applied:

```tsx
// Scale down in final phase
const scale = 1 - phase4 * 0.5;

// Move to right in final phase
const posX = phase4 * 6;

// Move up in final phase
const posY = phase4 * 3.5;

// Full rotation during phase 3
const rotationY = phase3 * Math.PI * 2; // 0 to 360°
```

---

## ✅ Success Checklist

- [ ] Browser console shows "Scroll: X.XX" when scrolling
- [ ] Progress indicator updates (bottom-right)
- [ ] Phase label changes (top-left)
- [ ] Wedding card visible at top
- [ ] Card folds when scrolling
- [ ] Envelope rotates in middle section
- [ ] Business card appears at end
- [ ] Business card moves to corner

---

## 🚀 Next Steps

If everything is working:
1. Remove the debug `console.log` from the useEffect
2. Adjust animation timings if needed
3. Customize the 3D models
4. Add your own content

---

## 📞 Still Having Issues?

**Check these files:**
- `src/pages/Card3DShowcase.tsx` - Main component
- Browser DevTools Console - For errors
- Network tab - For loading issues

**Common Issues:**
1. **Outdated dependencies** - Run `npm install`
2. **Cache issues** - Hard refresh: `Ctrl+Shift+R`
3. **Port conflicts** - Make sure dev server is on port 8080

---

## 💡 Pro Tips

1. **Scroll slowly** for best experience
2. **Use mouse wheel** for precise control
3. **Watch the indicators** to track phases
4. **Open console** to see debug info
5. **Try different browsers** if issues persist

---

**Current Status**: 
- ✅ Fixed scroll progress tracking
- ✅ Added debug logging
- ✅ Ensured state updates
- ✅ No linter errors

**Refresh your browser and try scrolling now!** 🎉

