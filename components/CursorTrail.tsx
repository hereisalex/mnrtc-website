'use client';

import React, { useEffect, useState, useRef } from 'react';

interface TrailDot {
  id: number;
  x: number;
  y: number;
}

export default function CursorTrail() {
  const [trails, setTrails] = useState<TrailDot[]>([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newTrail: TrailDot = {
        id: trailIdRef.current++,
        x: e.clientX,
        y: e.clientY,
      };

      setTrails(prev => [...prev.slice(-5), newTrail]); // Keep only last 5 trails
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []); // Remove trailId from dependencies

  return (
    <>
      {trails.map(trail => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: trail.x - 4,
            top: trail.y - 4,
          }}
        />
      ))}
    </>
  );
}
