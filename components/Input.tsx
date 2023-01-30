import { UseFormRegisterReturn } from 'react-hook-form';
import tw from 'tailwind-styled-components';

interface InputProps {
  label?: string;
  type: string;
  name: string;
  register: UseFormRegisterReturn;
  [key: string]: any;
}

const InputContainer = tw.div`
  flex flex-col
  relative
`;

const CustomLabel = tw.label`
  text-xs
  text-gray-400
  my-2 mx-2
`;

const CustomInput = tw.input`
  text-gray-500
  border-gray-400 border-b-2 rounded-sm
  focus:outline-dashed focus:outline-offset-2 focus:outline-2 focus:outline-slate-500
  pl-3
`;

export default function Input(inputProps: InputProps) {
  const { label, type, name, register, ...rest } = inputProps;

  return (
    <InputContainer>
      <CustomLabel htmlFor={name}>{name}</CustomLabel>
      <CustomInput
        id={name}
        type={type}
        {...register}
        {...rest}
        autoComplete="off"
      />
    </InputContainer>
  );
}
