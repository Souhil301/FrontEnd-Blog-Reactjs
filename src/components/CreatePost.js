import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
    const initialValues = {
        title: "",
        postText: "",
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
    });

    const navigate = useNavigate();


    useEffect(() => {
        if(!localStorage.getItem("token")) navigate('/login');
    }, []);


    const onSubmit = (values) => {
        axios.post("http://127.0.0.1:3100/api/post",values, 
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } } ,
        ).then((response)=>
            {
                navigate('/');
            });
    };

    return (
        <div className='createPost'>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                    <ErrorMessage name='title' component="span" className="error" />
                    <Field autoComplete='off' id='inputTitle' name='title' placeholder='Title of post' />
                    
                    <ErrorMessage name='postText' component="span" className="error" />
                    <Field autoComplete='off' id='inputPostText' name='postText' placeholder='Text of post' component='textarea' rows='4' />

                    <button type='submit'>Create post</button>
                </Form>
            </Formik>
            <br/>
            <h4>Go <a onClick={()=> navigate('/')}>Home</a></h4>
        </div>
    );
}

export default CreatePost;
