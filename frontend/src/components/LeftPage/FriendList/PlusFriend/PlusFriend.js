import React from 'react';
// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';

const PlusFriend = React.memo(({onToggle3},props) => {

    return (
        <div className="plus_site">
            {/* <AddCircleOutlineIcon className="plus_icon" onClick={onToggle3}/> */}
            <AddIcon className="plus_icon" onClick={onToggle3}/>
            <div onClick={onToggle3}>친구를 추가해보세요.</div>
        </div>
    )
})

export default withRouter(PlusFriend);
