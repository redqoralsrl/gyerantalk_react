const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.saltRounds);
const jwt = require('jsonwebtoken');
const secretToken = process.env.secretToken;

const friendSchema = mongoose.Schema({
    userId : {
        type : String,
        required : true,
    },
    friendId : {
        type : String,
        required : true,
    },
    friendName : {
        type : String,
        required : true,
    },
    friendNickName : {
        type : String,
        required : true,
    },
    friendImage : {
        type : String,
        required : true,
    },
    friendMessage : {
        type : String,
        required : true,
    },
})

// 친구 스키마 모델 만들기
const Friend = mongoose.model('Friend',friendSchema);

// 친구 스키마 공유
module.exports = { Friend };