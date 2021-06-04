import './address-bar.css';

import React, { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { directorySeparator } from '../../constants/explorer.constants';
import { countInstancesInString } from '../../domain/strings.domain';

type Props = {
  path: string;
};

export const AppAddressBar: FC<Props> = ({ path }) => {
  const history = useHistory();

  const [formAddress, setFormAddress] = useState(path);

  useEffect(() => setFormAddress(path), [path]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormAddress(event.target.value);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      history.push(`/explorer?path=${formAddress}`);
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

  return (
    <div className="address-bar pane">
      <button className="back" onClick={history.goBack}>
        <span className="material-icons">arrow_back</span>
      </button>
      <button className="forward" onClick={history.goForward}>
        <span className="material-icons">arrow_forward</span>
      </button>

      <button className="up" onClick={navigateUp}>
        <span className="material-icons">arrow_upward</span>
      </button>

      <input
        className="address-input"
        value={formAddress}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};
