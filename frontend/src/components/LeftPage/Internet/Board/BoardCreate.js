import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from "react-router-dom";
import { createPost } from '../../../../api/actions/post_action';
import { Button } from "@material-ui/core";
import './Board.scss';

const BoardCreate = ({UserData, match, history}) => {
    const dispatch = useDispatch();
    const selection = match.params.select;

    const [inputs, setInputs] = useState({
        title: '',
        body: '',
    });
    
    const {title, body} = inputs

    const onChange = (e) => {
        const {className, value} = e.target
        const nextInputs = {
            ...inputs,
            [className] : value,
        }
        setInputs(nextInputs)
    }
    const onSubmitCreate = (e) => {
        e.preventDefault();
        const writerData = UserData;
        // console.log('submit', title, body, UserData.userNickName);
        dispatch(createPost({title, body, writerData}))
        .then(res => {
            history.push('/main/Internet/posts');
        })
    }

    return (
        <div className="wrapper">
            {/* <form action="/posts" method="post"> */}
            <form onSubmit={onSubmitCreate}>
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
                    <a className="btn btn_primary" href="/main/Internet/posts"><Button>취소</Button></a>
                </div>
            </form>
        </div>
    )
}

export default withRouter(BoardCreate)
