// eslint-disable-next-line import/no-extraneous-dependencies
import { SubmitHandler, useForm } from 'react-hook-form';
import { useContext } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { registerFormSchema } from './schema';
import { IRegister, UserContext } from '../../../providers/UserContext';
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';

const RegisterForm = () => {
  const { userRegister } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: yupResolver(registerFormSchema),
    mode: 'onSubmit',
  });

  const submit: SubmitHandler<IRegister> = (formData) => {
    userRegister(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        id='name'
        label='Nome'
        type='text'
        register={register('name')}
        error={errors.name}
      />
      <Input
        id='email'
        label='Email'
        type='email'
        register={register('email')}
        error={errors.email}
      />
      <Input
        id='password'
        label='Senha'
        type='password'
        register={register('password')}
        error={errors.password}
      />
      <Input
        id='passwordConfirmation'
        label='Confirmar Senha'
        type='password'
        register={register('passwordConfirmation')}
        error={errors.passwordConfirmation}
      />
      <StyledButton $buttonSize='default' $buttonStyle='gray' type='submit'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
