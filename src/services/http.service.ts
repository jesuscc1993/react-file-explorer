import { from, Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { mergeMap } from 'rxjs/operators';

const get = (url: string) => {
  return fromFetch(url).pipe(mergeMap((res) => res.json()));
};

const post = <T>(url: string, body?: unknown) => {
  return from(
    fetch(url, {
      body: body ? JSON.stringify(body) : undefined,
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      mode: 'cors',
    }),
  ).pipe(mergeMap((res) => res.json())) as Observable<T>;
};

export const httpService = { get, post };
