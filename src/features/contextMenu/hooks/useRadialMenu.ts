import { useState, useCallback, useEffect } from 'react';
import { RadialMenuItem } from '../interfaces';
import { radialMenuConfig } from '../config';

export const useRadialMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetElementId, setTargetElementId] = useState('');
  const [onItemAction, setOnItemAction] = useState<(() => void) | null>(null);


  const openMenu = useCallback((x: number, y: number, elementId: string, callback?: () => void) => {
    setPosition({ x, y });
    setTargetElementId(elementId);
    setOnItemAction(() => callback || null);
    setIsOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setTargetElementId('');
  }, []);

  const handleItemClick = useCallback((itemId: string) => {
    const item = radialMenuConfig.find(i => i.id === itemId);
    if (item && targetElementId) {              
      if(item.btnActionTriggerSelector) {
        const button = document.querySelector(`[data-context-func="${item.btnActionTriggerSelector}"]`) as HTMLElement;
        if (button) 
          button.click();        
      }

      if (onItemAction) 
        onItemAction();      
    }
    closeMenu();
  }, [targetElementId, closeMenu]);

  return {
    isOpen,
    position,
    items: radialMenuConfig,
    targetElementId,
    openMenu,
    closeMenu,
    handleItemClick
  };
};
