import { from, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

export const copyToClipboard = (text: string) => {
  return isClipboardAccessGranted().pipe(
    mergeMap((accessGranted) =>
      accessGranted ? navigator.clipboard.writeText(text) : of(undefined),
    ),
  );
};

export const isClipboardAccessGranted = () => {
  return from(navigator.permissions.query({ name: 'clipboard-write' })).pipe(
    map(({ state }) => state == 'granted' || state == 'prompt'),
  );
};
