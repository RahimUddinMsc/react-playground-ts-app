import React, { useState, useRef, useEffect } from 'react';
import { ListMenuItem } from '../interfaces';
import { useListMenuContext } from '../ListMenuContext';
import '../css/ListMenu.css';

const ListMenu: React.FC = () => {
  const { isOpen, position, items, handleItemClick, closeMenu } = useListMenuContext();
  const [hoveredPath, setHoveredPath] = useState<string[]>([]);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prevHoveredPathRef = useRef<string[]>([]);
  const openedSubmenusRef = useRef<Set<string>>(new Set());

  // Track when submenus first become visible
  useEffect(() => {
    // Remove animations for submenus no longer in the path or changed at same depth
    const keysToRemove: string[] = [];
    openedSubmenusRef.current.forEach((submenuKey) => {
      const parts = submenuKey.split('-');
      const depthNum = parseInt(parts[0]);
      const itemId = parts.slice(1).join('-'); // Handle item IDs with hyphens
      
      // If this depth is no longer in path or the item changed at this depth, remove animation state
      if (depthNum >= hoveredPath.length || hoveredPath[depthNum] !== itemId) {
        keysToRemove.push(submenuKey);
      }
    });
    keysToRemove.forEach((key) => openedSubmenusRef.current.delete(key));

    // Check each level in hoveredPath and add animation state for new submenus
    for (let depth = 0; depth < hoveredPath.length; depth++) {
      const itemId = hoveredPath[depth];
      const submenuKey = `${depth}-${itemId}`;
      
      // If this submenu is visible but wasn't before, mark it for animation
      if (hoveredPath[depth] !== prevHoveredPathRef.current[depth]) {
        openedSubmenusRef.current.add(submenuKey);
      }
    }
    
    prevHoveredPathRef.current = hoveredPath;
  }, [hoveredPath]);

  // Reset animations when menu opens
  useEffect(() => {
    if (isOpen) {
      openedSubmenusRef.current.clear();
      setHoveredPath([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getAvailableHeight = (): number => {
    const maxHeight = window.innerHeight - 100;
    const itemHeight = 44;
    const maxItems = Math.floor(maxHeight / itemHeight);
    return Math.min(items.length, Math.max(3, maxItems)) * itemHeight;
  };

  const adjustedPosition = {
    x: Math.min(position.x, window.innerWidth - 280),
    y: Math.min(position.y, window.innerHeight - getAvailableHeight() - 20),
  };

  const handleMouseEnter = (itemId: string, depth: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    // Keep path up to current depth, then add this item
    setHoveredPath((prev) => [...prev.slice(0, depth), itemId]);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredPath([]);
    }, 300);
  };

  const ListMenuItems: React.FC<{ items: ListMenuItem[]; depth?: number }> = ({
    items,
    depth = 0,
  }) => {
    return (
      <ul className={`list-items ${depth > 0 ? 'submenu' : ''}`}>
        {items.map((item) => {
          const isExpandable = item.linkedActions && item.linkedActions.length > 0;
          const isHovered = hoveredPath[depth] === item.id;
          const submenuKey = `${depth}-${item.id}`;
          
          // Animate only if this submenu just became visible
          const shouldAnimate = isHovered && !openedSubmenusRef.current.has(submenuKey);

          return (
            <li
              key={item.id}
              className={`list-item-wrapper ${isHovered ? 'hovered' : ''}`}
              onMouseEnter={() => handleMouseEnter(item.id, depth)}
            >
              <button
                className="list-item"
                onClick={() => {
                  if (!isExpandable) {
                    handleItemClick(item.id);
                  }
                }}
              >
                <span className="item-icon">{item.icon}</span>
                <span className="item-label">{item.label}</span>
                {isExpandable && <span className="item-arrow">›</span>}
              </button>

              {/* Submenu - always in DOM but hidden with CSS when not hovered */}
              {isExpandable && (
                <div 
                  className={`submenu-container ${isHovered ? 'visible' : ''} ${shouldAnimate ? 'animate-in' : ''}`}
                >
                  <ListMenuItems items={item.linkedActions!} depth={depth + 1} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      {/* Backdrop - closes on click */}
      <div className="list-backdrop" onClick={closeMenu} />

      {/* List Container */}
      <div
        className="list-container"
        style={{
          left: `${adjustedPosition.x}px`,
          top: `${adjustedPosition.y}px`,
        }}
        onMouseLeave={handleMouseLeave}
      >
        <ListMenuItems items={items} />
      </div>
    </>
  );
};

export default ListMenu;
