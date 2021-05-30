import axios from 'axios';

const PAY_READY = 'pay_ready';

export function payReady(dataTosubmit, params){
    console.log(dataTosubmit)
    const request = axios({
        url: "https://kapi.kakao.com/v1/payment/ready",
          // 결제 준비 API는 POST 메소드라고 한다.
          method: "POST",
          headers: {
            // 카카오 developers에 등록한 admin키를 헤더에 줘야 한다.
            Authorization: "KakaoAK ca4cd7847b43dd1a89e836e3ce896daf",
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            // "Access-Control-Allow-Origin": "http://localhost:3000",
          },
          // 설정한 매개변수들
          params,
    })
    .then(response => response.data)
    return {
        type: PAY_READY,
        payload: request
    }
}