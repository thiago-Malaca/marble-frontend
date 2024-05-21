import * as React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { type CreateCaseAction } from '../models/node-data';
import { workflowI18n } from '../workflow-i18n';
import { useWorkflowData } from '../WorkflowProvider';

export function CreateCaseActionContent({ data }: { data: CreateCaseAction }) {
  const { t } = useTranslation(workflowI18n);
  const { inboxes } = useWorkflowData();
  const selectedInbox = React.useMemo(() => {
    if (!data.inboxId || !inboxes) return undefined;
    return inboxes.find((inbox) => inbox.id === data.inboxId);
  }, [data.inboxId, inboxes]);

  if (!selectedInbox) {
    return (
      <div className="flex flex-col gap-1">
        <p className="max-w-64 whitespace-pre-wrap">
          {t('workflows:action_node.create_case.empty_content')}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <p className="max-w-64 whitespace-pre-wrap">
        <Trans
          t={t}
          i18nKey="workflows:action_node.create_case.content"
          components={{
            Inbox: <span className="font-bold" />,
          }}
          values={{ inbox: selectedInbox.name }}
        />
      </p>
    </div>
  );
}
