import React from 'react';

type ToggleChipProps = {
  label: string;
  value: number;
  setValue: (value: number) => void;
};

const ToggleChip: React.FC<ToggleChipProps> = ({ label, value, setValue }) => {
  const colors = [
    'bg-gray-100 text-gray-600',
    'bg-green-100 text-green-700',
    'bg-red-100 text-red-700',
  ];

  const handleClick = () => {
    setValue((value + 1) % 3);
  };

  return (
    <span
      onClick={handleClick}
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium cursor-pointer ${colors[value]} select-none`}
    >
      {label}
    </span>
  );
};

export default ToggleChip;
