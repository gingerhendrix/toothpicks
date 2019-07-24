import React, {useMemo} from 'react';
import {Generation as ToothpickGeneration, ToothpickPattern, Point} from '../lib/pattern';

const Line: React.FC<{ends: [Point, Point]}> = ({ends: [start, finish]}) =>
  <line x1={start.x} y1={start.y} x2={finish.x} y2={finish.y} style={{
    stroke: 'rgb(0,0,255)',
    strokeWidth: 0.05,
  }} />

const Generation: React.FC<{generation: ToothpickGeneration}> = ({generation}) => (
  <g>
    {
      generation.toothpicks.map(toothpick =>
        <Line ends={toothpick.ends()} key={toothpick.center.toString()} />
      )
    }
  </g>
);

interface ComponentProps {
  pattern: ToothpickPattern,
  size: number,
  scale: number,
}

const Component: React.FC<ComponentProps> = ({pattern, size, scale}) => (
  <svg width={size} height={size}>
    <g transform={`translate(${size/2}, ${size/2}) scale(${scale})`} >
    {
      pattern.generations.map((generation, idx) =>
        <Generation generation={generation} key={idx} />
      )
    }
    </g>
  </svg>
);


export default Component;
