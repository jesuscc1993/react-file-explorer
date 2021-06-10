import './favorites-pane.component.css';

import React, { FC } from 'react';

import { useAppContext } from '../../hooks/use-app-context.hook';
import { AppSortableList } from '../_generic/sortable-list.component';
import { AppFavoriteItem } from '../favorite-item/favorite-item';

type Props = {
  onPathPress: (path: string) => void;
};

export const AppFavoritesPane: FC<Props> = ({ onPathPress }) => {
  const { appSettings, setFavorites } = useAppContext();

  const renderItem = (path: string) => (
    <AppFavoriteItem path={path} onPathPress={onPathPress} />
  );

  return (
    <div className="favorites-view sidebar pane">
      {!!appSettings.favorites.length && (
        <h4 className="pane-title">
          <span>Favorites</span>
        </h4>
      )}

      <AppSortableList
        items={appSettings.favorites}
        getKey={(item) => item}
        renderItem={renderItem}
        setItems={setFavorites}
      />
    </div>
  );
};
