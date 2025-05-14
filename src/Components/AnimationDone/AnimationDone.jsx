import React from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

export default function AnimationDone() {
  const { width, height } = useWindowSize();

  if (!width || !height) return null;

  return <Confetti width={width} height={height} />;
}
