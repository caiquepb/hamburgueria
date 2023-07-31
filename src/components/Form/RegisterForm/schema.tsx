import * as yup from 'yup';

export const registerFormSchema = yup.object({
  name: yup.string().required('O nome é obrigatório'),
  email: yup
    .string()
    .required('O email é obrigatório')
    .email('O email digitado é inválido'),
  password: yup.string().required('A senha é obrigatória'),
  passwordConfirmation: yup
    .string()
    .required('A senha é obrigatória')
    .oneOf([yup.ref('password')], 'As senhas não estão iguais'),
});
