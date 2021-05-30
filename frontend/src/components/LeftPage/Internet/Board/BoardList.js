import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { getPosts } from '../../../../api/actions/post_action'
// import { createPost } from './BoardCU'
import { Button } from "@material-ui/core";
import { LoadingOutlined } from '@ant-design/icons';
import './Board.scss';

const BoardList = ({match, UserData}) => {
    const dispatch = useDispatch();
    const [posts, setPosts] = useState('');

    console.log('posts', posts);
    useEffect(()=>{
        dispatch(getPosts())
        .then(res => {
            setPosts(res.payload.posts);
        })
    }, [match.params]);

    return (
        <div className="wrapper" style={{position: 'relative'}}>
            <h3 className="board_title">Egg 게시판</h3>
            {/* <div style={{display: 'flex', justifyContent: 'flex-end'}}> */}
            <div style={{position: 'absolute', top: -5, right: 0,}}>
                <Link to="/main/Internet/posts/create"><Button className="btn_style" style={{backgroundColor: '#f6bd63', color: '#fff', marginRight: '5%'}}>글쓰기</Button></Link>
            </div>
            {posts.length !== 0 ? 
                posts.map(post => (
                    <Link key={post._id} className="post_box" to={`/main/Internet/posts/${post._id}`}>
                        <div className="title_row" >
                            <div className="title_text">{post.title}</div>
                            <div className="img_wrapper"><img className="list_profile_img" src={post.writerData.image}/></div>
                        </div>
                        {/* <div className="body">{post.body}</div> */}
                    </Link>
                ))
                :
                // <div>게시글이 없습니다.</div>
                <LoadingOutlined className="loading"/>
            }
        </div>
    )
}

export default withRouter(BoardList)
