var message =
  'Learn to Code JavaScript and get a Coding Job by Helping Nonprofits';


exports.index = function (req, res, next) {
  res.render('home', { title: message });
}