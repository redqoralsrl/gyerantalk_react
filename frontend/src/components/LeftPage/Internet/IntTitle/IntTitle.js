import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

const IntTitle = () => {
    return (
        <div className="intTitle">
            <NavLink className="default_active" activeClassName="active" to="/main/Internet/News">
                <div>뉴스</div>
            </NavLink>
            <NavLink className="default_active" activeClassName="active" to="/main/Internet/Shop">
                <div>쇼핑</div>
            </NavLink>
            <NavLink className="default_active" activeClassName="active" to="/main/Internet/TV">
                <div>Egg TV</div>
            </NavLink>
            <NavLink className="default_active" activeClassName="active" to="/main/Internet/posts">
                <div>Egg Board</div>
            </NavLink>
        </div>
    )
}

export default withRouter(IntTitle);