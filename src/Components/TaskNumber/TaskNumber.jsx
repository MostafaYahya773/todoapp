import React from 'react';

const TaskProgressCircle = ({
  completed,
  total,
  size = 110,
  strokeWidth = 8,
  color = '#00bfa6',
  bgColor = '#e5e7eb',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage =
    total > 0 ? Math.min(Math.round((completed / total || 0) * 100), 100) : 0;

  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        marginTop: '15px',
      }}
    >
      <svg width={size} height={size}>
        <circle
          stroke={bgColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transition: 'stroke-dashoffset 0.5s ease',
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '1.5rem', color: '#666' }}>{percentage}%</div>
      </div>
    </div>
  );
};

export default TaskProgressCircle;
