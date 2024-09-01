import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log('No authorization header');
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      console.log('No token found');
      return res.status(401).json({
        success: false,
        message: "Token is missing"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    req.tokenData = {
      id: decoded.id,
      role: decoded.role
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({
      success: false,
      message: "Error authenticating",
      error: error.message
    });
  }
};
