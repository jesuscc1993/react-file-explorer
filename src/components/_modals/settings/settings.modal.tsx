import './settings.modal.css';

import React, { ChangeEvent, FC, useState } from 'react';

import {
  maxIconSize, maxLabelSize, minIconSize, minLabelSize,
} from '../../../constants/explorer.constants';
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

  const iconInfoTooltip = `From ${minIconSize}px to ${maxIconSize}px`;
  const labelInfoTooltip = `From ${minLabelSize}px to ${maxLabelSize}px`;

  return (
    <div className="settings-modal pane">
      <div className="columns">
        <div>
          <h2 className="modal-title">Preview</h2>

          <div className="icon-preview">
            <span className="material-icons" style={{ fontSize: iconSize }}>
              folder
            </span>

            <span style={{ fontSize: labelSize }}>Label</span>
          </div>
        </div>

        <div className="separator" />

        <div className="settings-column">
          <h2 className="modal-title">Settings</h2>

          <span>
            Icon size
            <span className="material-icons" title={iconInfoTooltip}>
              info
            </span>{' '}
            <span className="float-right">({iconSize}px)</span>
          </span>
          <div>
            <input
              type="range"
              min={minIconSize}
              max={maxIconSize}
              value={iconSize}
              onChange={onIconSizeChange}
            />
          </div>

          <span>
            Label size
            <span className="material-icons" title={labelInfoTooltip}>
              info
            </span>{' '}
            <span className="float-right">({labelSize}px)</span>
          </span>
          <div>
            <input
              type="range"
              min={minLabelSize}
              max={maxLabelSize}
              value={labelSize}
              onChange={onLabelSizeChange}
            />
          </div>
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
