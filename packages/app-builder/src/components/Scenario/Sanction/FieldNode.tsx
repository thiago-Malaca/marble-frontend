import { type AstNode, NewUndefinedAstNode } from '@app-builder/models';

import { MatchOperand } from './MatchOperand';

export const FieldNode = ({
  name,
  value,
  placeholder,
  onChange,
  onBlur,
}: {
  value?: AstNode;
  name?: string;
  onChange?: (value: AstNode) => void;
  onBlur?: () => void;
  placeholder?: string;
}) => (
  <>
    <input name={name} className="sr-only" tabIndex={-1} onBlur={onBlur} />
    <MatchOperand
      node={value ?? NewUndefinedAstNode()}
      placeholder={placeholder}
      onSave={(node) => {
        // if (ref.current) {
        //   ref.current.value = JSON.stringify(node);
        //   ref.current?.dispatchEvent(new Event('change'));
        // }
        onChange?.(node);
      }}
    />
  </>
);
