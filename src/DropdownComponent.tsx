// DropdownComponent.tsx
import React from 'react';
import Select from 'react-select';

interface DropdownComponentProps {
  options: { value: string; label: string }[];
  onSelect: (selectedOption: { value: string; label: string } | null) => void;
}

export const DropdownComponent: React.FC<DropdownComponentProps> = ({ options, onSelect }) => {
  return (
    <Select
      options={options}
      onChange={onSelect}
    />
  );
};

