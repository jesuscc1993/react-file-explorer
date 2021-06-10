import { directorySeparator } from '../constants/file-system.constants';

export enum Os {
  Windows = 'Windows',
  Linux = 'Linux',
  Mac = 'Mac',
}

const osList = [Os.Windows, Os.Linux, Os.Mac];

const osStartingPaths: Record<Os, string> = {
  [Os.Linux]: '/',
  [Os.Mac]: '/',
  [Os.Windows]: 'C:/',
};

export const getOs = () => {
  return osList.find((os) => navigator.appVersion.indexOf(os) >= 0) || Os.Linux;
};

export const getSanitizedAddress = (address: string) => {
  return address !== getStartingPath(getOs())
    ? address
        .replace(/\\/g, directorySeparator)
        .replace(/\/+/g, directorySeparator)
        .replace(/\/$/, '')
    : address;
};

export const getStartingPath = (os: Os) => osStartingPaths[os];
