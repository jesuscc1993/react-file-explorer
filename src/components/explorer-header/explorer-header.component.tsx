import './explorer-header.component.css';

import React, { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { useHistory } from 'react-router';

import { directorySeparator } from '../../constants/file-system.constants';
import { getSanitizedAddress } from '../../domain/os.domain';
import { getOppositeViewMode, getViewModeIcon } from '../../domain/settings.domain';
import { countInstancesInString } from '../../domain/strings.domain';
import { useAppContext } from '../../hooks/use-app-context.hook';
import { useQueryParams } from '../../hooks/use-query-params.hook';
import { AppSettingsModal } from '../_modals/settings/settings.modal';

export const AppExplorerHeader: FC = () => {
  const params = useQueryParams();
  const history = useHistory();
  const { appSettings, filter, setAppSettings, setFilter } = useAppContext();

  const path = params.get('path') || '';

  const [formAddress, setFormAddress] = useState(path);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  useEffect(() => setFormAddress(path), [path]);

  const onAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormAddress(event.target.value);
  };

  const onAddressKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const newAddress = getSanitizedAddress(formAddress);
      setFormAddress(newAddress);
      history.push(`/explorer?path=${getSanitizedAddress(formAddress)}`);
    }
  };

  const onFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
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
    setAppSettings({ ...appSettings, leftSidebar: !appSettings.leftSidebar });
  };

  const toggleRightSidebar = () => {
    setAppSettings({ ...appSettings, rightSidebar: !appSettings.rightSidebar });
  };

  const toggleViewMode = () => {
    setAppSettings({
      ...appSettings,
      viewMode: getOppositeViewMode(appSettings.viewMode),
    });
  };

  const toggleSettingsModal = () => {
    setSettingsModalVisible(!settingsModalVisible);
  };

  return (
    <div className="explorer-header pane">
      <button
        className="left-sidebar"
        title="Toggle left sidebar"
        onClick={toggleLeftSidebar}
      >
        <span className={`material-icons ${!appSettings.leftSidebar && 'off'}`}>
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

      <button className="up vertical-margin" title="Go up" onClick={navigateUp}>
        <span className="material-icons">arrow_upward</span>
      </button>

      <input
        className="address-input"
        value={formAddress}
        onChange={onAddressChange}
        onKeyDown={onAddressKeyDown}
      />

      <input
        className="filter-input"
        placeholder="Filter"
        value={filter}
        onChange={onFilterChange}
      />

      <button
        className="view-mode vertical-margin"
        title="Toggle view mode"
        onClick={toggleViewMode}
      >
        <span className="material-icons">
          {getViewModeIcon(appSettings.viewMode)}
        </span>
      </button>

      <button
        className="settings"
        title="Change app settings"
        onClick={toggleSettingsModal}
      >
        <span className="material-icons">settings</span>
      </button>

      <span className="separator" />

      <button
        className="right-sidebar"
        title="Toggle right sidebar"
        onClick={toggleRightSidebar}
      >
        <span
          className={`material-icons ${!appSettings.rightSidebar && 'off'}`}
        >
          table_chart
        </span>
      </button>

      <ReactModal
        ariaHideApp={false}
        className="modal"
        isOpen={settingsModalVisible}
        overlayClassName="modal-backdrop"
        shouldCloseOnOverlayClick={true}
        onRequestClose={toggleSettingsModal}
      >
        <AppSettingsModal onRequestClose={toggleSettingsModal} />
      </ReactModal>
    </div>
  );
};
