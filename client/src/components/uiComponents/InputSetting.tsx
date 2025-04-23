interface InputSettingProps {
  label: string;
  children: React.ReactNode;
}

const InputSetting = ({ label, children }: InputSettingProps) => (
  <div className='flex justify-between items-center min-h-10'>
    <div className='w-1/2'>
      <span className='text-sm md:text-lg select-none'>{label}</span>
    </div>
    <div className='w-1/2'>{children}</div>
  </div>
);

export default InputSetting;
