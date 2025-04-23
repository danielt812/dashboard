import Switch from "./Switch";

interface ToggleSettingProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const ToggleSetting = ({ label, value, onChange }: ToggleSettingProps) => (
  <div className='flex justify-between items-center min-h-10'>
    <span className='text-sm md:text-lg select-none'>{label}</span>
    <Switch
      checked={value}
      onChange={() => onChange(!value)}
      size='sm'
    />
  </div>
);

export default ToggleSetting;
