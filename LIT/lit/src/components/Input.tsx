export const Input: InputComponent = ({
  label,
  onChange,
  type,
  value,
  placeholder,
  disabled,
}) => {
  return (
    <div className="relative w-full h-full">
      <label>{label}</label>
      <input
        className={`bg-white border w-full h-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 `}
        type={type}
        value={value}
        disabled={disabled}
        onChange={(v) => onChange(v.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

type InputProps = {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
  type?: string;
};
type InputComponent = (props: InputProps) => React.ReactElement;
