import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ShopItem from './ShopItem';
import PayResult from './PayResult';

const Shop = ({location, match, UserData}) => {
    function getUrlParams() {
        var params = {};
        location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
        return params;
    }
    const query = getUrlParams();
    const dataBase= [
        {
            image: '/shopping/shopping_1.png',
            productName: '오트밀크로 만든 쫀득 수제 생초콜릿 5종(밀크/다크/녹차/인절미/누텔라)',
            productCode: 1,
            productPrice: 15900,
            productDesc: '/shopping/shopping_1_desc.jpg',
        },
        {
            image: '/shopping/shopping_2.jpg',
            productName: '"고마운분께 감사선물" 하루견과 고마워요/사랑해요/감사해요 30입세트',
            productCode: 2,
            productPrice: 13900,
            productDesc: '/shopping/shopping_2_desc.jpg',
        },
        {
            image: '/shopping/shopping_3.jpg',
            productName: '[디저트선물] 프랑스 프리미엄 마카롱 (12입)',
            productCode: 3,
            productPrice: 12500,
            productDesc: '/shopping/shopping_3_desc.jpg',
        },
        {
            image: '/shopping/shopping_4.jpg',
            productName: '"내마음은 하트" 페레로로쉐 T8 하트 초콜릿',
            productCode: 4,
            productPrice: 8400,
            productDesc: '/shopping/shopping_4_desc.jpg',
        },
    ]

    const boxStyle = {
      display: "inline-block",
      width: "43%",
      padding: "10% 0 0",
      textDecoration: 'none',
      color: 'inherit',
      fontSize: '13px',
    };

    const titleStyle = {
      display: "-webkit-box",
      fontSize: "12px",
      width: "100%",
      height: "35px",
      overflow: "hidden",
      whiteSpace: 'normal',
      textOverflow: "ellipsis",
      margin: '3% 0 3%'
    };

    return (
        <div>
            <div className="products_section" style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', width: '90%', margin: '0 auto'}}>
                {match.params.select === undefined ?
                query.item === undefined ? 
                //리스트
                dataBase.map((productBox, index) => (
                    // <Link to={`/main/Internet/Shop/${index+1}`} className="products_box" style={boxStyle}>
                    <Link to={`/main/Internet/Shop?item=${index}`} className="products_box" style={boxStyle} key={index}>
                        <img className="products_img" src={productBox.image} style={{width: '100%'}}/>
                        <div className="products_title" style={titleStyle}>{productBox.productName}</div>
                        <div className="products_price" style={{fontWeight: '700'}}>{productBox.productPrice.toLocaleString()}원</div>
                    </Link>
                ))
                :
                //상품조회
                <ShopItem key={query.item} productBox={dataBase[query.item]} querynum={query.item} UserData={UserData}/>
                :
                query.item === undefined ?
                //결제승인
                <PayResult UserData={UserData}/>
                :
                <div>페이지가 없습니다.</div>
                }
            </div>
        </div>
    )
}

export default withRouter(Shop);
