module.exports = function (req, res, next) {
  res.locals.clientContext = {};
  next();
};
