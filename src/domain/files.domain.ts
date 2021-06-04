import {
  audioExtensions,
  directorySeparator,
  extensionSeparator,
  imageExtensions,
  sizes,
  videoExtensions
} from '../constants/explorer.constants';
import { FileType } from '../types/file.types';
import { PathStats } from '../types/path.types';

export const getFileType = (file: PathStats): FileType => {
  if (file.isDirectory) return FileType.Folder;

  const fileExtension = getFileExtension(file)?.toUpperCase();
  if (!fileExtension) return FileType.File;

  if (audioExtensions.includes(fileExtension)) return FileType.Audio;
  if (imageExtensions.includes(fileExtension)) return FileType.Image;
  if (videoExtensions.includes(fileExtension)) return FileType.Video;
  return FileType.File;
};

export const getIconForFileType = (fileType: FileType) => {
  return iconsByFileType[fileType];
};

export const getFileUrl = (file: PathStats) => {
  return `${process.env.REACT_APP_SERVER_URL}/file/${encodeURIComponent(
    file.absolutePath,
  )}`;
};

export const getIconForName = (name: string) => {
  return `${process.env.PUBLIC_URL}/assets/images/file-types/${name}.png`;
};

export const getFileExtension = ({ name }: PathStats) => {
  return name.includes(extensionSeparator)
    ? name.split(extensionSeparator).pop()
    : undefined;
};

export const getSizeFromBytes = (bytes: number) => {
  if (bytes == 0) return '0 Byte';
  const i = Math.ceil(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
};

export const getFolderName = (path: string) => {
  return path.split(directorySeparator).pop();
};

const iconsByFileType: Record<FileType, string> = {
  [FileType.Audio]: 'music_note',
  [FileType.File]: 'description',
  [FileType.Folder]: 'folder',
  [FileType.Image]: 'image',
  [FileType.Video]: 'movie',
};
