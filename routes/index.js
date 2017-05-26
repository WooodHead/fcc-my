var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


function getEmailSignin(req, res) {
  console.log('msg');
  if (req.user) {
    return res.redirect('/');
  }
  return res.render('account/email-signin', {
    title: 'Sign in to Free Code Camp using your Email Address'
  });
}

router.get('/email-signin', getEmailSignin);


module.exports = router;
