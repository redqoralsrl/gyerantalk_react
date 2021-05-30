import React, {useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ShowFriend = React.memo(({UserData, ListFriend, ClickEvent, setClickEvent}) => {

    if(ListFriend.Myfriend !== undefined){
        return (
            <div>
                {
                    ListFriend.Myfriend.map((friend)=>(
                        <Link key={friend._id} to={`/main/ViewFriend/${friend.friendId}`} style={{textDecoration:'none',color:'#000'}}>
                            <div className="myProfile" key={friend._id}>
                                <img src={friend.friendImage} />
                                <div className="text_site">
                                    <div className="top">{friend.friendName}</div>
                                    <div className="bottom">{friend.friendMessage}</div>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        )
    }else{
        return (
            <div>
                <div>친구가 없습니다</div>
            </div>
        )
    }
})

export default withRouter(ShowFriend);
