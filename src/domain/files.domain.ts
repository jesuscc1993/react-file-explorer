import {
  audioExtensions,
  directorySeparator,
  extensionSeparator,
  imageExtensions,
  sizes,
  videoExtensions,
} from '../constants/explorer.constants';
import { FileSystemItem, FileSystemItemType } from '../types/file-system.types';

export const getItemType = (item: FileSystemItem): FileSystemItemType => {
  if (item.isDirectory) return FileSystemItemType.Folder;

  const fileExtension = getFileExtension(item)?.toUpperCase();
  if (!fileExtension) return FileSystemItemType.File;

  if (audioExtensions.includes(fileExtension)) return FileSystemItemType.Audio;
  if (imageExtensions.includes(fileExtension)) return FileSystemItemType.Image;
  if (videoExtensions.includes(fileExtension)) return FileSystemItemType.Video;
  return FileSystemItemType.File;
};

export const getIconForFileType = (fileType: FileSystemItemType) => {
  return iconsByFileType[fileType];
};

export const getFileUrl = (item: FileSystemItem) => {
  return `${process.env.REACT_APP_SERVER_URL}/file/${encodeURIComponent(
    item.absolutePath,
  )}`;
};

export const getIconForName = (name: string) => {
  return `${process.env.PUBLIC_URL}/assets/images/file-types/${name}.png`;
};

export const getFileExtension = ({ name }: FileSystemItem) => {
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

const iconsByFileType: Record<FileSystemItemType, string> = {
  [FileSystemItemType.Audio]: 'music_note',
  [FileSystemItemType.File]: 'description',
  [FileSystemItemType.Folder]: 'folder',
  [FileSystemItemType.Image]: 'image',
  [FileSystemItemType.Video]: 'movie',
};
