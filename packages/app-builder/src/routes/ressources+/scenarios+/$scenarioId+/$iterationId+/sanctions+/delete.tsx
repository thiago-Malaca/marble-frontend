import { initServerServices } from '@app-builder/services/init.server';
import { getRoute } from '@app-builder/utils/routes';
import { fromParams, fromUUIDtoSUUID } from '@app-builder/utils/short-uuid';
import { type ActionFunctionArgs, redirect } from '@remix-run/node';
import { useFetcher } from '@remix-run/react';
import { type Namespace } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Button, ModalV2 } from 'ui-design-system';
import { Icon } from 'ui-icons';

export const handle = {
  i18n: ['scenarios', 'navigation', 'common'] satisfies Namespace,
};

export async function action({ request, params }: ActionFunctionArgs) {
  const { authService } = initServerServices(request);
  const iterationId = fromParams(params, 'iterationId');
  const scenarioId = fromParams(params, 'scenarioId');
  const { scenarioIterationSanctionRepository } = await authService.isAuthenticated(request, {
    failureRedirect: getRoute('/sign-in'),
  });

  await scenarioIterationSanctionRepository.deleteSanctioncheckConfig({
    iterationId,
  });

  return redirect(
    getRoute('/scenarios/:scenarioId/i/:iterationId/rules', {
      scenarioId: fromUUIDtoSUUID(scenarioId),
      iterationId: fromUUIDtoSUUID(iterationId),
    }),
  );
}

export function DeleteSanction({
  scenarioId,
  iterationId,
  children,
}: {
  scenarioId: string;
  iterationId: string;
  children: React.ReactElement;
}) {
  const { t } = useTranslation(handle.i18n);
  const fetcher = useFetcher<typeof action>();

  return (
    <ModalV2.Root>
      <ModalV2.Trigger render={children} />
      <ModalV2.Content>
        <div className="flex flex-col gap-6 p-6">
          <div className="flex flex-1 flex-col items-center justify-center gap-2">
            <div className="bg-red-95 mb-6 box-border rounded-[90px] p-4">
              <Icon icon="delete" className="text-red-47 size-16" />
            </div>
            <h1 className="text-l font-semibold">{t('scenarios:delete_sanction.title')}</h1>
            <p className="text-center">{t('scenarios:delete_sanction.content')}</p>
          </div>
          <div className="flex flex-1 flex-row gap-2">
            <ModalV2.Close render={<Button className="flex-1" variant="secondary" />}>
              {t('common:cancel')}
            </ModalV2.Close>
            <Button
              color="red"
              className="flex-1"
              variant="primary"
              type="button"
              name="delete"
              onClick={() =>
                fetcher.submit(new FormData(), {
                  method: 'DELETE',
                  action: getRoute(
                    `/ressources/scenarios/:scenarioId/:iterationId/sanctions/delete`,
                    {
                      scenarioId: fromUUIDtoSUUID(scenarioId),
                      iterationId: fromUUIDtoSUUID(iterationId),
                    },
                  ),
                })
              }
            >
              <Icon icon="delete" className="size-6" />
              {t('common:delete')}
            </Button>
          </div>
        </div>
      </ModalV2.Content>
    </ModalV2.Root>
  );
}
