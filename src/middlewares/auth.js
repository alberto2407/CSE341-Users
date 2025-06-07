const { verifyToken } = require('../config/firebase');

 const auth = async (req, res , next ) => {
  try {
    const token = req.header('access-token');
    if (!token) throw new Error('Please log in to continue');

    await verifyToken({ token });
    next();
  } catch (error) {
    res.status(401).json({ status: error.message });
  }
};

module.exports = { auth };