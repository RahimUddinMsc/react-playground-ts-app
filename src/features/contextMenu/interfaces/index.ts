export interface RadialMenuItem {
  id: string;
  label: string;
  icon: string;
  btnActionTriggerSelector?: string;  
  contextAction?: () => void;   
  linkedActions?: RadialMenuItem[];
}

export interface RadialMenuConfig {
  items: RadialMenuItem[];
}
