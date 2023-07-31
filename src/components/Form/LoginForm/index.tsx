// eslint-disable-next-line import/no-extraneous-dependencies
import { SubmitHandler, useForm } from 'react-hook-form';
import { useContext } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormSchema } from './schema';
import { ILogin, UserContext } from '../../../providers/UserContext';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';

const LoginForm = () => {
  const { userLogin } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(loginFormSchema),
    mode:'onSubmit'
  });

  const submit: SubmitHandler<ILogin> = (formData) => {
    userLogin(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        label='Email'
        type='email'
        register={register('email')}
        error={errors.email}
      />
      <Input
        label='Senha'
        type='password'
        register={register('password')}
        error={errors.password}
      />
      <StyledButton $buttonSize='default' $buttonStyle='green' type='submit'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
