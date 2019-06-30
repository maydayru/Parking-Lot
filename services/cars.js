const Car = require('./../models/car');
const Lot = require('./../models/lot');

exports.find = function(req, res) {
	Car.find({}, function(err, cars) {
		if(err) {
			return;
		}
		res.render('cars_list', {
			cars: cars, user: req.session.user
		});
	});
};

exports.new = function(req, res) {
    Lot.find({}, function(err, lots) {
        if(err) {
            return;
        }
        res.render('cars_new', {lots: lots, user: req.session.user});
    });
};

exports.create = function(req, res) {
	Car.create(req.body, function(err, car) {
		if(err) {
			return;
		}
        Lot.update({lot_name: req.body.lot},{$set: {status:'Занято'}},  function (err,next) {
            if (err){
                return;
            }
		res.redirect('/cars');
	    });
    });
};

exports.edit = function(req, res) {
	Car.findById(req.params.id, function(err, car) {
		if(err) {
			return;
		}
        Lot.find({}, function(err, lots) {
            if(err) {
                return;
            }
                res.render('cars_edit', {lots: lots, car: car, user: req.session.user});
            });
        });
};

exports.update = function(req, res) {
	Car.update({
		_id: req.params.id	
	}, req.body, async function(err,car) {
		if(err) {
			return;
		}
  Lot.update({lot_name: req.body.lot},{$set: {status:'Занято'}},  function (err) {
                        if (err){
                            return;
                        }
                         Lot.update({lot_name: req.body.hlot},{$set: {status:'Свободно'}},  function (err) {
                            if (err){
                            }
                         });
                        res.redirect('/cars');
        });
    });
};

exports.remove = function(req, res) {
	Car.remove({_id: req.params.id}, function(err) {
		if(err) {
			return;
		}
        Lot.update({lot_name: req.body.hlot},{$set: {status:'Свободно'}},  function (err) {
            if (err){
                return;
            }

		res.redirect('/cars');
	    });
    });
};

