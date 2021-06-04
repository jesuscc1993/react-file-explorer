export type PathReadOptions = {
  hiddenFiles?: boolean;
};

export type PathStats = {
  absolutePath: string;
  accessTime: number;
  changeTime: number;
  creationTime: number;
  isDirectory: boolean;
  isFile: boolean;
  isSymbolicLink: boolean;
  modificationTime: number;
  name: string;
  size: number;
};

export type PathResponseDto = PathStats[];
