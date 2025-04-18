import { type TooltipContentProps, type TooltipProps } from '@radix-ui/react-tooltip';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import clsx from 'clsx';

interface DefaultTooltipProps
  extends Pick<TooltipProps, 'open' | 'defaultOpen' | 'onOpenChange'>,
    Omit<TooltipContentProps, 'content'> {
  children: React.ReactNode;
  content: React.ReactNode;
}

export function DefaultTooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  className,
  ...props
}: DefaultTooltipProps) {
  return (
    <TooltipPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content side="top" align="center" className="drop-shadow" {...props}>
          <div className={clsx('bg-grey-100 max-h-40 overflow-y-auto rounded p-2', className)}>
            {content}
          </div>
          <TooltipPrimitive.Arrow width={11} height={5} className="fill-grey-100" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}

export const Tooltip = {
  Default: DefaultTooltip,
  Provider: TooltipPrimitive.Provider,
};
