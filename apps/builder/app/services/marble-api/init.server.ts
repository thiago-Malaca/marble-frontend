import {
  fetchWithAuthMiddleware,
  marbleApi,
  type TokenService,
} from '@marble-front/api/marble';
import { getServerEnv } from '@marble-front/builder/utils/environment.server';
import * as R from 'remeda';

type FunctionKeys<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];

export type MarbleApi = {
  [P in FunctionKeys<typeof marbleApi>]: (typeof marbleApi)[P];
};

export function getMarbleAPIClient({
  tokenService,
}: {
  tokenService: TokenService<string>;
}): MarbleApi {
  const baseUrl = getServerEnv('MARBLE_API_DOMAIN');
  const fetch = fetchWithAuthMiddleware({
    tokenService,
    getAuthorizationHeader: (token) => ({
      name: 'Authorization',
      value: `Bearer ${token}`,
    }),
  });

  const { defaults, servers, ...api } = marbleApi;

  //@ts-expect-error can't infer args
  return R.mapValues(api, (value) => (...args) => {
    //@ts-expect-error can't infer args
    return value(...args, { fetch, baseUrl });
  });
}
