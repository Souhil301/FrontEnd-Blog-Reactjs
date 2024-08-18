import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../helpers/AuthContext';

function Post() {
    const { id } = useParams();
    const [postObject, setPostObject] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
        const { authState } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:3100/api/post/${id}`,             
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        )
        .then(response => {
            if (Array.isArray(response.data) && response.data.length > 0) {
                setPostObject(response.data[0]);
            } else {
                setPostObject(null);
            }
        })
        .catch(error => {
            console.error('Error fetching post:', error);
        });

        axios.get(`http://127.0.0.1:3100/comment/${id}`,             
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } } 
        )
        .then(response => {
            if (Array.isArray(response.data)) {
                setComments(response.data);
            } else {
                setComments([]);
            }
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
        });
    }, [id]);

    const addComment = () => {
        if (newComment.trim() === "") {
            alert("Comment cannot be empty.");
            return;
        }
        
        axios.post(`http://127.0.0.1:3100/comment/`, 
            { comment: newComment, postId: id }, 
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } } 
        )
        .then(() => {
            axios.get(`http://127.0.0.1:3100/comment/${id}`,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } } 
            )
                .then(response => {
                    if (Array.isArray(response.data)) {
                        setComments(response.data);
                    } else {
                        setComments([]);
                    }
                })
                .catch(error => {
                    console.error('Error fetching comments after posting:', error);
                });

            setNewComment(""); 
        })
        .catch(error => {
            console.error('Error posting comment:', error.response || error.message || error);
        });
    };


    const deletePost = (id)=>
    {
        axios.delete(`http://127.0.0.1:3100/api/post/${id}`,
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        )
        .then(() => {
            navigate('/');
        })
    }
    
    return (
        <div className='App'>
            {postObject ? (
                <div className='post'>
                    <div className='title'>{postObject.title}
                    {authState.username === postObject.username && (
              <button
                className='out' onClick={() => {deletePost(postObject.id);}}
              >
                {" "}
                x
              </button>
            )}
                    </div>
                    <div className='body'>{postObject.postText}</div>
                    <div className='footer'>{postObject.username}</div>
                </div>
            ) : (
                <p>No post found.</p>
            )}

            <input
                type='text'
                name='comment'
                placeholder='Add Comment ...'
                autoComplete='off'
                value={newComment}
                onChange={(event) => setNewComment(event.target.value)}
            />
            <br />
            <button onClick={addComment}>Reply</button>

            <div className='comments'>
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className='comment'>
                            <div>{comment.comment}</div>
                            <div>{comment.created_At}</div>
                            <div><label className='poster'> poster : <span>{comment.username}</span>  </label></div>
                            { authState.username === comment.username && <button className='out'> x </button>}
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>
        </div>
    );
}

export default Post;
