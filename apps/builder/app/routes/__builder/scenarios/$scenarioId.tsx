import { createSimpleContext } from '@marble-front/builder/utils/create-context';
import { toUUID } from '@marble-front/builder/utils/short-uuid';
import { Outlet, useParams } from '@remix-run/react';
import * as R from 'remeda';
import invariant from 'tiny-invariant';
import { useScenarios } from '../scenarios';

export const handle = {
  i18n: ['scenarios'] as const,
};

function useCurrentScenarioValue() {
  const scenarios = useScenarios();

  const { scenarioId } = useParams();
  invariant(scenarioId, 'scenarioId is required');

  const currentScenario = scenarios?.find(
    ({ id }) => id === toUUID(scenarioId)
  );
  invariant(currentScenario, `Unknown current scenario`);

  const publishedVersions = R.pipe(
    currentScenario.deployments,
    R.filter(
      (
        deployments
      ): deployments is Required<
        (typeof currentScenario.deployments)[number]
      > => deployments.scenarioVersionId !== undefined
    ),
    R.map((deployment) => ({
      id: deployment.id,
      creationDate: deployment.creationDate,
      versionId: deployment.scenarioVersionId,
      label: deployment.frontendSerialName,
    }))
  );

  const publishedVersionIds = new Set(
    publishedVersions.map(({ versionId }) => versionId)
  );

  const drafts = R.pipe(
    currentScenario.versions,
    R.filter(({ id }) => !publishedVersionIds.has(id)),
    R.map((draft) => ({
      id: draft.id,
      creationDate: draft.creationDate,
      versionId: draft.id,
      label: undefined,
    }))
  );

  const scenarioIncrements = R.sortBy(
    [...publishedVersions, ...drafts],
    [({ creationDate }) => creationDate, 'desc']
  );

  const map = new Map(
    scenarioIncrements.map((increment) => [increment.id, increment])
  );

  return {
    ...currentScenario,
    increments: {
      values: scenarioIncrements,
      get(id: string) {
        return map.get(id);
      },
    },
  };
}

type CurrentScenario = ReturnType<typeof useCurrentScenarioValue>;

const { Provider, useValue: useCurrentScenario } =
  createSimpleContext<CurrentScenario>('CurrentScenario');

export default function ScenarioLayout() {
  const value = useCurrentScenarioValue();
  return (
    <Provider value={value}>
      <Outlet />
    </Provider>
  );
}

export { useCurrentScenario };
