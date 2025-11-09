import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {

    let token = req.cookies.token;
    
    if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7); 
        }
    }

    if (!token) {
        return res.json({success: false, message:'Not authorized - no token provided'});
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        
        if (tokenDecode.id) {
          
            req.user = { id: tokenDecode.id, _id: tokenDecode.id };
           
            req.body.userId = tokenDecode.id;
        } else {
            return res.json({success: false, message: 'Not authorized - invalid token'});
        }
        
        next();

    } catch (error) {
        console.error('Auth error:', error.message);
        res.json({success: false, message: 'Invalid token'});
    }
}

export default authUser;