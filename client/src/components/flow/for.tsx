type ForProps<T> = {
  items: T[];
  children: (item: T, index: number) => React.ReactNode;
};

export const For = <T,>({ items, children }: ForProps<T>) => {
  return <>{items.map(children)}</>;
};
