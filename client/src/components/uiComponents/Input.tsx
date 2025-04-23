interface InputProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
}

const Input = ({ value, onChange, onSubmit, placeholder }: InputProps) => {
  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmit(value);
    }
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={handleOnKeyDown}
      className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs w-full"
    />
  );
};

export default Input;
