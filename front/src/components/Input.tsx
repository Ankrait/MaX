import { DetailedHTMLProps, FC } from 'react';

interface IInput
  extends DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value: string;
  setValue: (val: string) => void;
}

const Input: FC<IInput> = ({ value, setValue, ...props }) => {
  return (
    <input
      className="input"
      value={value}
      onChange={e => setValue(e.currentTarget.value)}
      {...props}
    />
  );
};

export default Input;
