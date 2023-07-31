// eslint-disable-next-line import/no-unresolved
import { FieldError, UseFormRegisterReturn } from 'react-hook-form/dist/types';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface IInput {
  id?: string;
  label: string;
  type: string;
  register: UseFormRegisterReturn<string>;
  error?: FieldError;
}

const Input = ({ id, label, type, register, error }: IInput) => (
  <fieldset>
    <StyledTextField id={id} label={label} type={type} {...register} />
    {error ? (
      <StyledParagraph fontColor='red'>{error.message}</StyledParagraph>
    ) : null}
  </fieldset>
);

export default Input;
