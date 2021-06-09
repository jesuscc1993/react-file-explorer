import './settings.modal.css';

import React, { ChangeEvent, FC, useState } from 'react';

import { useAppContext } from '../../../hooks/use-app-context.hook';

type Props = {
  onRequestClose: () => void;
};

export const AppSettingsModal: FC<Props> = ({ onRequestClose }) => {
  const { appSettings, setAppSettings } = useAppContext();

  const [iconSize, setIconSize] = useState(appSettings.iconSize);
  const [labelSize, setLabelSize] = useState(appSettings.labelSize);

  const onIconSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIconSize(parseInt(event.target.value, 10));
  };

  const onLabelSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLabelSize(parseInt(event.target.value, 10));
  };

  const saveSettings = () => {
    setAppSettings({ ...appSettings, iconSize, labelSize });
    onRequestClose();
  };

  return (
    <div className="settings-modal pane">
      <h2 className="modal-title">Settings</h2>

      <span>Icon size [16 - 256] ({iconSize})</span>
      <div>
        <input
          type="range"
          min="16"
          max="256"
          value={iconSize}
          onChange={onIconSizeChange}
        />
      </div>

      <span>Label size [8 - 32] ({labelSize})</span>
      <div>
        <input
          type="range"
          min="8"
          max="32"
          value={labelSize}
          onChange={onLabelSizeChange}
        />
      </div>

      <div>
        <h3>Preview</h3>

        <div className="icon-preview">
          <span className="material-icons" style={{ fontSize: iconSize }}>
            folder
          </span>

          <span style={{ fontSize: labelSize }}>Label</span>
        </div>
      </div>

      <div className="footer">
        <button className="primary" onClick={saveSettings}>
          Save
        </button>

        <button onClick={onRequestClose}>Close</button>
      </div>
    </div>
  );
};
