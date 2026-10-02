export interface ContentNavigationLink {
  id: number;
  label: string;
}

export interface ContentNavigation {
  previous: ContentNavigationLink;
  next: ContentNavigationLink;
}

export function createContentNavigation<T extends { id: number }>(
  items: readonly T[],
  currentId: number,
  getLabel: (item: T) => string
): ContentNavigation | null {
  const position = items.findIndex(item => item.id === currentId);

  if (position < 0 || items.length === 0) {
    return null;
  }

  const previous = items[(position - 1 + items.length) % items.length];
  const next = items[(position + 1) % items.length];

  return {
    previous: { id: previous.id, label: getLabel(previous) },
    next: { id: next.id, label: getLabel(next) }
  };
}
