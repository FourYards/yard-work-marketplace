const express = require('express');
const router = express.Router();

const indexRouter = require('./index');
const browseRouter = require('./browse');
const myjobsRouter = require('./myjobs');
const jobdetails = require('./jobdetails');
const dashboardRouter = require('./dashboard');
const loginRouter = require('./login');
const addreview = require('./addreview');
const userRouter = require('./user');
const listingRouter = require('./listing/routes');
const reviewRouter = require('./review/routes');
const apiRouter = require('./api/routes');
const profileRouter = require('./profile');
const addFundsRouter = require('./addfunds');
const adminRouter = require('./admin');
const accessDeniedPageRouter = require('./403');

const { logoutController } = require('../controllers/login');

router.use('/', indexRouter);
router.use('/login', loginRouter);
router.use('/addreview', addreview);
router.post('/logout', logoutController);
router.use('/browse', browseRouter);
router.use('/myjobs', myjobsRouter);
router.use('/dashboard', dashboardRouter);
router.use('/jobdetails', jobdetails);
router.use('/user', userRouter);
router.use('/listing', listingRouter);
router.use('/review', reviewRouter);
router.use('/api', apiRouter);
router.use('/profile', profileRouter);
router.use('/addfunds', addFundsRouter);
router.use('/admin', adminRouter);
router.use('/403', accessDeniedPageRouter);

module.exports = router;
