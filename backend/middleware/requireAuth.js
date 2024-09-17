const jwt = require ('jsonwebtoken')
const USER = require('../models/userModel')
const  requireAuth = async (req,res,next) => {
    const {authorization} = req.headers
    if(!authorization){
        return res.status(400).json({error:'Login is required'})
    }
    const token = authorization.split(' ')[1]
    try{
        const {_id} = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user = await USER.findOne({_id}).select('_id')
        next()
    }catch(err){
        res.status(400).json({error:'Token is incorrect'})
    }
}
module.exports = requireAuth