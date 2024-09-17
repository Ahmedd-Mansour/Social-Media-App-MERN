const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required : true,
        unique: true
    },
    password:{
        type: String,
        required : true,
        unique: true,
        
    },
    profile_picture:{
        type:String,
        required: true
    }
})

userSchema.statics.signup = async function (name,lastname,email,password,profile_picture)  {
    if(!name || !lastname || !email || !password || !profile_picture){
        console.log(1)
        throw Error('All fields must be filled')
        
    }
    if(!validator.isEmail(email)){
        console.log(2)
        throw Error('This is not a valid email')
        console.log(2)
    }
    if(!validator.isStrongPassword(password)){
        console.log(3)
        throw Error('the password must contain 6 characters, 1 lower case letter, 1 upper case letter, 1 number and 1 symbol')
        console.log(3)
    }
    const exists = await this.findOne({email})
    if(exists){
        console.log(4)
        throw Error('Email already exists')
        console.log(4)
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({name,lastname,email,password:hash,profile_picture})
    return user

}
userSchema.statics.login = async function (email,password)  {
    if(!email || !password){
        throw Error('All Fields must be filled')
    }
    const user = await this.findOne({email})
    if(!user){
        throw Error('Incorrect email')
    }
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        throw Error('Incorrect password')
    }
    return user
}

module.exports = mongoose.model('User',userSchema)