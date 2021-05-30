import React, { useEffect, useState } from "react";
import { Link, withRouter } from 'react-router-dom';
import { Button } from "@material-ui/core";

import axios from "axios";

const PayResult= ({location, match}) => {
    // const [customerId, setCustomerId] = useState('');
    const customerId = window.localStorage.getItem("customerId");
    const [state, setState] = useState({
        params: {
        cid: "TC0ONETIME",
        // localstorage에서 tid값을 읽어온다.
        tid: window.localStorage.getItem("tid"),
        partner_order_id: "partner_order_id",
        partner_user_id: "partner_user_id",
        // pg_token: "",
        pg_token: location.search.split("=")[1]
        },
    });

    const payresult = match.params.select;
    // url에 붙어서 온 pg_token을 결제 API에 줄 params에 할당
    // params.pg_token = search.split("=")[1];
    
    useEffect(()=>{
        // setState({pg_token: location.search.split("=")[1]});
        const { params } = state;
        console.log('params', params);
        console.log('result state', state);
        console.log('aa', state.params.pg_token);
        if(state.params.pg_token !== undefined){
            axios({
            url: "/v1/payment/approve",
            method: "POST",
            headers: {
                Authorization: "KakaoAK ca4cd7847b43dd1a89e836e3ce896daf",
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            params,
            }).then((response) => {
            // 결제 승인에 대한 응답 출력
            const bucketData = response.data;
            console.log(customerId, bucketData);
            axios.post('/api/bucket', {customerId, bucketData});
            });
        }
    }, []);

    return (
      <div style={{textAlign: 'center'}}>
        {payresult === 'success' && <h4>결제에 성공하였습니다.</h4>}
        {payresult === 'fail' && <h4>결제에 실패하였습니다.</h4>}
        {payresult === 'cancel' && <h4>결제를 취소하였습니다.</h4>}        
        <Link to="/main/Internet/Shop"><Button>쇼핑으로 돌아가기</Button></Link>
      </div>
    );
}
export default withRouter(PayResult);