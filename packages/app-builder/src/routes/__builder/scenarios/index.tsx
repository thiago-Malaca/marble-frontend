import { Page } from '@app-builder/components';
import { adaptDataModelDto } from '@app-builder/models/data-model';
import { CreateScenario } from '@app-builder/routes/ressources/scenarios/create';
import { serverServices } from '@app-builder/services/init.server';
import { getRoute } from '@app-builder/utils/routes';
import { fromUUID } from '@app-builder/utils/short-uuid';
import { json, type LoaderArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { Tag } from '@ui-design-system';
import { Scenarios } from '@ui-icons';
import { type Namespace } from 'i18next';
import { useTranslation } from 'react-i18next';
import * as R from 'remeda';

export const handle = {
  i18n: ['scenarios', 'navigation'] satisfies Namespace,
};

export async function loader({ request }: LoaderArgs) {
  const { authService } = serverServices;
  const { apiClient } = await authService.isAuthenticated(request, {
    failureRedirect: '/login',
  });
  const scenarios = await apiClient.listScenarios();
  const { data_model } = await apiClient.getDataModel();

  const sortedScenarios = R.sortBy(scenarios, [
    ({ createdAt }) => createdAt,
    'desc',
  ]);
  return json({
    scenarios: sortedScenarios,
    dataModel: adaptDataModelDto(data_model),
  });
}

export default function ScenariosPage() {
  const { t } = useTranslation(handle.i18n);
  const { scenarios, dataModel } = useLoaderData<typeof loader>();

  return (
    <Page.Container>
      <Page.Header>
        <Scenarios className="mr-2" height="24px" width="24px" />
        {t('navigation:scenarios')}
      </Page.Header>
      <Page.Content className="max-w-3xl">
        <div className="flex flex-row justify-end">
          <CreateScenario dataModels={dataModel} />
        </div>
        <div className="flex flex-col gap-2 lg:gap-4">
          {scenarios.length ? (
            scenarios.map((scenario) => {
              return (
                <Link
                  key={scenario.id}
                  to={getRoute('/scenarios/:scenarioId', {
                    scenarioId: fromUUID(scenario.id),
                  })}
                >
                  <div className="bg-grey-00 border-grey-10 flex flex-col gap-1 rounded-lg border border-solid p-4 hover:shadow-md">
                    <div className="text-m flex flex-row gap-2 font-bold">
                      {scenario.name}
                      {scenario.liveVersionId && (
                        <Tag color="purple" className="capitalize">
                          {t('scenarios:live')}
                        </Tag>
                      )}
                    </div>
                    <p className="text-s line-clamp-2 font-medium">
                      {scenario.description}
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="bg-grey-00 border-grey-10 flex h-28 max-w-3xl flex-col items-center justify-center rounded-lg border border-solid p-4">
              <p className="text-s font-medium">
                {t('scenarios:empty_scenario_list')}
              </p>
            </div>
          )}
        </div>
      </Page.Content>
    </Page.Container>
  );
}
