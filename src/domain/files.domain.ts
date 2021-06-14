import {
  audioExtensions, directorySeparator, imageExtensions, sizes, textExtensions, videoExtensions,
} from '../constants/file-system.constants';
import { ExplorerSortDirection, ExplorerSortMode } from '../types/explorer.types';
import { FileSystemItem, FileSystemItemType } from '../types/file-system.types';

export const getItemType = (item: FileSystemItem): FileSystemItemType => {
  if (item.isDirectory) return FileSystemItemType.Folder;

  const { extension } = item;
  if (!extension) return FileSystemItemType.File;

  if (audioExtensions.includes(extension)) return FileSystemItemType.Audio;
  if (imageExtensions.includes(extension)) return FileSystemItemType.Image;
  if (textExtensions.includes(extension)) return FileSystemItemType.Text;
  if (videoExtensions.includes(extension)) return FileSystemItemType.Video;
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

export const getItemsFilteredByName = (
  items: FileSystemItem[],
  filter: string,
) => {
  return filter ? items.filter(({ name }) => name.includes(filter)) : items;
};

export const getIconForName = (name: string) => {
  return `${process.env.PUBLIC_URL}/assets/images/file-types/${name}.png`;
};

export const getSizeFromBytes = (bytes: number) => {
  if (bytes == 0) return '0 Byte';
  const i = Math.ceil(Math.floor(Math.log(bytes) / Math.log(1024)));
  return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
};

export const getSortedItems = (
  items: FileSystemItem[],
  sortMode: ExplorerSortMode,
) => {
  if (sortMode === ExplorerSortMode.Kind) return getItemsSortedByKind(items);
  if (sortMode === ExplorerSortMode.Name) return getItemsSortedByName(items);
  return getItemsSortedByNumericField(items, sortMode);
};

export const getFolderName = (path: string) => {
  return path.split(directorySeparator).pop() || path;
};

const getItemsSortedByKind = (
  items: FileSystemItem[],
  sortDirection = ExplorerSortDirection.Asc,
) => {
  return items.sort(
    (a, b) =>
      +b.isDirectory - +a.isDirectory ||
      (a.extension && b.extension
        ? a.extension.localeCompare(b.extension) * sortDirection
        : 0),
  );
};

const getItemsSortedByName = (
  items: FileSystemItem[],
  sortDirection = ExplorerSortDirection.Asc,
) => {
  return items.sort((a, b) => a.name.localeCompare(b.name) * sortDirection);
};

const getItemsSortedByNumericField = (
  items: FileSystemItem[],
  field: keyof FileSystemItem,
  sortDirection = ExplorerSortDirection.Desc,
) => {
  return items.sort((a, b) => {
    const fieldA = a[field] as number;
    const fieldB = b[field] as number;
    return (fieldB - fieldA) * sortDirection;
  });
};

const iconsByFileType: Record<FileSystemItemType, string> = {
  [FileSystemItemType.Audio]: 'music_note',
  [FileSystemItemType.File]: 'insert_drive_file',
  [FileSystemItemType.Folder]: 'folder',
  [FileSystemItemType.Image]: 'image',
  [FileSystemItemType.Text]: 'description',
  [FileSystemItemType.Video]: 'movie',
};
