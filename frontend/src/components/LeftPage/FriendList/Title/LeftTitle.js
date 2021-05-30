import axios from 'axios';
import React, { useRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import '../../../MainPage/Main.scss';
import {
    SearchOutlined,
    UserAddOutlined
} from '@ant-design/icons';
import SearchIcon from '@material-ui/icons/Search';

const LeftTitle = React.memo(({
    Search,
    Friend,
    FriendClick,
    InputText,
    InputText2,
    onToggle,
    onToggle2,
    onInputTextHandler,
    onInputTextHandler2
}) => {

    const inputEl = useRef(null);
    const inputEl2 = useRef(null);

    useEffect(() => {
        if(Search) inputEl.current.focus();
        if(Friend) inputEl2.current.focus();
        if(FriendClick) inputEl2.current.focus();
    }, [Search, Friend, FriendClick])

    return (
        <div className="left_title">
            <div>친구</div>
            <div className="search_friend">
                {Search ? <div className="input_box"><input type="text" placeholder="친구검색" value={InputText} ref={inputEl} onChange={onInputTextHandler} /><SearchIcon className="search_icon" /></div> : null}
                {Friend || FriendClick ? <div className="input_box"><input type="text" placeholder="친구추가" value={InputText2} ref={inputEl2} onChange={onInputTextHandler2}/><SearchIcon className="search_icon" /></div> : null}
                {/* <SearchOutlined onClick={onToggle}/> */}
                <UserAddOutlined onClick={onToggle2} className="add_friend"/>
            </div>
        </div>
    )
})

export default withRouter(LeftTitle);
