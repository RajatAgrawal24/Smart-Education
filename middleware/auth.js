const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const checkUserAuth = async (req,res,next) => {
    // console.log('Hello Middleware');
    const{token}=req.cookies
    // console.log(token)
    if(!token){
        req.flash('error', 'Unauthorised User Please login')
        res.redirect('/login')
    }else{
        const verifyLogin = jwt.verify(token,'guptchabi@123456')
        // console.log(verifyLogin)
        const data = await userModel.findOne({_id:verifyLogin.ID})
        // console.log(data)
        req.userData = data
        next();
        // if(!(data.isVerified==1)) {
        //     req.flash('error', 'Please Verify your Email First')
        //     res.redirect('/')
        // }else{
        //     req.userData = data
        //     next();
        // }
    }
}

module.exports = checkUserAuth;