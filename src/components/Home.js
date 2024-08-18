import React from 'react'
import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../helpers/AuthContext';

function Home() {
    const { authState } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("token"))
        {
            navigate('/login');
        }else
        {
            axios.get("http://127.0.0.1:3100/api/",
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            ).then((response) => {
                setPosts(response.data);
            });     
        }

    }, []);

    const likePost = (postId) => {
        axios.post("http://127.0.0.1:3100/likes",
            { postId: postId },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        ).then((response) => {
            axios.get("http://127.0.0.1:3100/api/",
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            ).then((response) => {
                setPosts(response.data);
            });
        });
    }

    return (
        <div className='App'>
            {
                posts.map((post, key) =>
                (
                    <div className='post' key={key}>
                        <div className='title'>{post.title}</div>
                        <div className='body' onClick={() => navigate(`/post/${post.id}`)}>{post.postText}</div>
                        <div className='footer'>
                            {post.username} 
                            <button className='like' onClick={() => likePost(post.id)}>
                                Like {post.likeCount}
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Home;
