
import { RadialMenuItem } from './interfaces';

export const radialMenuConfig: RadialMenuItem[] = [
  {
    id: 'copy',
    label: 'Copy',
    icon: '📋',    
  },
  {
    id: 'edit',
    label: 'Edit', 
    icon: '✏️',    
    btnActionTriggerSelector: 'context-btn-remove-all',
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: '🗑️',
    // action: (elementId: string) => console.log(`Move down ${elementId}`)
  },
  {
    id: 'duplicate',
    label: 'Duplicate',
    icon: '📝',    
  },
  {
    id: 'move-up',
    label: 'Move Up',
    icon: '⬆️',    
  },
  {
    id: 'move-down',
    label: 'Move Down',
    icon: '⬇️',    
  }
];
