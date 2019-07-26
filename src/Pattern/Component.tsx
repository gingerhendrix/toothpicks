import React from 'react';
import {Generation as ToothpickGeneration, ToothpickPattern, Point} from '../lib/pattern';

const Line: React.FC<{ends: [Point, Point], current: boolean}> = ({ends: [start, finish], current}) =>
  <line x1={start.x} y1={start.y} x2={finish.x} y2={finish.y} style={{
    stroke: current ? 'rgb(0,0,255)' : 'rgb(0,255,0)',
    transition: 'stroke 4s',
    strokeWidth:  0.5,
  }} />

const GenerationBase: React.FC<{generation: ToothpickGeneration, current: boolean}> = ({generation, current=false}) => (
  <g>
    {
      generation.toothpicks.map(toothpick =>
        <Line ends={toothpick.ends()} key={toothpick.center.toString()} current={current} />
      )
    }
  </g>
);

const Generation = React.memo(GenerationBase);

export const BoundingBox: React.FC<{gen: number}> = ({gen}) => {
  const x = -(gen/2);
  const y = -(gen/2);
  const width = gen;
  const height = gen;
  const style = {
    stroke: "red",
    strokeWidth: 0.5,
    fill: "none",
  }

  return <rect x={x} y={y} width={width} height={height} style={style} />
};

interface ComponentProps {
  pattern: ToothpickPattern,
  size: number,
  scale: number,
  generation: number,
}

const Component: React.FC<ComponentProps> = ({pattern, size, scale, generation}) => (
  <svg width={size} height={size} style={{backgroundColor: 'black'}}>
    <g transform={`translate(${size/2}, ${size/2}) scale(${scale})`} >
    {
      pattern.generations.slice(0, generation).map((generation, idx) =>
        <Generation generation={generation} key={idx} current={idx === pattern.generations.length - 1} />
      )
    }
    </g>
  </svg>
);


export default Component;
