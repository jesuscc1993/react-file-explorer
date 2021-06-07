export type FileSystemItem = {
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

export enum FileSystemItemType {
  Audio = 'audio',
  File = 'file',
  Folder = 'folder',
  Image = 'image',
  Video = 'video',
}

export type PathReadOptions = {
  hiddenFiles?: boolean;
};

export type PathResponseDto = FileSystemItem[];
