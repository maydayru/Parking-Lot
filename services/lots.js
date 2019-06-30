const Lot = require('./../models/lot');
const Car = require('./../models/car');

exports.find = function(req, res) {
    Lot.find().sort({lot_name: 1}).find({}, function(err, lots) {
        if(err) {
        }
        res.render('lots_list', {lots: lots,user: req.session.user});
        });
};

exports.new = function(req, res) {
    res.render('lots_new',{user: req.session.user});
};

exports.create = function(req, res) {
    Lot.count({}, function (err, c) {
        if (c > 0)
        {
            c++;
            for (let i = 1; i<=req.body.lots_number; i++)
            {
                Lot.create({lot_name: [c]}, function(err, lot) {
                    if(err)
                    {
                        console.log(err);
                    }

                });
                c++
            }
            res.redirect('/lots');
        }
        else
        {
            for (let i = 1; i<=req.body.lots_number; i++)
            {
                Lot.create({lot_name: [i]}, function(err, lot) {
                    if(err) {
                    }
                });
            }
            res.redirect('/lots');
        }
    });
};

exports.edit = function(req, res) {
    Lot.findById(req.params.id, function(err, lot) {
        if(err) {
            return;
        }
        res.render('lots_edit', {
            lot: lot,user: req.session.user
        });
    });
};

exports.update = function(req, res) {
    Lot.update({
        _id: req.params.id
    }, req.body, function(err,lot) {
        if(err) {
            return;
        }
        res.redirect('/lots');
    });
};

exports.remove = function(req, res) {
    Lot.remove({
        _id: req.params.id
    }, function(err) {
        if(err) {
            return;
        }
        res.redirect('/lots');
    });
};

