import { type ParseKeys } from 'i18next';
import { match } from 'ts-pattern';
import { type IconName } from 'ui-icons';

export const casesFilterNames = ['dateRange', 'statuses'] as const;

export type CasesFilterName = (typeof casesFilterNames)[number];

export const getFilterIcon = (filterName: CasesFilterName) =>
  match<CasesFilterName, IconName>(filterName)
    .with('dateRange', () => 'calendar-month')
    .with('statuses', () => 'category')
    .exhaustive();

export const getFilterTKey = (filterName: CasesFilterName) =>
  match<CasesFilterName, ParseKeys<['cases']>>(filterName)
    .with('dateRange', () => 'cases:case.date')
    .with('statuses', () => 'cases:case.status')
    .exhaustive();
