import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../helpers/AuthContext';

function ChangePassword() {
    
    const { setAuthState } = useContext(AuthContext);

    const initialValues = 
    {
      oldPassword: "",
      newPassword: ""
    };

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().min(8).max(30).required('old Password is required'),
        newPassword: Yup.string().min(8).max(30).required('new Password is required'),
    });

    const navigate = useNavigate();
    const onSubmit = (data) =>
    {
        axios.put(`http://127.0.0.1:3100/auth/changepassword`, data,
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }

        ).then((response)=>
            {
              if(response.data.error)
              {
                alert(response.data.error);
              }
              else
              {
                navigate('/');
                alert('Password changed')
              }
                
            });
    }

  return (
    <div className='passwordUser'>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
            <ErrorMessage name='oldPassword' component="span" className="error" />
            <Field autoComplete='off' id='inputUsername' type='Password' name='oldPassword' placeholder='Enter old Password' />
            <ErrorMessage name='newPassword' component="span" className="error" />
            <Field autoComplete='off' id='inputUsername' type='password' name='newPassword' placeholder='Enter new Password' />
            <button type='submit'>Change Password</button>
        </Form>
    </Formik>
    <h5>Go <a onClick={()=> navigate('/')}>Home</a></h5>
</div>
  )
}

export default ChangePassword;
