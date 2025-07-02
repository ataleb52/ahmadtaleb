import { useRef, useEffect } from 'react';
import { useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export function useMouseGradient() {
  const workshopRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300, mass: 0.7 };
  const animatedX = useSpring(mouseX, springConfig);
  const animatedY = useSpring(mouseY, springConfig);
  const gradientStyle = useMotionTemplate`radial-gradient(500px circle at ${animatedX}px ${animatedY}px, rgba(0,128,255,0.1), transparent 70%)`;

  const isMobile = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    const el = workshopRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    const handleLeave = () => {
      mouseX.set(el.offsetWidth / 2);
      mouseY.set(el.offsetHeight / 2);
    };
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    mouseX.set(el.offsetWidth / 2);
    mouseY.set(el.offsetHeight / 2);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [mouseX, mouseY]);

  return { workshopRef, gradientStyle: { background: gradientStyle }, isMobile };
}
