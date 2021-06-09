import React, { DragEvent, FC, useState } from 'react';

export type AppSortableListProps = {
  className?: string;
  items: unknown[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getKey: (item: any) => string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderItem: (item: any) => JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setItems: (items: any[]) => void;
};

export const AppSortableList: FC<AppSortableListProps> = ({
  className,
  items,
  getKey,
  renderItem,
  setItems,
}) => {
  const [dragItem, setDragItem] = useState<HTMLDivElement>();

  const onDragStart = (ev: DragEvent<HTMLDivElement>) => {
    setDragItem(ev.currentTarget);
  };

  const onDragEnd = (ev: DragEvent<HTMLDivElement>) => {
    const dragBoxItem = items.findIndex(
      (item) => getKey(item) === dragItem?.getAttribute('data-key'),
    );
    const dropBoxItem = items.findIndex(
      (item) => getKey(item) === ev.currentTarget.getAttribute('data-key'),
    );

    const updateditems = [...items];
    updateditems[dragBoxItem] = items[dropBoxItem];
    updateditems[dropBoxItem] = items[dragBoxItem];

    setItems(updateditems);
  };

  return (
    <div className={className}>
      {items.map((item) => (
        <div
          draggable={true}
          key={getKey(item)}
          data-key={getKey(item)}
          onDragOver={(ev) => ev.preventDefault()}
          onDrop={onDragEnd}
          onDragStart={onDragStart}
        >
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
};
