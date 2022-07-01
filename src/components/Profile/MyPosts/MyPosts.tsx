import React, { useState } from 'react';
import AddPostForm from '../../Forms/AddPostForm';
import Post from './Post/Post';
import s from './MyPosts.module.scss'
import { getPosts } from './../../../Redux/profileSelector';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const MyPosts: React.FC = () => {

    const posts = useSelector(getPosts)
    const [date, setDate] = useState(format(new Date(), 'dd-MM-yyyy HH:mm'))

 
    let postElements = posts.map( (p, index) => <Post key={index} text={p.text} likeCount={p.likeCount} date={p.date} />)

    return (
        <div>
            <div className={s.postHead}>
                <h2>My posts</h2>
                <AddPostForm  date={date} newPostText={''}/>
            </div>
            <div className={s.postList}>
                {postElements}
            </div>
        </div>
    )
}

export default MyPosts