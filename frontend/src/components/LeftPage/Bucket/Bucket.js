import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../MainPage/Main.scss';
import BucketItem from './BucketItem';

const Bucket = ({UserData}) => {
    return (
        <div>
            <div className="option_type">
                <div className="type_profile">
                    <img src={UserData.image} />
                    <div className="type_text">{UserData.userName}({UserData.userId})님의<br />주문내역</div>
                </div>
            </div>
            <BucketItem/>
        </div>
    )
}

export default withRouter(Bucket);
