import React, {useMemo, useState, useRef, useEffect} from 'react';
import {ToothpickPattern} from '../lib/pattern';
import Component from './Component';

const useTick = (duration: number, max: number) => {
  const [frame, setFrame] = useState(1);
  const frameRef = useRef(frame);
  useEffect(() => {
    const update = () => {
      frameRef.current = frameRef.current + 1;
      setFrame(frameRef.current);
      if(frameRef.current < max) {
        window.setTimeout(update, duration);
      }
    }
    const interval = window.setTimeout(update, duration);
    return () => window.clearTimeout(interval);
  }, [duration, max]);

  return frame;
}

const Container: React.FC = () => {
  const pattern = useMemo(() => {
    const pattern = new ToothpickPattern();
    (window as any).pattern = pattern;
    return pattern;
  }, []);

  const tick = useTick(100, 1000)
  if(tick > pattern.generations.length) {
    pattern.buildNextGeneration();
  }
  const size = 800;
  const scale = (0.9*size)/pattern.generations.length;

  return <Component pattern={pattern} size={size} scale={scale} />;
}

export default Container;
