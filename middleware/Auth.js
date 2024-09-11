const jwt = require('jsonwebtoken');

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.sendStatus(401);

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(error,user) => {
        if(error) return res.status(403).send('Access token expired');
        req.user = user;
        next();
    });
}
module.exports = authenticateToken;