import React, { useState, useEffect, useCallback } from 'react';
import LeftTitle from './Title/LeftTitle';
import MyProfile from './MyProfile/MyProfile';
import PlusFriend from './PlusFriend/PlusFriend';
import { withRouter } from 'react-router-dom';
import SearchFriend from './PlusFriend/SearchFriend';
import { searchFriend, friendAdd } from '../../../api/actions/friend_action';
import {useDispatch, useSelector} from 'react-redux';
import ShowFriend from './ShowFriend/ShowFriend';
import { getFriendList } from '../../../api/actions/friend_action';
import { alreadyFriend } from '../../../api/actions/friend_action';

const FriendList = ({UserData, checktUpdate, setchecktUpdate}) => {

    const dispatch = useDispatch();

    const [Search, setSearch] = useState(false);
    const [Friend, setFriend] = useState(false);
    const [FriendClick, setFriendClick] = useState(false);
    const [InputText, setInputText] = useState("");
    const [InputText2, setInputText2] = useState("");
    const [friendDB, setfriendDB] = useState("");
    const [ListFriend, setListFriend] = useState("");
    const [ClickEvent, setClickEvent] = useState(false);

    const onToggle = () =>{
        setSearch(!Search);
        setFriend(false);
        setFriendClick(false);
    }
    const onToggle2 = () =>{
        setFriend(!Friend);
        setSearch(false);
        setFriendClick(false);
    }
    const onToggle3 = () =>{
        setFriendClick(!Friend);
        setFriend(!Friend);
        setSearch(false);
    }
    const onInputTextHandler = (e) =>{
        setInputText(e.target.value);
    }
    const onInputTextHandler2 = (e) =>{
        setInputText2(e.target.value);
    }

    const onPlustHandler = (e) =>{
        let body = {
            data : e,
            user : UserData.userId
        }
        
        dispatch(friendAdd(body))
        .then(response => {
            setClickEvent(!ClickEvent);
        })
    }

    useEffect(()=>{
        setClickEvent(!ClickEvent);
        setchecktUpdate(!checktUpdate);
    },[UserData])

    useEffect(()=>{
        let body = {
            userId : UserData.userId
        }

        dispatch(getFriendList(body))
        .then(response => {
            setListFriend(response.payload);
        })
    },[ClickEvent])

    useEffect(() => {
        if(InputText2 !== ""){
            let body = {
                data : InputText2
            }
            
            dispatch(searchFriend(body))
            .then(response => {
                setfriendDB(response.payload);
            })

        }else{
            setfriendDB("");
        }
    }, [InputText2])

    
    return (
        <div style={{height:'520px',overflow:'scroll'}}>
            <LeftTitle 
                Search={Search}
                Friend={Friend}
                FriendClick={FriendClick}
                InputText={InputText}
                InputText2={InputText2}
                onToggle={onToggle}
                onToggle2={onToggle2}
                onInputTextHandler={onInputTextHandler}
                onInputTextHandler2={onInputTextHandler2}
            />
            <MyProfile
                UserData={UserData}
            />
            {/* <div className="line" /> */}
            {InputText2.length === 0 ?
                <PlusFriend
                    onToggle3={onToggle3}
                />
                :
                <SearchFriend
                    friendDB={friendDB}
                    UserData={UserData}
                    onPlustHandler={onPlustHandler}
                    ListFriend={ListFriend}
                />
            }
            {/* <div className="line" /> */}
            <ShowFriend
                UserData={UserData}
                ListFriend={ListFriend}
                setClickEvent={setClickEvent}
                ClickEvent={ClickEvent}
            />
        </div>
    )
}

export default withRouter(FriendList);
