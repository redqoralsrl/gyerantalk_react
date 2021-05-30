import React from 'react';
import IntTitle from './IntTitle/IntTitle';
import { withRouter } from 'react-router-dom';
import News from './News/News';
import Shop from './Shop/Shop';
import Board from './Board/Board';
import TV from './TV/TV';

const Internet = ({match, UserData}) => {
    const data = match.params.search || 'News';
    return (
        <div>
            <IntTitle />
            {data === 'News' && <News UserData={UserData}/>}
            {data === 'Shop' && <Shop UserData={UserData}/>}
            {data === 'TV' && <TV UserData={UserData}/>}
            {data === 'posts' && <Board UserData={UserData}/>}
        </div>
    )
}

export default withRouter(Internet);
 