export interface RadialMenuItem {
  id: string;
  label: string;
  icon: string;
  btnActionTriggerSelector?: string;  
  contextAction?: () => void;   
}

export interface RadialMenuConfig {
  items: RadialMenuItem[];
}
