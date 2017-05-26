var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.get('/login', function (req, res) {
  res.redirect(301, '/signin');
});

  router.get('/signin', getSignin);


  function getSignin(req, res) {
    if (req.user) {
      return res.redirect('/');
    }
    return res.render('account/signin', {
      title: 'Sign in to Free Code Camp using a Social Media Account'
    });
  }


module.exports = router;
