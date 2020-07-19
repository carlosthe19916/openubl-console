import * as React from "react";
import { useState } from "react";
import { Dropdown, DropdownToggle, DropdownItem } from "@patternfly/react-core";
import { CaretDownIcon } from "@patternfly/react-icons";

export interface OrganizationActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const OrganizationActions: React.FC<OrganizationActionsProps> = ({
  onEdit,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown
      isOpen={isOpen}
      onSelect={() => {
        setIsOpen(!isOpen);
      }}
      toggle={
        <DropdownToggle
          onToggle={(isOpen: boolean) => {
            setIsOpen(isOpen);
          }}
          toggleIndicator={CaretDownIcon}
        >
          Actions
        </DropdownToggle>
      }
      dropdownItems={[
        <DropdownItem key="action" component="button" onClick={onEdit}>
          Editar
        </DropdownItem>,
        <DropdownItem key="action" component="button" onClick={onDelete}>
          Eliminar
        </DropdownItem>,
      ]}
    />
  );
};
