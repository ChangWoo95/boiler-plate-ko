const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: { // trim은 공백을 없애줌
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: { //토큰 유효기간
        type: Number
    }
})

//db에 저장하기 전에 구현한 함수를 실행하겠다.
userSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) { //비밀번호를 수정할때만 암호화를 진행함
        //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                //Store hash in your password DB.
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }

})


userSchema.methods.comparePassword = function(plainPassword, cb) {

    //plainPasword ex 1234567  암호화된 비밀번호 ex $2b$10$7wFplt1QgEbMXYH8i.pud.Kh9KW8eGBKXT
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err)
        cb(null, isMatch)
    })



}


userSchema.methods.generateToken = function(cb) {

    var user = this;

    //jsonwebtoken을 이용해서 token 생성하기

    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })


}

const User = mongoose.model('User', userSchema)

module.exports = { User }