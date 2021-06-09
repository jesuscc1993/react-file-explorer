import './favorites-pane.component.css';

import React, { FC, useState } from 'react';

import { getFolderName } from '../../domain/files.domain';
import { useAppContext } from '../../hooks/use-app-context.hook';
import { AppSortableList } from '../_generic/sortable-list.component';

type Props = {
  onPathPress: (path: string) => void;
};

export const AppFavoritesPane: FC<Props> = ({ onPathPress }) => {
  const [editMode, setEditMode] = useState(false);

  const { appSettings, removeFavorite, setFavorites } = useAppContext();

  const toggleEditMode = () => setEditMode(!editMode);

  return (
    <div className="favorites-view sidebar pane">
      {!!appSettings.favorites.length && (
        <h4 className="pane-title">
          <span>Favorites</span>

          <span className="material-icons clickable" onClick={toggleEditMode}>
            {editMode ? 'edit_off' : 'edit'}
          </span>
        </h4>
      )}

      <AppSortableList
        items={appSettings.favorites}
        getKey={(item) => item}
        renderItem={(favorite) => {
          const _onPathPress = () => {
            onPathPress(favorite);
          };

          const _onUnfavoritePress = () => {
            removeFavorite(favorite);
          };

          return (
            <div className="favorite" onClick={_onPathPress}>
              <span>{getFolderName(favorite)}</span>
              <span
                className={`material-icons clickable ${!editMode && 'hidden'}`}
                onClick={_onUnfavoritePress}
              >
                delete
              </span>
            </div>
          );
        }}
        setItems={setFavorites}
      />
    </div>
  );
};
