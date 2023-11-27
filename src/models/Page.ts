export interface Page {
  path: string;
  exact?: boolean;
  component: React.ComponentType<any>;
}
