import './favorites-pane.component.css';

import React, { FC } from 'react';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';

import { getFolderName } from '../../domain/files.domain';
import { useAppContext } from '../../hooks/use-app-context.hook';

type Props = {
  onPathPress: (path: string) => void;
};

export const AppFavoritesPane: FC<Props> = ({ onPathPress }) => {
  const { appState, removeFavorite } = useAppContext();

  return (
    <div className="favorites-view sidebar pane">
      {!!appState.favorites.length && <h4 className="pane-title">Favorites</h4>}

      {appState.favorites.map((favorite) => {
        const _onPathPress = () => {
          onPathPress(favorite);
        };

        const _onUnfavoritePress = () => {
          removeFavorite(favorite);
        };

        return (
          <div key={favorite}>
            <ContextMenuTrigger id={`${favorite}-favorite`}>
              <div key={favorite} className="favorite" onClick={_onPathPress}>
                {getFolderName(favorite)}
              </div>
            </ContextMenuTrigger>

            <ContextMenu id={`${favorite}-favorite`}>
              <MenuItem onClick={_onUnfavoritePress}>
                Remove from favorites
              </MenuItem>
            </ContextMenu>
          </div>
        );
      })}
    </div>
  );
};
