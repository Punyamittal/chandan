/**
 * Safe FluidGlass Wrapper
 * Handles missing 3D models gracefully
 */

import React, { useState, useEffect } from 'react';
import FluidGlass from './FluidGlass';

interface FluidGlassSafeProps {
  mode?: 'lens' | 'bar' | 'cube';
  lensProps?: Record<string, unknown>;
  barProps?: Record<string, unknown>;
  cubeProps?: Record<string, unknown>;
  fallback?: React.ReactNode;
}

const FluidGlassSafe: React.FC<FluidGlassSafeProps> = ({
  mode = 'lens',
  lensProps = {},
  barProps = {},
  cubeProps = {},
  fallback = null,
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check if model file exists
    const modelPath = mode === 'bar' 
      ? '/assets/3d/bar.glb'
      : mode === 'cube'
      ? '/assets/3d/cube.glb'
      : '/assets/3d/lens.glb';

    fetch(modelPath, { method: 'HEAD' })
      .then((response) => {
        if (response.ok && response.headers.get('content-type')?.includes('model/gltf')) {
          setShouldRender(true);
        } else {
          setShouldRender(false);
        }
      })
      .catch(() => {
        setShouldRender(false);
      });
  }, [mode]);

  // Don't render if model doesn't exist or if there's an error
  if (!shouldRender || hasError) {
    return <>{fallback}</>;
  }

  return (
    <div className="absolute inset-0 w-full h-full opacity-20 pointer-events-none z-0">
      <div style={{ height: '100%', width: '100%', position: 'relative' }}>
        <ErrorBoundary onError={() => setHasError(true)}>
          <FluidGlass
            mode={mode}
            lensProps={lensProps}
            barProps={barProps}
            cubeProps={cubeProps}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
};

// Simple Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError: () => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export default FluidGlassSafe;

