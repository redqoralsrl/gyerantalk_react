const express = require('express');
const { User } = require('../public/models/Users');
const { auth } = require('../public/middleware/auth');
const bodyParser = require('body-parser');
const { Friend } = require('../public/models/Friends');
const { Chat } = require('../public/models/Chat');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/public/chats/')
    },
    filename: function (req, file, cb) {
      // cb(null, `${Date.now()}_${file.originalname}`)
      cb(null, Date.now()+'.'+file.originalname.split('.')[1]);
    },
    // fileFilter: (req, file, cb) => {
    //   const ext = path.extname(file.originalname)
    //   if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
    //     return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
    //   }
    //   cb(null, true)
    // }
  })

var upload = multer({storage:storage}).single('file')

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.post('/checkMember', async(req, res)=>{
  const ones = req.body.one+'_'+req.body.two;
  const twos = req.body.two+'_'+req.body.one;
  await Chat.find({roomName : ones},(err,chats)=>{
    if(chats.length !== 0) return res.json({url : ones});
    Chat.find({roomName : twos},(err,cha)=>{
      if(cha.length !== 0) return res.json({url : twos});
      else res.json({url : ones});
    })
  })
  
})

/* GET users listing. */
router.post('/getChat' , async(req, res) => {
    await Chat.find({roomName : req.body.roomId})
    .populate('sendUser')
    .exec((err, chats) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(chats);
    })
});

router.post('/uploadfiles', auth,(req,res)=>{
    upload(req, res, err =>{
        if(err){
            return res.json({success:false,err})
        }
        // console.log('file', req.file)
        // console.log('filename', req.file.filename);
        // return res.json({success:true, url : res.req.file.path})
        return res.json({success:true, url : '/chats/'+req.file.filename})
    });
  });

router.post('/friend',(req,res)=>{

  User.findOne({userId : req.body.data},(err,user)=>{
    const friend_user = {
      _id : user._id,
      userId : user.userId,
      // role이 0이면 일반유저 role이 1 2 3 이든 0이 아니면 관리자
      isAdmin : user.role === 0 ? false : true,
      isAuth : true,
      userName : user.userName,
      userNickName : user.userNickName,
      userPhone : user.userPhone,
      role : user.role,
      image : user.image,
      message : user.message,
    }
    res.send(friend_user);
  })
})

router.post('/ListShow',(req,res)=>{
  const data1 = req.body._id;
  Chat.find({$or : [{roomName : {$regex : "^"+data1}}, {roomName : {$regex : data1+"$"}}]})
  .sort({'createdAt':-1})
  // .sort([[&#39;date&#39;, 1]])
  .distinct('roomName',(err,db)=>{
    res.send(db);
  })
})

router.post('/textMessage',(req,res)=>{
  Chat.find({roomName : req.body.chat})
  .populate('sendUser')
  .limit(1)
  .sort({'createdAt':-1})
  .then(response => {
    res.send(response);
  });
})

router.post('/profiles',(req,res)=>{
  User.find({_id:req.body.mem},(err,data)=>{
    res.send(data);
  })
})

router.post('/changeMes',(req,res)=>{
  Chat.updateMany({$and : [{roomName:req.body.roomId,user:{$ne : req.body.userId},toUser:req.body.userId}]},
    {$set:{readMessage:true}},(err,data)=>{
    if(err) console.log(err)
  })
})

router.post('/countMessage',(req,res)=>{
  // Chat.find({$and : [{roomName:req.body.roomId},{user:{$ne:req.body._id}},{readMessage:false}]},(err,data)=>{
    Chat.find({$and : [{roomName:req.body.roomId,user:{$ne:req.body._id},readMessage:false}]},(err,data)=>{  
      console.log('개인채팅 개수 : ',data.length);
      let body={
        number : data.length
      }
      res.send(body);
    })
})

router.post('/total',(req,res)=>{
  Chat.find({$and : [{user:{$ne:req.body.userId},readMessage:false,$or : [{roomName : {$regex : "^"+req.body.userId}}, {roomName : {$regex : req.body.userId+"$"}}]}]},(err,data)=>{
    console.log('전체채팅 개수 : ',data.length);
    let body = {
      number : data.length
    }
    res.send(body);
  })
})

module.exports = router;
