/**
 * App Loader Component
 * Manages loading state with minimum 2 second duration
 * Shows scan loader only
 */

import React, { useState, useEffect } from 'react';
import Loader from './Loader';

const AppLoader = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const startTime = React.useRef(Date.now());
  const minLoadTime = 2000; // 2 seconds minimum

  useEffect(() => {
    // Complete loading after minimum 2 seconds
    const completeTimer = setTimeout(() => {
      const elapsed = Date.now() - startTime.current;
      if (elapsed >= minLoadTime) {
        setLoading(false);
      } else {
        // Wait for remaining time
        const remaining = minLoadTime - elapsed;
        setTimeout(() => {
          setLoading(false);
        }, remaining);
      }
    }, minLoadTime);

    return () => {
      clearTimeout(completeTimer);
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AppLoader;

