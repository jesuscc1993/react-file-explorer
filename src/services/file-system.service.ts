import '../../public/neutralino';

import { forkJoin, from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { FileSystemItem } from '../types/file-system.types';

type PathOptions = {
  hiddenFiles: boolean;
};

const getStats = (path: string): Observable<Neutralino.filesystem.Stats> => {
  return from(Neutralino.filesystem.getStats(path));
};

const getPathItems = (
  path: string,
  options?: PathOptions,
): Observable<FileSystemItem[]> => {
  return from(Neutralino.filesystem.readDirectory(path)).pipe(
    mergeMap((items) =>
      forkJoin(
        items.map(({ entry }) =>
          getStats(entry).pipe(map((stats) => mapStats(entry, stats))),
        ),
      ),
    ),
  );
};

const openFile = (
  path: string,
): Observable<Neutralino.os.ExecCommandResult> => {
  return from(Neutralino.os.execCommand(path));
};

const mapStats = (
  path: string,
  stats: Neutralino.filesystem.Stats,
): FileSystemItem => {
  let filename, extension;

  let matches = path.match(/(.*\/)?(.*)/);
  if (matches) {
    filename = matches[1];
    matches = filename.match(/(.*)\.(.*)/);

    if (matches) extension = matches[1];
  }

  return {
    absolutePath: path,
    creationTime: stats.createdAt,
    extension: extension,
    isDirectory: stats.isDirectory,
    isFile: stats.isFile,
    modificationTime: stats.modifiedAt,
    name: filename,
    size: stats.size,
  } as FileSystemItem;
};

export const fileSystemService = { getPathItems, openFile };
