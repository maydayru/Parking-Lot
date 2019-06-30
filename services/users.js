const User = require('../models/user');

exports.login = function(req, res) {
	res.render('login');
};

exports.signin = function(req, res) {
	User.findOne({
		username: req.body.username,
		password: req.body.password
	}, function(err,user) {
		if (err){


		}
if (user === null){
	res.render('login',{error : 'Вход не выполнен! Неправильный логин или пароль!'});
}
else
{
	req.session.user = {username: user.username};
	res.redirect('/');
}

	});
};

exports.signout = function (req, res) {
	delete req.session.user;
	res.render('login');
};

exports.register = function(req, res) {
	res.render('login',{info: 'Регистрация успешна! Введите свой логин и пароль'});
};

exports.create = function(req, res) {
	User.create(req.body, function(err, user) {
		if(err) {
			return;
		}
		res.render('login',{info: 'Регистрация успешна! Введите свой логин и пароль'});
	});
};