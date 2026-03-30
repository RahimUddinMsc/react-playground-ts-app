
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
  },
  {
    id: 'duplicate',
    label: 'Duplicate',
    icon: '📝',    
  },
  {
    id: 'add',
    label: 'Add',
    icon: '＋',
    linkedActions: [
      { id: 'add-text', label: 'Text', icon: '🔤' },
      { id: 'add-image', label: 'Image', icon: '🖼️' },
      { id: 'add-video', label: 'Video', icon: '🎞️', contextAction: () => console.log(`testing`) },
      { id: 'add-divider', label: 'Divider', icon: '➖', linkedActions: [
        { id: 'add-divider-short', label: 'Short', icon: '–' },
        { id: 'add-divider-long', label: 'Long', icon: '—' }
      ] }
    ]
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
