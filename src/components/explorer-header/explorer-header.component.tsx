import './explorer-header.component.css';

import React, { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { directorySeparator } from '../../constants/explorer.constants';
import { getSanitizedAddress } from '../../domain/os.domain';
import { getOppositeViewMode, getViewModeIcon } from '../../domain/settings.domain';
import { countInstancesInString } from '../../domain/strings.domain';
import { useAppContext } from '../../hooks/use-app-context.hook';

type Props = {
  path: string;
};

export const AppExplorerHeader: FC<Props> = ({ path }) => {
  const history = useHistory();
  const { appState, setAppState } = useAppContext();

  const [formAddress, setFormAddress] = useState(path);

  useEffect(() => setFormAddress(path), [path]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormAddress(event.target.value);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const newAddress = getSanitizedAddress(formAddress);
      setFormAddress(newAddress);
      history.push(`/explorer?path=${getSanitizedAddress(formAddress)}`);
    }
  };

  const navigateUp = () => {
    const slashCount = countInstancesInString(path, directorySeparator);

    let newPath;

    if (slashCount > 1) {
      const pathParts = path.split(directorySeparator);
      pathParts.pop();
      newPath = pathParts.join(directorySeparator);
    } else if (
      slashCount === 1 &&
      path.startsWith(directorySeparator) &&
      path !== directorySeparator
    ) {
      newPath = directorySeparator;
    }

    if (newPath && newPath !== path) {
      history.push(`/explorer?path=${newPath}`);
    }
  };

  const toggleLeftSidebar = () => {
    setAppState({ ...appState, leftSidebar: !appState.leftSidebar });
  };

  const toggleRightSidebar = () => {
    setAppState({ ...appState, rightSidebar: !appState.rightSidebar });
  };

  const toggleViewMode = () => {
    setAppState({
      ...appState,
      viewMode: getOppositeViewMode(appState.viewMode),
    });
  };

  return (
    <div className="explorer-header pane">
      <button title="Toggle left sidebar" onClick={toggleLeftSidebar}>
        <span className={`material-icons ${!appState.leftSidebar && 'off'}`}>
          table_chart
        </span>
      </button>

      <span className="separator" />

      <button className="back" title="Go back" onClick={history.goBack}>
        <span className="material-icons">arrow_back</span>
      </button>
      <button
        className="forward"
        title="Go forward"
        onClick={history.goForward}
      >
        <span className="material-icons">arrow_forward</span>
      </button>

      <button className="up" title="Go up" onClick={navigateUp}>
        <span className="material-icons">arrow_upward</span>
      </button>

      <input
        className="address-input"
        value={formAddress}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      <button title="Toggle view mode" onClick={toggleViewMode}>
        <span className="material-icons">
          {getViewModeIcon(appState.viewMode)}
        </span>
      </button>

      <span className="separator" />

      <button title="Toggle right sidebar" onClick={toggleRightSidebar}>
        <span className={`material-icons ${!appState.rightSidebar && 'off'}`}>
          table_chart
        </span>
      </button>
    </div>
  );
};
