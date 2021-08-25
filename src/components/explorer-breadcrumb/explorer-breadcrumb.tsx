import './explorer-breadcrumb.css';

import React, { FC } from 'react';
import { useHistory } from 'react-router';

import { directorySeparator } from '../../constants/file-system.constants';
import { isUnix } from '../../domain/os.domain';

type Props = {
  path: string;
};

export const AppExplorerBreadcrumb: FC<Props> = ({ path }) => {
  const history = useHistory();

  const sections = path.split(directorySeparator);

  const openDirectory = (newPath: string) => {
    history.push(`/explorer?path=${newPath}`);
  };

  const onRootClick = () => openDirectory('/');

  return (
    <div className="explorer-breadcrumb">
      {isUnix() && (
        <span className="clickable" onClick={onRootClick}>
          &nbsp;
        </span>
      )}

      {sections.map((section, i) => {
        const onClick = () => {
          openDirectory(sections.slice(0, i + 1).join(directorySeparator));
        };

        return (
          <span key={section}>
            {i > 0 && <span> {directorySeparator} </span>}

            {i < sections.length - 1 ? (
              <span className="clickable" onClick={onClick}>
                {section}
              </span>
            ) : (
              <span>{section}</span>
            )}
          </span>
        );
      })}
    </div>
  );
};
