const requireAuth = (req, res, next) => {
  if (!req.session.user?.authenticated) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  next();
};

const requireAuthRedirect = (req, res, next) => {
  if (!req.session.user?.authenticated) {
    return res.redirect('/login');
  }
  next();
};

module.exports = {
  requireAuth,
  requireAuthRedirect
};

