import { PathReadOptions, PathResponseDto } from '../types/file-system.types';
import { httpService } from './http.service';

type PathOptions = {
  hiddenFiles: boolean;
};

type FileRequestDto = {
  path: string;
};

type PathRequestDto = {
  path: string;
  options?: PathReadOptions;
};

const getFile = (path: string) => {
  return httpService.post<PathResponseDto>(`${getServerUrl()}/file`, {
    path,
  } as FileRequestDto);
};

const getPathItems = (path: string, options?: PathOptions) => {
  return httpService.post<PathResponseDto>(`${getServerUrl()}/path`, {
    options,
    path,
  } as PathRequestDto);
};

const getServerUrl = () => {
  return process.env.REACT_APP_SERVER_URL;
};

const openFile = (path: string) => {
  return httpService.post<PathResponseDto>(`${getServerUrl()}/open-file`, {
    path,
  } as FileRequestDto);
};

export const fileSystemService = { getFile, getPathItems, openFile };
