export type FileSystemItem = {
  absolutePath: string;
  accessTime: number;
  changeTime: number;
  creationTime: number;
  extension?: string;
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
  Text = 'text',
  Video = 'video',
}

export type PathReadOptions = {
  hiddenFiles?: boolean;
};

export type PathResponseDto = FileSystemItem[];
