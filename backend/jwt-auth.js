var jwt = require('jsonwebtoken');
const refreshTokens = [];

createTokens = (data) => {
    let accessToken = jwt.sign(data,"access-secret", {expiresIn: "1d"});
    let refreshToken = jwt.sign(data, "refresh-secret", {expiresIn: "7d"})
    refreshTokens.push(refreshToken)
    console.log({accessToken,refreshToken})
    return {accessToken,refreshToken}
}
checkAccessToken = (req,res,next) => {
    // console.log(req.headers)
    let token = req.headers["x-access-token"];
    // console.log(token)
    // token = token.split(" ")[1];
    console.log(`checking now: ${token}`)
    if(!token){
        console.log("Unauthorized")
        return res.status(401).send({message: "Unauthorized"})
    }
    jwt.verify(token, "access-secret", (err,user)=>{
        if(!err){
            req.userId = user.id;
            next();
        }
        else{
            console.log(err)
            return res.status(403).send({message: "Forbidden"})
        }
    })
}
checkRefreshToken = (refreshToken) => {
    console.log("checking refreshtoken")
    if(!refreshToken || !refreshTokens.includes(refreshToken)){
        console.log("No refresh token!");
        return false;
    }
    return true;
}


const Auth = {
    checkAccessToken: checkAccessToken,
    createTokens: createTokens,
    checkRefreshToken: checkRefreshToken
    }
module.exports = Auth;