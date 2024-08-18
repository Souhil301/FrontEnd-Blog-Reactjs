import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../helpers/AuthContext';

function Login() {
    
    const { setAuthState } = useContext(AuthContext);

    const initialValues = 
    {
      email: "",
      password: ""
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Invalid email address'),
        password: Yup.string().min(8).max(30).required('Password is required'),
    });

    const navigate = useNavigate();
    const onSubmit = (data) =>
    {
        axios.post("http://127.0.0.1:3100/auth/signin", data).then((response)=>
            {
              if(response.data.error)
              {
                alert(response.data.error);
                navigate('/');
              }
              else
              {
                localStorage.setItem("token", response.data.token);

                setAuthState({
                  isAuthenticated: true,
                  username: response.data.username
                });           

                navigate('/');
              }
                
            });
    }

  return (
    <div className='logUser'>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form>
              <ErrorMessage name='email' component="span" className="error" />
              <Field autoComplete='off' id='inputUsername' type='email' name='email' placeholder='Enter email' />
              <ErrorMessage name='username' component="span" className="error" />
              <Field autoComplete='off' id='inputUsername' type='password' name='password' placeholder='Enter password' />
              <button type='submit'>Login</button>
          </Form>
      </Formik>
      <h5>Don't have account ? <a onClick={() => navigate('/registration')}>Register</a></h5>
    </div>
  )
}

export default Login;
