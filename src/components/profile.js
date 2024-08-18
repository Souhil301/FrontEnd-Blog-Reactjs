import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../helpers/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [posts, setPosts] = useState([]);
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://127.0.0.1:3100/auth/profile', {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }).then((response) => {
            if (Array.isArray(response.data)) {
                setPosts(response.data);
            } else {
                setPosts([]);
            }
        }).catch(error => {
            console.error('Error fetching posts:', error);
        });
    }, []);

    const deletePost = (id) => {
        axios.delete(`http://127.0.0.1:3100/api/post/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }).then(() => {
            setPosts(posts.filter(post => post.id !== id)); 
        }).catch(error => {
            console.error('Error deleting post:', error);
        });
    };

    const likePost = (postId) => {
        axios.post("http://127.0.0.1:3100/likes",
            { postId: postId },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        ).then((response) => {
            axios.get("http://127.0.0.1:3100/auth/profile",
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            ).then((response) => {
                setPosts(response.data);
            });
        });
    }

    return (
        
        <div >
            <h3>Go <a onClick={()=> navigate('/')}>Home</a></h3>
            <div className='App'>
            <button
                className='changePassword' onClick={() => navigate('/changepassword')}
            >
                Change Password
            </button>
            <h1 className='hpost'> Your Posts : </h1>

            {posts.length > 0 ? (
                posts.map(post => (
                    <div key={post.id} className='post'>
                        <div className='title'>
                            {post.title}
                            {authState.username === post.username && (
                                <button
                                    className='outdel' id='del' onClick={() => deletePost(post.id)}
                                >
                                    x
                                </button>
                            )}
                        </div>
                        <div className='body'>{post.postText}</div>
                        <div className='footer'>{post.username}
                        <button className='likeProf' onClick={() => likePost(post.id)}>
                                Like {post.likeCount}
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No posts found.</p>
            )}
        </div>

        </div>
            
    );
}

export default Profile;
