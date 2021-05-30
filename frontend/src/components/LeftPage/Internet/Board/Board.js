import React, {useEffect, useState} from 'react';
import { Link, withRouter } from 'react-router-dom';
import BoardList from './BoardList';
import BoardCreate from './BoardCreate';
import BoardDetail from './BoardDetail';
import BoardUpdate from './BoardUpdate';

const Board = ({match, UserData}) => {
    // const [selection, setselection] = useState('BoardList');
    // useEffect(() => {
        //     console.log('selection', selection);
        // }, [selection])
    // const selection = match.params.select || 'BoardList';
    const [selection, setSelection] = useState('BoardList');
    const [process, setProcess] = useState('');
    console.log('params', match.params);
    useEffect(()=>{
        setSelection(match.params.select);
        console.log('selection', selection);
    }, [match.params.select])
    useEffect(()=>{
        setProcess(match.params.process);
        console.log('process', process);
    }, [match.params.process])
        return (
        <div>
            {selection === 'BoardList' || selection === undefined ? <BoardList UserData={UserData} selection={selection}/> 
            : selection === 'create' ? <BoardCreate UserData={UserData}/> 
            : process === 'update' ? <BoardUpdate UserData={UserData}/> 
            : <BoardDetail UserData={UserData} selection={selection} />}
        </div>
    )
}

export default withRouter(Board);
