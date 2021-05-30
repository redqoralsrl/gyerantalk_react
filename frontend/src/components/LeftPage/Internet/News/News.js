import React, {useState} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import usePromise from '../../../../usePromise';
import { LoadingOutlined } from '@ant-design/icons';
import NewsItem from './NewsItem';

const News = ({ UserData }) => {

    const [Count, setCount] = useState(0);


    const [loading, resolved, error] = usePromise(() => {
        return axios.get(
            `https://newsapi.org/v2/top-headlines?country=kr&apiKey=112d8e8b89e94be1a897eaffad725b6a`
        );
    }, [UserData]);

    // 대기중 일때 실행
    if (loading) {
        return (
            <LoadingOutlined className="loading"/>
        )
    }
    // 값이 없으면 null 값으로 반환
    if (!resolved) {
        return (
            <div>뉴스오류</div>
        );
    }

    // resolved값이 유효할 때
    const { articles } = resolved.data;

    return (
        <div className="news_top">
            {articles.map((article)=>(
                <NewsItem key={article.url} article={article} Count={Count} setCount={setCount}/>
                ))}
        </div>
    )

}


export default withRouter(News);
