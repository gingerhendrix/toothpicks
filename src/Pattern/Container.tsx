import React, {useMemo} from 'react';
import {ToothpickPattern} from '../lib/pattern';
import Component from './Component';

const Container: React.FC = () => {
  const pattern = useMemo(() => {
    const pattern = new ToothpickPattern();
    (window as any).pattern = pattern;
    for(let i = 0; i < 210; i++) {
      pattern.buildNextGeneration();
    }
    return pattern;
  }, []);

  return <Component pattern={pattern} size={1200} scale={4} />;
}

export default Container;
