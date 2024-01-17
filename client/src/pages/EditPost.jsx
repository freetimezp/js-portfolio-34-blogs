import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { useCheckUserLogged } from '../context/userContext';

const EditPost = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Uncategorized');
    const [desc, setDesc] = useState('');
    const [thumbnail, setThumbnail] = useState('');

    useCheckUserLogged();

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

    return (
        <section className='edit-post'>
            <div className="container">
                <h2>Edit Post</h2>
                <p className="form__error-message">
                    This is an error message..
                </p>

                <form className="form edit-post__form">
                    <input type="text" placeholder='Title' value={title}
                        onChange={e => setTitle(e.target.value)} />
                    <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
                        {POST_CATEGORIES.map((cat, i) => (
                            <option key={i}>{cat}</option>
                        ))}
                    </select>

                    <ReactQuill modules={modules} formats={formats} value={desc}
                        onChange={setDesc} />

                    <input type="file" onChange={e => setThumbnail(e.target.files[0])} accept="png, jpg, jpeg" />
                    <button type="submit" className='btn primary'>
                        Update
                    </button>
                </form>
            </div>
        </section>
    );
};

export default EditPost;
