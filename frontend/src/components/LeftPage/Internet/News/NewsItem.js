import React, {useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import '../../../MainPage/Main.scss';

const NewsItem = ({ article, Count, setCount }) => {

    const { title, description, url, urlToImage } = article;

    // if (Count % 3 === 0) {
        return (
            <div>
                
                    <div className="box_article">
                        <a href={url} target="_blank" rel="noopner noreferrer">
                        {urlToImage ? 
                            <img src={urlToImage} alt="해당 기사 사진이 오류입니다" />
                            :
                            <img src='/gyeran.png'/>
                        }
                            <span>{title}</span>
                        </a>
                    </div>
               
            </div>
        )
    // }else {
    //     return (
    //         <div>
    //             <div>
    //                 <a href={url} target="_blank" rel="noopner noreferrer">
    //                     <span>{title}</span>
    //                 </a>
    //             </div>
    //         </div>
    //     )
    // }

}

export default withRouter(NewsItem);
