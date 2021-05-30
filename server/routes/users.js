const express = require('express');
const { User } = require('../public/models/Users');
const { auth } = require('../public/middleware/auth');
const bodyParser = require('body-parser');
const { Friend } = require('../public/models/Friends');
const router = express.Router();

//////////////////////
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../frontend/public/uploads/");
  },
  filename: (req, file, cb) => {
    // cb(null, `${Date.now()}_${file.originalname}`);
    cb(null, Date.now()+'.'+file.originalname.split('.')[1]);
    // cb(null, Date.now()+'_'+encodeURI(file.originalname);
  },
 });
const upload = multer({storage: storage});

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',(req,res)=>{
  // 회원가입 할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 가져온다.
    const user = new User(req.body);

    // 몽고 DB 함수
    user.save((err,doc)=>{
        if(err) return res.json({ success : false, err})
        return res.status(200).json({
            success : true
        })
    })
});

router.post('/login',(req,res)=>{

  // 요청된 아이디를 데이터베이스에서 있는지 찾는다.
  User.findOne({ userId : req.body.userId },(err,user)=>{
    if(!user){
      return res.json({
        loginSuccess : false,
        message : "입력하신 아이디는 없습니다."
      })
    }
    
    // 요청된 아이디가 데이터베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인
    user.comparePassword(req.body.password, (err, isMatch)=>{
      if(!isMatch) return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });

      // 비밀번호까지 맞다면 토큰을 생성하기
      user.generateToken((err,user)=>{
        if(err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
        res.cookie("x_auth",user.token).status(200).json({loginSuccess:true, userId : user._id});
      })
    })
  })
})

router.get('/auth',auth,(req,res)=>{
  res.status(200).json({
    _id : req.user._id,
    userId : req.user.userId,
     // role이 0이면 일반유저 role이 1 2 3 이든 0이 아니면 관리자
    isAdmin : req.user.role === 0 ? false : true,
    isAuth : true,
    userName : req.user.userName,
    userNickName : req.user.userNickName,
    role : req.user.role,
    image : req.user.image,
    message : req.user.message,
  });
})

router.get('/logout', auth,(req, res)=>{
  User.findOneAndUpdate({ _id : req.user._id },
      { token : "" }, (err, user) =>{
              if(err) return res.json({ success : false, err });
              return res.status(200).send({
                  success : true
              })
          }
      )
})

router.post('/checkId',(req,res)=>{
  // 요청된 아이디를 데이터베이스에서 있는지 찾는다.
  User.findOne({ userId : req.body.userId },(err,user)=>{
    if(!user){
      return res.status(200).json({
        checkId : true,
        message : "사용가능"
      })
    }
    return res.status(200).json({
      checkId : false,
      message : "사용불가능"
    })
  })
})

router.post('/checkNick',(req,res)=>{
  // 요청된 아이디를 데이터베이스에서 있는지 찾는다.
  User.findOne({ userNickName : req.body.userNickName },(err,user)=>{
    if(!user){
      return res.status(200).json({
        checkNick : true,
        message : "사용가능"
      })
    }
    return res.status(200).json({
      checkNick : false,
      message : "사용불가능"
    })
  })
})

router.post('/checkPhone',(req,res)=>{
  // 요청된 아이디를 데이터베이스에서 있는지 찾는다.
  User.findOne({ userPhone : req.body.userPhone },(err,user)=>{
    if(!user){
      return res.status(200).json({
        checkPhone : true,
        message : "사용가능"
      })
    }
    return res.status(200).json({
      checkPhone : false,
      message : "사용불가능"
    })
  })
})

router.get('/get',auth,(req,res)=>{
  res.status(200).json({
    _id : req.user._id,
    userId : req.user.userId,
     // role이 0이면 일반유저 role이 1 2 3 이든 0이 아니면 관리자
    isAdmin : req.user.role === 0 ? false : true,
    isAuth : true,
    userName : req.user.userName,
    userNickName : req.user.userNickName,
    userPhone : req.user.userPhone,
    role : req.user.role,
    image : req.user.image,
    message : req.user.message,
  })
})

router.post('/friendSearch',(req,res)=>{

  const data = req.body.data;
  User.find({ userId : {$regex : "^"+data}},(err,user)=>{
    res.status(200).json({
      friend : user
    })
  })
})

router.post('/addFriend',(req,res)=>{

  const friendId = req.body.data;
  console.log(friendId)
  const userId = req.body.user;
  
  Friend.find({$and : [{userId : userId, friendId : friendId}]},(err,data)=>{
    console.log(data);
    if(data.length === 0){
      User.findOne({ userId : friendId},(err,user)=>{

        let body = {
          userId : userId,
          friendId : user.userId,
          friendName : user.userName,
          friendNickName : user.userNickName,
          friendImage : user.image,
          friendMessage : user.message,
        }
        console.log('body',body);
        const friend = new Friend(body);
    
        friend.save((err,doc)=>{
          if(err) return res.json({ success : false, err})
          return res.status(200).json({
              success : true
          })
        })
      })
    }else{
      return res.status(200).json({
        success : false
      })
    }
  })

  
})

router.post('/updateUser', upload.single('profile_img'), (req, res) => {
  console.log('req.body', req.body);
  console.log('req.file', req.file);
  // console.log('req.file.filename',req.file.filename);
  // console.log('ext', req.file.filename.split('.')[1]);
  if(req.file !== undefined){
    const changeName = '/uploads/'+req.file.filename;
    User.findOneAndUpdate({ userId : req.body.userId },
      { userNickName: req.body.nick, message: req.body.message, image: changeName }, (err, user) =>{
        Friend.updateMany({ friendId: req.body.userId }, 
          { $set: { friendNickName: req.body.nick, friendMessage: req.body.message, friendImage: changeName } }, (err,fr)=>{
            if(err) return res.json({ success : false, err });
            return res.status(200).send({
              success : true
            })
          })
        })
  } else {
    User.findOneAndUpdate({ userId : req.body.userId },
      { userNickName: req.body.nick, message: req.body.message}, (err, user) =>{
        Friend.updateMany({ friendId: req.body.userId }, 
          { $set: { friendNickName: req.body.nick, friendMessage: req.body.message} }, (err,fr)=>{
            if(err) return res.json({ success : false, err });
            return res.status(200).send({
                success : true
            })
          })
    })
  }
})

router.post('/showList',(req,res)=>{
  const data = req.body.userId;
  Friend.find({ userId : {$regex : "^"+data}},(err,user)=>{
    res.status(200).json({
      Myfriend : user
    });
  })
})

module.exports = router;
