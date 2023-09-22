import { formatCreatedAt } from '@app-builder/utils/format';
import { type ScheduledExecution } from '@marble-api';
import { type ColumnDef, getCoreRowModel } from '@tanstack/react-table';
import { Table, useVirtualTable } from '@ui-design-system';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ScheduledExecutionDetails } from './ScheduledExecutionDetails';

export function ScheduledExecutionsList({
  scheduledExecutions,
}: {
  scheduledExecutions: ScheduledExecution[];
}) {
  const { t, i18n } = useTranslation(['scheduledExecution']);

  const selected = false;

  const columns = useMemo<ColumnDef<ScheduledExecution, string>[]>(
    () => [
      {
        id: 'scenario-name',
        accessorFn: (s) => s.scenario_name,
        header: t('scheduledExecution:scenario_name'),
        size: 200,
      },
      {
        id: 'scenario-trigger_object_type',
        accessorFn: (s) => s.scenario_trigger_object_type,
        header: t('scheduledExecution:scenario_trigger_object_type'),
        size: 200,
      },
      {
        id: 'number-of-created-decisions',
        accessorFn: (s) => s.number_of_created_decisions,
        header: t('scheduledExecution:number_of_created_decisions'),
        size: 200,
      },
      {
        id: 'created_at',
        accessorFn: (s) => formatCreatedAt(i18n.language, s.started_at),
        header: t('scheduledExecution:created_at'),
        size: 200,
      },
      {
        id: 'download',
        accessorFn: (s) => s.id,
        header: '',
        size: 200,
        cell: (r) => (
          <ScheduledExecutionDetails scheduleExecutionId={r.getValue()} />
        ),
      },
    ],
    [i18n.language, t]
  );
  const { table, getBodyProps, rows, getContainerProps } = useVirtualTable({
    data: scheduledExecutions,
    columns,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return (
    <Table.Container {...getContainerProps()}>
      <Table.Header headerGroups={table.getHeaderGroups()} />
      <Table.Body {...getBodyProps()}>
        {rows.map((row) => {
          return (
            <Table.Row
              key={row.id}
              className={clsx(
                'hover:bg-grey-02 cursor-pointer',
                selected && 'bg-grey-02'
              )}
              row={row}
            />
          );
        })}
      </Table.Body>
    </Table.Container>
  );
}
