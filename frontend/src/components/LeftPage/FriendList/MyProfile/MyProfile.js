import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const MyProfile = React.memo(({UserData}) => {

    return (
        <div className="myfile">
            <Link to="/main/UpdateUser">
                <img src={UserData.image} />
                <div className="text_site">
                    <div className="top">{UserData.userName}</div>
                    <div className="bottom">{UserData.message}</div>
                </div>
            </Link>
        </div>
    )
})

export default withRouter(MyProfile);
