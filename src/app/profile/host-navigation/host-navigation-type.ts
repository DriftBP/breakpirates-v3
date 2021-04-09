export enum HostNavigationType {
  Previous,
  Next
}

export type HostNavigation<T extends number, V> = {
  [K in T]: V;
}
