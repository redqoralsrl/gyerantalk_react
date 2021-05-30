import React from 'react';
import moment from 'moment';

function ChatCard(props) {

    const profileImgStyle ={
        width: '50px',
        height: '50px',
        // overFit: 'cover',
        borderRadius: '50%',
    }
    const imgStyle ={
        width: '100px',
    }
    return (
        <div>
            <div style={{display: 'flex', flexDirection:'column'}}>
                <div>{props.sender.userName}</div>
                <img src={props.sender.image} style={profileImgStyle}/>
                {/* <p>{props.message}</p> */}
                {
                props.message.substring(0,6)==="/chats" ?
                props.message.substring(props.message.length - 3, props.message.length) === 'mp4' ?
                <video 
                // src={`http://localhost:4000/${props.message}`} 
                src={props.message}
                alt="video"
                type="video/mp4" controls
                />
                :
                <img 
                style={imgStyle}
                // src={`http://localhost:4000/${props.message}`} 
                src={props.message}
                alt="image"
                />
                :
                <p>{props.message}</p>
                }
                <div title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment(props.sender.nowTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                </div>
            </div>
        </div>
    )
}

export default ChatCard
