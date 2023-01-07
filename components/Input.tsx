import { UseFormRegisterReturn } from 'react-hook-form';
import tw from 'tailwind-styled-components';

interface InputProps {
  label?: string;
  type: string;
  name: string;
  register: UseFormRegisterReturn;
  $show: boolean;
  [key: string]: any;
}

const InputContainer = tw.div`
  flex flex-col
  relative
`;

const CustomLabel = tw.label<{ $show: boolean }>`
  ${props => (props.$show ? ' ' : 'hidden')}
  text-xs
  text-gray-400
  my-2 mx-2
`;

const CustomInput = tw.input<{ $show: boolean }>`
${props => (props.$show ? ' ' : 'hidden')}
  border-emerald-100 border-2 rounded-md
  focus:border-1 focus:outline-none focus:ring-2 focus:ring-offset-2
  pl-3
`;

export default function Input(inputProps: InputProps) {
  const { label, type, name, register, $show, ...rest } = inputProps;
  console.log(...Object.values(rest));

  return (
    <InputContainer>
      <CustomLabel $show={$show} htmlFor={name}>
        {name}
      </CustomLabel>
      <CustomInput $show={$show} id={name} type={type} {...register} />
    </InputContainer>
  );
}
