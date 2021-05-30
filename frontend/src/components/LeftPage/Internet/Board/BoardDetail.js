import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { deletePost, viewPost } from "../../../../api/actions/post_action";
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom';
import './Board.scss'
import moment from 'moment';
import 'moment/locale/ko'; 

const BoardDetail = ({UserData, match, history, selection}) => {
    const dispatch = useDispatch();

    const [post, setPost] = useState('');

    useEffect(() => {
        dispatch(viewPost({UserData, selection}))
        .then(res => {
            console.log('detail', res.payload.post)
            setPost(res.payload.post);
        })
        .then(res => {
            console.log('aaaaaaaposts', post);
        })
    }, [selection]);

    const onClick = (e) => {
        dispatch(deletePost({UserData, selection}))
        .then(res => {
            // history.push('/main/Internet/posts');
            window.location.assign(`/main/Internet/posts`);
        })
    }

    return (
        <div>
        { post ?
        <div className="wrapper" style={{display: 'block', margin: '10%'}}>
            <div className="writer_profile" style={{display: 'flex', backgroundColor: 'rgb(214 211 211 / 52%)', padding: '5%', borderRadius: '10px'}}>
                <img className="profile_imgStyle" src={post.writerData.image}/>
                <div className="profile_txtStyle">{post.writerData.userNickName}</div>
            </div>
            <h3 className="form_group" >{post.title}</h3>
            <div className="form_group" style={{margin: '15% 0'}}>{post.body}</div>
            <div>{moment(post.createdAt).startOf('sec').fromNow()}</div>
            {post.writerData.userId === UserData.userId ? 
            <div style={{display: 'block', textAlign: 'center', marginTop: '15%'}}>
                <Link to={`/main/Internet/posts/${post._id}/update`}>
                    <Button style={{backgroundColor: '#f6bd63', color: '#fff', marginRight: '5%'}}>수정</Button>
                </Link>
                <Button style={{backgroundColor: 'rgba(182, 182, 182, 0.521)'}} onClick={onClick}>삭제</Button>
            </div>
            :
            null
            }
        </div>
        : <></>
        }
        </div>
    )
}

export default BoardDetail
