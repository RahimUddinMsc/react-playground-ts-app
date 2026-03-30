export interface ListMenuItem {
  id: string;
  label: string;
  icon: string;
  btnActionTriggerSelector?: string;
  contextAction?: () => void;
  linkedActions?: ListMenuItem[];
}

export interface ListMenuConfig {
  items: ListMenuItem[];
}
