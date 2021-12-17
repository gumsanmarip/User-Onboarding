import * as yup from 'yup';

const formSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .required('Enter Username')
      .min(3, 'Username has to be more than three characters!'),
    email: yup
      .string()
      .email('Gotta be a valid email address!')
      .required('YOU FORGOT TO ENTER AN EMAIL ADDRESS!!'),
    password: yup
      .string()
      .min(3, 'Password has to be more than three characters!'),
    tos: yup.boolean().oneOf([true], 'accept the terms.')
  })

  export default formSchema; 