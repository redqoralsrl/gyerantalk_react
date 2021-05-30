const express = require('express');
const router = express.Router();
const cheerio = require("cheerio");
const client = require("cheerio-httpcli");

// router.get('/', (req, res, next) => {
//   const result = [];

//   client.fetch(
//     "https://search.naver.com/search.naver?where=video&sm=tab_jum&query=%EC%B8%84+%EC%98%81%EC%83%81"
//     , (err, $, res, body) => {
//       for (let i = 1; i < 3; i++) {
//         const data = [];
//         let video_src = $(`#main_pack > section > div.api_subject_bx._square_type._prs_vdo_grd > div.video_square_list._svp_list > div > div:nth-child(1) > div.square_box > div:nth-child(${i}) > a`).attr('href');
//         let img_data = $(`#main_pack > section > div.api_subject_bx._square_type._prs_vdo_grd > div.video_square_list._svp_list > div > div:nth-child(1) > div.square_box > div:nth-child(${i}) > a > img`).attr('src');
//         data.push(video_src);
//         data.push(img_data);
//         console.log(data,'111111111');
//         result.push(data);
//         console.log(result,'222222222')
//       }
//     }
//     )
    
//     return res.status(200).json({
//       result : result
//     })
//     // await res.send(result);

//   // res.render('index', { title: 'Express' });
//   // if(err) return res.json({success : false, err});
//   // return res.status(200).json({
//   //     success:true,
//   //     titleList: titleList,
//   //     title: titleli
//   // })
// }
// );

router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // let titleList = [];
  // let titleli=""
  const result = [];

  client.fetch(
  //   "http://comic.naver.com/webtoon/weekday.nhn",
  "https://search.naver.com/search.naver?where=video&sm=tab_jum&query=%EC%B8%84+%EC%98%81%EC%83%81",
    {},
    function (err, $, response, body) {
      // const list = $('ytd-vertical-list-renderer.ytd-shelf-renderer div#items ytd-video-renderer.ytd-vertical-list-renderer')
      // list.each(function(i, elem){
      //     // console.log($(this).text());
      //     titleList[i] = {
      //         title: $(this).find('yt-formatted-string').attr('title'),
      //         // img: $(this).find("div.thumb a img").attr("src")
      //     }
      // });
      for (let i = 1; i < 3; i++) {
        const data = [];
        let video_src = $(`#main_pack > section > div.api_subject_bx._square_type._prs_vdo_grd > div.video_square_list._svp_list > div > div:nth-child(1) > div.square_box > div:nth-child(${i}) > a`).attr('href');
        let img_data = $(`#main_pack > section > div.api_subject_bx._square_type._prs_vdo_grd > div.video_square_list._svp_list > div > div:nth-child(1) > div.square_box > div:nth-child(${i}) > a > img`).attr('src');
        let span_text = $(`#main_pack > section > div.api_subject_bx._square_type._prs_vdo_grd > div.video_square_list._svp_list > div > div:nth-child(1) > div.square_box > div:nth-child(${i}) > div > a > span`).text();
        data.push(video_src);
        data.push(img_data);
        data.push(span_text);
        result[i-1] = {
          video_src : video_src,
          img_data : img_data,
          span_text : span_text
        }
      }
      for (let i = 1; i < 3; i++) {
        const data = [];
        let video_src = $(`#main_pack > section > div.api_subject_bx._square_type._prs_vdo_grd > div.video_square_list._svp_list > div > div:nth-child(2) > div.square_box > div:nth-child(${i}) > a`).attr('href');
        let img_data = $(`#main_pack > section > div.api_subject_bx._square_type._prs_vdo_grd > div.video_square_list._svp_list > div > div:nth-child(2) > div.square_box > div:nth-child(${i}) > a > img`).attr('src');
        let span_text = $(`#main_pack > section > div.api_subject_bx._square_type._prs_vdo_grd > div.video_square_list._svp_list > div > div:nth-child(1) > div.square_box > div:nth-child(${i}) > div > a > span`).text();
        data.push(video_src);
        data.push(img_data);
        data.push(span_text);
        result[i+1] = {
          video_src : video_src,
          img_data : img_data,
          span_text : span_text
        }
      }
      if(err) return res.json({success : false, err});
      return res.status(200).json({
          result : result
      })
    }
  );
});




module.exports = router;