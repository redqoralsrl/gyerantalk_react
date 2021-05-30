import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from "react-router-dom";
import { updatePost, viewPost } from '../../../../api/actions/post_action';
import { Button } from "@material-ui/core";
import './Board.scss';

const BoardUpdate = ({UserData, match, history}) => {
    const dispatch = useDispatch();
    const selection = match.params.select;
    const process = match.params.process;

    const [post, setPost] = useState('');

    const [inputs, setInputs] = useState({
        title: '',
        body: '',
    });
    
    const {title, body} = inputs;

    useEffect(()=>{
        console.log('update selection', selection);
        dispatch(viewPost({UserData, selection, process}))
        .then(res => {
            console.log('detail', res.payload.post)
            setPost(res.payload.post);
            
        })
    }, [selection]);

    useEffect(()=>{
        setInputs({ title: post.title, body: post.body })
    }, [post]);

    const onChange = (e) => {
        const {className, value} = e.target
        const nextInputs = {
            ...inputs,
            [className] : value,
        }
        setInputs(nextInputs)
    }
    const onSubmitUpdate = (e) => {
        e.preventDefault();
        const Writer = UserData.userNickName;
        dispatch(updatePost({title, body, selection}))
        .then(res => {
            history.push('/main/Internet/posts');
        })
    }

    return (
        <div className="wrapper">
            <form onSubmit={onSubmitUpdate} >
                <div className="form_group">
                    <label htmlFor="title">제목</label>
                    <input type="text" id="title" name="title" value={title} className="title"
                    onChange={onChange}/>
                </div>
                <div className="form_group">
                    <label htmlFor="body">내용</label>
                    <textarea id="body" name="body" rows="5" value={body} className="body"
                    onChange={onChange}></textarea>
                </div>
                <div className="btn_group">
                    <Button type="submit" className="btn btn_style">제출</Button>
                    <a className="btn btn_primary" href="main/Internet/posts"><Button>취소</Button></a>
                </div>
            </form>
        </div>
    )
}

export default withRouter(BoardUpdate)
