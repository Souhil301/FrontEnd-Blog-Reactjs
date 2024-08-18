import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {

    const initialValues = {
        username: "",
        email: "",
        password: ""
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('username is required'),
        email: Yup.string().required('Email is required').email('Invalid email address'),
        password: Yup.string().min(8).max(30).required('Password is required'),
    });
    
    const navigate = useNavigate();
    const onSubmit = (data) =>
    {
        axios.post("http://127.0.0.1:3100/auth/signup", data).then(()=>
            {
                console.log(data);
                navigate('/login');
            });
    }

    return (
        <div className='createUser'>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                    <ErrorMessage name='username' component="span" className="error" />
                    <Field autoComplete='off' id='inputUsername' name='username' placeholder='Enter username' />
                    <ErrorMessage name='email' component="span" className="error" />
                    <Field autoComplete='off' id='inputUsername' type='email' name='email' placeholder='Enter email' />
                    <ErrorMessage name='username' component="span" className="error" />
                    <Field autoComplete='off' id='inputUsername' type='password' name='password' placeholder='Enter password' />
                    <button type='submit'>Register</button>
                </Form>
            </Formik>
            <h5>Alredy have account ? <a onClick={() => navigate('/login')}>Login</a></h5>
        </div>
  )
}

export default Register;
