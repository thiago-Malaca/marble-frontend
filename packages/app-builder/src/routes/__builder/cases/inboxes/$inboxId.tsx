import { Page } from '@app-builder/components';
import { casesI18n, CasesList } from '@app-builder/components/Cases';
import {
  type CasesFilters,
  CasesFiltersBar,
  CasesFiltersMenu,
  CasesFiltersProvider,
  casesFiltersSchema,
} from '@app-builder/components/Cases/Filters';
import { casesFilterNames } from '@app-builder/components/Cases/Filters/filters';
import { FiltersButton } from '@app-builder/components/Filters';
import { isForbiddenHttpError, isNotFoundHttpError } from '@app-builder/models';
import { type CaseFilters } from '@app-builder/repositories/CaseRepository';
import { serverServices } from '@app-builder/services/init.server';
import { parseQuerySafe } from '@app-builder/utils/input-validation';
import { getRoute } from '@app-builder/utils/routes';
import { fromParams, fromUUID, useParam } from '@app-builder/utils/short-uuid';
import { json, type LoaderArgs, redirect } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { type Namespace } from 'i18next';
import qs from 'qs';
import { useCallback } from 'react';

export const handle = {
  i18n: ['navigation', ...casesI18n] satisfies Namespace,
};

export async function loader({ request, params }: LoaderArgs) {
  const { authService } = serverServices;
  const { cases } = await authService.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  const inboxId = fromParams(params, 'inboxId');

  const parsedQuery = await parseQuerySafe(request, casesFiltersSchema);
  if (!parsedQuery.success) {
    return redirect(getRoute('/cases/inboxes/:inboxId', { inboxId }));
  }
  const filters = parsedQuery.data;
  const filtersForBackend: CaseFilters = { ...filters, inboxIds: [inboxId] };
  try {
    const caseList = await cases.listCases(filtersForBackend);

    return json({ cases: caseList, filters });
  } catch (error) {
    // if inbox is deleted or user no longer have access, the user is redirected
    if (isNotFoundHttpError(error) || isForbiddenHttpError(error)) {
      return redirect(getRoute('/cases'));
    } else {
      throw error;
    }
  }
}

export default function Cases() {
  const { cases, filters } = useLoaderData<typeof loader>();
  const inboxId = useParam('inboxId');

  const navigate = useNavigate();
  const submitCasesFilters = useCallback(
    (casesFilters: CasesFilters) => {
      navigate(
        {
          pathname: getRoute('/cases/inboxes/:inboxId', {
            inboxId: fromUUID(inboxId),
          }),
          search: qs.stringify(
            {
              statuses: casesFilters.statuses ?? [],
              dateRange: casesFilters.dateRange
                ? casesFilters.dateRange.type === 'static'
                  ? {
                      type: 'static',
                      endDate: casesFilters.dateRange.endDate || null,
                      startDate: casesFilters.dateRange.startDate || null,
                    }
                  : {
                      type: 'dynamic',
                      fromNow: casesFilters.dateRange.fromNow,
                    }
                : {},
            },
            {
              addQueryPrefix: true,
              skipNulls: true,
            }
          ),
        },
        { replace: true }
      );
    },
    [navigate, inboxId]
  );

  return (
    <div className="flex h-full flex-row">
      <Page.Content>
        <div className="flex flex-col gap-4">
          <CasesFiltersProvider
            submitCasesFilters={submitCasesFilters}
            filterValues={filters}
          >
            <div className="flex justify-end gap-4">
              <CasesFiltersMenu filterNames={casesFilterNames}>
                <FiltersButton />
              </CasesFiltersMenu>
            </div>
            <CasesFiltersBar />
            <CasesList cases={cases} />
          </CasesFiltersProvider>
        </div>
      </Page.Content>
    </div>
  );
}
