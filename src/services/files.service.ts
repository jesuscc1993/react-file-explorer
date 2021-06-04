import { pathServer } from '../constants/explorer.constants';
import { PathReadOptions, PathResponseDto } from '../types/path.types';
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
  return httpService.post<PathResponseDto>(`${pathServer}/file`, {
    path,
  } as FileRequestDto);
};

const getPathFiles = (path: string, options?: PathOptions) => {
  return httpService.post<PathResponseDto>(`${pathServer}/path`, {
    options,
    path,
  } as PathRequestDto);
};

const openFile = (path: string) => {
  return httpService.post<PathResponseDto>(`${pathServer}/open-file`, {
    path,
  } as FileRequestDto);
};

export const filesService = { getFile, getPathFiles, openFile };
