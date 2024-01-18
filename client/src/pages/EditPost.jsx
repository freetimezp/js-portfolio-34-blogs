/* eslint-disable eqeqeq */
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { UserContext } from '../context/userContext';

const EditPost = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Uncategorized');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockqoute'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockqoute',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    const POST_CATEGORIES = [
        'Agriculture',
        'Business',
        'Education',
        'Entertainment',
        'Art',
        'Investment',
        'Uncategorized',
        'Weather'
    ];

    //redirect to login page if any user who is not logged in
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
                setTitle(response.data.title);
                setCategory(response.data.category);
                setDescription(response.data.description);
                setThumbnail(response.data.thumbnail);
                //console.log(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        getPost();
    }, []);

    const editPost = async (e) => {
        e.preventDefault();

        const postData = new FormData();
        postData.set('title', title);
        postData.set('category', category);
        postData.set('description', description);
        postData.set('thumbnail', thumbnail);

        try {
            const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`,
                postData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
            console.log(response.data);
            if (response.status == 200) {
                return navigate('/');
            }
        } catch (err) {
            setError(err.response.data.message);
            //console.log(err);
        }
    };

    return (
        <section className='edit-post'>
            <div className="container">
                <h2>Edit Post</h2>
                {error && (
                    <p className="form__error-message">
                        {error}
                    </p>
                )}

                <form className="form edit-post__form" onSubmit={editPost}>
                    <input type="text" placeholder='Title' value={title}
                        onChange={e => setTitle(e.target.value)} />
                    <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
                        {POST_CATEGORIES.map((cat, i) => (
                            <option key={i}>{cat}</option>
                        ))}
                    </select>

                    <ReactQuill modules={modules} formats={formats} value={description}
                        onChange={setDescription} />

                    <input type="file" onChange={e => setThumbnail(e.target.files[0])} accept="png, jpg, jpeg, gif" />
                    <button type="submit" className='btn primary'>
                        Update
                    </button>
                </form>
            </div>
        </section>
    );
};

export default EditPost;
