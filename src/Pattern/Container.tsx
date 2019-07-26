import React, {useMemo} from 'react';
import useIntervalTimer from '@gingerhendrix/use-interval-timer';
import Controls from '@gingerhendrix/react-animation-controls';
import 'rc-slider/assets/index.css';
import {ToothpickPattern} from '../lib/pattern';
import Component from './Component';

const Container: React.FC = () => {
  const pattern = useMemo(() => {
    const pattern = new ToothpickPattern();
    (window as any).pattern = pattern;
    return pattern;
  }, []);
  const max = 100;
  const framerate = 10;

  const {tick, started, stop, start, setTick} = useIntervalTimer({interval: 1000/framerate, maxTicks: max})
  while(tick > pattern.generations.length) {
    pattern.buildNextGeneration();
  }
  const size = 800;
  const scale = (0.9*size)/(tick + 1);

  return (
    <div>
      <Component pattern={pattern} size={size} scale={scale} generation={tick} />
      <Controls n={tick} max={max} started={started} start={start} stop={stop} setTick={setTick} />
    </div>
  );
}

export default Container;
