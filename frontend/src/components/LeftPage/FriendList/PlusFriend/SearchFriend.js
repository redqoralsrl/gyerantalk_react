import React from 'react';
import AddBoxIcon from '@material-ui/icons/AddBox';
import '../../../MainPage/Main.scss';
import { withRouter } from 'react-router-dom';

const SearchFriend = React.memo(({friendDB, UserData, onPlustHandler, ListFriend }) => {
    console.log(ListFriend);
    if(friendDB.friend){
        if(friendDB.friend.length !== 0){ //검색결과 있을 때
            return (
                <div>
                    {
                        friendDB.friend.map((searched) => (
                            // let searched = searched.filter(exceptsearch => exceptsearch.userId === UserData.userId)
                            searched.userId !== UserData.userId ?   //검색결과에서 자신 제외
                                <div className="myProfile" key={searched.userId} onClick={()=>onPlustHandler(searched.userId)}>
                                    <img src={searched.image} />
                                    <div className="text_site">
                                        <div className="top">{searched.userName}</div>
                                        <div className="bottom">{searched.message}</div>
                                    </div>
                                    <AddBoxIcon className="plus"/>
                                </div>
                                :
                                <div className="error_me">검색결과가 없습니다</div>
                        ))           
                    }
                </div>
            )
        }
        else{          //검색결과 없을 때
            return(
                <div className="plus_site">검색 결과가 없습니다</div>
            )
        }
    }else{          //검색결과 없을 때
        return(
            <div className="plus_site">검색 결과가 없습니다</div>
        )
    }
    
    
});

export default withRouter(SearchFriend);
