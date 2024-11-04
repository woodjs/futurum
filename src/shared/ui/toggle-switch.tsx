import React, { useState } from 'react';

interface ToggleSwitchProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onChange(!checked)}
        className={`w-8 h-4 flex items-center rounded-full p-1 transition-colors duration-300 ${
          checked ? 'bg-blue-300' : 'bg-red-300'
        }`}
      >
        <div
          className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform duration-300 ${
            checked ? 'translate-x-3' : 'translate-x-0'
          }`}
        />
      </button>
      {label && <span className="text-gray-700">{label}</span>}
    </div>
  );
};

const FormWithSwitch: React.FC = () => {
  const [isToggled, setIsToggled] = useState(false);

  return (
      <ToggleSwitch
        label="С возможностью продления"
        checked={isToggled}
        onChange={setIsToggled}
      />
  );
};

export default FormWithSwitch;
