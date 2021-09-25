import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { GetReposResponse, Repository, RepoApiQuery } from './githubTypes';
import { buildGitHubApiQueryParam } from './util';
import { languagesPerPage } from './constants';

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
  endpoints: (builder) => ({
    getRepos: builder.query<Repository[], RepoApiQuery>({
      query: (params) => ({
        url: `search/repositories`,
        params: {
          q: buildGitHubApiQueryParam<RepoApiQuery>(params),
          sort: `stars`,
          order: `desc`,
          page: 1,
          per_page: languagesPerPage,
        },
      }),
      transformResponse: (response: GetReposResponse) => response.items,
    }),
  }),
});

export const { useGetReposQuery } = githubApi;
