import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
// import '../../MainPage/Main.scss';
import moment from 'moment';

const BucketItem = ({UserData}) => {
    const [items, setItems] = useState('');
    
    console.log('items', items);
    useEffect(()=>{
        axios.post('/api/bucket/list', UserData)
        .then(res => {
            console.log('res', res, res.data);
            setItems(res.data.items);
            console.log('asdf', res.data.items)
        })
    }, []);

    return (
        <div className="item_container">
            {items.length !== 0 ?
                items.map(item => (
                    <div className="item_wrapper">
                        <h5>주문 내역</h5>
                        <div className="item_approvedAt">{moment(item.bucketData.approved_at).format('YYYY-MM-DD HH:mm:ss')}</div>
                        <div className="item_row">
                            <div className="item_img">
                                {item.bucketData.item_code === '1' && <img src="/shopping/shopping_1.png"/>}
                                {item.bucketData.item_code === '2' && <img src="/shopping/shopping_2.jpg"/>}
                                {item.bucketData.item_code === '3' && <img src="/shopping/shopping_3.jpg"/>}
                                {item.bucketData.item_code === '4' && <img src="/shopping/shopping_4.jpg"/>}
                            </div>
                            <div className="item_title">{item.bucketData.item_name}</div>
                        </div>
                        <div className="item_price">{item.bucketData.amount.total.toLocaleString()} 원</div>
                    </div>
                ))
                :
                <div> 주문내역이 없습니다. </div>
            }
        </div>
    )
}

export default withRouter(BucketItem);
