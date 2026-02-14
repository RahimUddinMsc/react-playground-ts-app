import React, { JSX, useState } from 'react';
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

  const [hoveredPath, setHoveredPath] = useState<string[]>([]);
  const hoveredItemId = hoveredPath[hoveredPath.length - 1] || null;
  
  const findItemById = (list: RadialMenuItem[], id?: string): RadialMenuItem | undefined => {
    if (!id) return undefined;
    for (const it of list) {
      if (it.id === id) return it;
      if (it.linkedActions) {
        const found = findItemById(it.linkedActions, id);
        if (found) return found;
      }
    }
    return undefined;
  };
  
  const hoveredItem = findItemById(items, hoveredItemId || undefined);

  if (!isOpen) return null;

  const baseInner = 45;
  const ringThickness = 50; // thickness of each ring
  const ringMargin = 10; // desired margin between rings (user requested ~6px)

  const getMaxDepth = (list: RadialMenuItem[]): number => {
    let max = 0;
    for (const it of list) {
      if (it.linkedActions) {
        const childDepth = 1 + getMaxDepth(it.linkedActions);
        if (childDepth > max) max = childDepth;
      }
    }
    return max;
  };

  const maxDepth = getMaxDepth(items);
  const outerMost = baseInner + maxDepth * (ringThickness + ringMargin) + ringThickness;

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
          left: `${position.x - outerMost}px`,
          top: `${position.y - outerMost}px`,
          width: `${outerMost * 2}px`,
          height: `${outerMost * 2}px`
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
          viewBox={`0 0 ${outerMost * 2} ${outerMost * 2}`}
        >
          {
            // recursive ring renderer
            (() => {
              const rings: JSX.Element[] = [];

              const renderRing = (
                list: RadialMenuItem[],
                depth: number,
                parentPath: string[]
              ) => {
                const inner = baseInner + depth * (ringThickness + ringMargin);
                const outer = inner + ringThickness;
                const itemCountLocal = list.length;
                const distanceLocal = (inner + outer) / 2;
                const gapPx = 6;

                list.forEach((item, idx) => {
                  const startAngle = (idx / itemCountLocal) * 360;
                  const endAngle = ((idx + 1) / itemCountLocal) * 360;
                  const startRad = (startAngle * Math.PI) / 180;
                  const endRad = (endAngle * Math.PI) / 180;
                  const innerOffset = Math.asin(gapPx / (2 * Math.max(8, inner)));
                  const outerOffset = Math.asin(gapPx / (2 * Math.max(8, outer)));

                  const cx = outerMost;
                  const cy = outerMost;

                  const x1Inner = cx + inner * Math.cos(startRad + innerOffset);
                  const y1Inner = cy + inner * Math.sin(startRad + innerOffset);
                  const x2Inner = cx + inner * Math.cos(endRad - innerOffset);
                  const y2Inner = cy + inner * Math.sin(endRad - innerOffset);

                  const x1Outer = cx + outer * Math.cos(startRad + outerOffset);
                  const y1Outer = cy + outer * Math.sin(startRad + outerOffset);
                  const x2Outer = cx + outer * Math.cos(endRad - outerOffset);
                  const y2Outer = cy + outer * Math.sin(endRad - outerOffset);

                  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

                  const pathData = `M ${x1Inner} ${y1Inner} L ${x1Outer} ${y1Outer} A ${outer} ${outer} 0 ${largeArc} 1 ${x2Outer} ${y2Outer} L ${x2Inner} ${y2Inner} A ${inner} ${inner} 0 ${largeArc} 0 ${x1Inner} ${y1Inner} Z`;

                  const currentPath = [...parentPath, item.id];
                  const isHoveredHere = hoveredPath[depth] === item.id && hoveredPath.length > depth;
                  const isDimmed = hoveredPath.length > 0 && !(hoveredPath[depth] === item.id);

                  rings.push(
                    <path
                      key={`ring-${depth}-${item.id}`}
                      d={pathData}
                      className={`donut-segment ${isHoveredHere ? 'hovered' : ''} ${isDimmed ? 'blurred' : ''}`}
                      fill={isHoveredHere ? 'rgba(118, 75, 162, 0.9)' : 'rgba(102, 126, 234, 0.6)'}
                      stroke="rgba(255, 255, 255, 0.12)"
                      strokeWidth="1"
                      onMouseEnter={() => setHoveredPath(currentPath)}
                      onMouseLeave={() => setHoveredPath(parentPath)}
                      onClick={() => handleItemClick(item.id)}
                      style={{ cursor: 'pointer', animation: `slideIn 0.3s ease-out ${idx * 0.06}s backwards` }}
                    />
                  );

                  // label
                  const angle = ((idx + 0.5) / itemCountLocal) * Math.PI * 2;
                  const lx = Math.cos(angle) * distanceLocal;
                  const ly = Math.sin(angle) * distanceLocal;

                  rings.push(
                    <foreignObject
                      key={`label-${depth}-${item.id}`}
                      x={cx + lx - 18}
                      y={cy + ly - 10}
                      width={36}
                      height={20}
                      style={{ pointerEvents: 'none', overflow: 'visible' }}
                    >
                      <div className={`donut-label ${isHoveredHere ? 'hovered' : ''} ${isDimmed ? 'blurred' : ''}`} style={{ textAlign: 'center' }}>
                        <span className="label-icon">{item.icon}</span>
                      </div>
                    </foreignObject>
                  );

                  // recursively render children if hovered
                  if (item.linkedActions && hoveredPath[depth] === item.id) {
                    renderRing(item.linkedActions, depth + 1, currentPath);
                  }
                });
              };

              renderRing(items, 0, []);
              return rings;
            })()
          }
        </svg>
      </div>
    </>
  );
};

export default RadialMenu;