import * as yup from 'yup';

export const SignupSchema=yup.object().shape({
    username: yup.string().required('username is required').matches(/^[a-zA-Z0-9]*$/, 'Username can only contain letters and numbers without spaces'),
    email: yup.string().email().required('email is required'),
    password: yup.string().min(3).max(12).required('password is required')
})

export const LoginSchema=yup.object().shape({
    username: yup.string().required('username is required').matches(/^[a-zA-Z0-9]*$/, 'Username can only contain letters and numbers without spaces'),
    password: yup.string().min(3).max(12).required('password is required')
})

