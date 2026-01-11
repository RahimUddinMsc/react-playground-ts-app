import React, { useState } from 'react';
import { RadialMenuItem } from '../interfaces';
import { useRadialMenuContext } from '../RadialMenuContext';
import '../css/RadialMenu.css';

const RadialMenu: React.FC = () => {
  const {
    isOpen,
    position,
    items,
    handleItemClick,
    closeMenu
  } = useRadialMenuContext();

  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const hoveredItem = items.find(item => item.id === hoveredItemId);

  if (!isOpen) return null;

  const donutInnerRadius = 45;
  const donutOuterRadius = 95;
  const itemCount = items.length;
  const distance = (donutInnerRadius + donutOuterRadius) / 2;

  return (
    <>
      {/* Backdrop - closes on click */}
      <div 
        className="radial-backdrop"
        onClick={closeMenu}
      />
      
      {/* Main Container */}
      <div 
        className="radial-container"
        style={{
          left: `${position.x - donutOuterRadius}px`,
          top: `${position.y - donutOuterRadius}px`,
          width: `${donutOuterRadius * 2}px`,
          height: `${donutOuterRadius * 2}px`
        }}
      >
        {/* Center Circle - displays hovered item text */}
        <div
          className="radial-center-circle"
          role="button"
          title={hoveredItem ? hoveredItem.label : 'Close menu'}
          onClick={() => {
            if (!hoveredItem) closeMenu();
          }}
          style={{ cursor: hoveredItem ? 'default' : 'pointer' }}
        >
          {hoveredItem ? (
            <>
              <span className="center-icon">{hoveredItem.icon}</span>
              <span className="center-label">{hoveredItem.label}</span>
            </>
          ) : (
            <>
              <span className="center-icon center-icon-mini">❌</span>
              <span className="center-label">Close</span>
            </>
          )}
        </div>

<svg 
  className="donut-ring-svg"
  style={{
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  }}
  viewBox={`0 0 ${donutOuterRadius * 2} ${donutOuterRadius * 2}`}
>
  {items.map((item: RadialMenuItem, index: number) => {
    const isHovered = hoveredItemId === item.id;
    
    // 1. Define your gap width in pixels
    const gapPx = 6; 

    // 2. Calculate base angles
    const startAngle = (index / itemCount) * 360;
    const endAngle = ((index + 1) / itemCount) * 360;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    // 3. New Math: Calculate offsets for parallel edges
    // The offset angle must be larger at the inner radius than the outer radius
    const innerOffset = Math.asin(gapPx / (2 * donutInnerRadius));
    const outerOffset = Math.asin(gapPx / (2 * donutOuterRadius));

    // 4. Update coordinates with specific offsets
    const x1Inner = donutOuterRadius + donutInnerRadius * Math.cos(startRad + innerOffset);
    const y1Inner = donutOuterRadius + donutInnerRadius * Math.sin(startRad + innerOffset);
    const x2Inner = donutOuterRadius + donutInnerRadius * Math.cos(endRad - innerOffset);
    const y2Inner = donutOuterRadius + donutInnerRadius * Math.sin(endRad - innerOffset);

    const x1Outer = donutOuterRadius + donutOuterRadius * Math.cos(startRad + outerOffset);
    const y1Outer = donutOuterRadius + donutOuterRadius * Math.sin(startRad + outerOffset);
    const x2Outer = donutOuterRadius + donutOuterRadius * Math.cos(endRad - outerOffset);
    const y2Outer = donutOuterRadius + donutOuterRadius * Math.sin(endRad - outerOffset);

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    const pathData = `
      M ${x1Inner} ${y1Inner}
      L ${x1Outer} ${y1Outer}
      A ${donutOuterRadius} ${donutOuterRadius} 0 ${largeArc} 1 ${x2Outer} ${y2Outer}
      L ${x2Inner} ${y2Inner}
      A ${donutInnerRadius} ${donutInnerRadius} 0 ${largeArc} 0 ${x1Inner} ${y1Inner}
      Z
    `;

    return (
      <path
        key={item.id}
        d={pathData}
        className={`donut-segment ${isHovered ? 'hovered' : ''} ${hoveredItemId && !isHovered ? 'blurred' : ''}`}
        fill={isHovered ? 'rgba(118, 75, 162, 0.9)' : 'rgba(102, 126, 234, 0.6)'}
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="1"
        onMouseEnter={() => setHoveredItemId(item.id)}
        onMouseLeave={() => setHoveredItemId(null)}
        onClick={() => handleItemClick(item.id)}
        style={{ 
          cursor: 'pointer',
          animation: `slideIn 0.3s ease-out ${index * 0.08}s backwards`
        }}
      />
    );
  })}
</svg>

{/* Item labels positioned in donut */}
{items.map((item: RadialMenuItem, index: number) => {
  const angle = ((index + 0.5) / itemCount) * Math.PI * 2;
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;
  const isHovered = hoveredItemId === item.id;

  return (
    <div
      key={`label-${item.id}`}
      className={`donut-label ${isHovered ? 'hovered' : ''} ${hoveredItemId && !isHovered ? 'blurred' : ''}`}
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: `translate(-50%, -50%)`,
        position: 'absolute', // Added to ensure correct alignment
        pointerEvents: 'none', // Prevents label from blocking SVG hover
        animation: `slideIn 0.5s ease-out ${index * 0.08}s backwards`
      }}
      onMouseEnter={() => setHoveredItemId(item.id)}
      onMouseLeave={() => setHoveredItemId(null)}
    >
      <span className="label-icon">{item.icon}</span>
    </div>
  );
})}
      </div>
    </>
  );
};

export default RadialMenu;