//
// Users Controller
//

'use strict';

module.exports = function() {

    var app = this.app,
        core = this.core,
        middlewares = this.middlewares,
        models = this.models,
        User = models.user;
    var typingDnaClient = global.typingDnaClient;


    //
    // Routes
    //
    app.get('/users', middlewares.requireLogin, function(req) {
        req.io.route('users:list');
    });

    app.get('/verify/:username/:pattern', middlewares.requireLogin, function (req) {
        req.io.route('users:verify');
    });

    app.get('/users/:id', middlewares.requireLogin, function(req) {
        req.io.route('users:get');
    });

    //
    // Sockets
    //
    app.io.route('users', {
        list: function(req, res) {
            var options = {
                skip: req.param('skip'),
                take: req.param('take')
            };

            core.users.list(options, function(err, users) {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err);
                }

                res.json(users);
            });
        },
        verify: function (req, res) {
            var username = req.param('username') + '-letschat'
            typingDnaClient.verify(username, req.param('pattern'), req.body.quality || 1, function (error, result) {
                console.log(result);
                res.json(result);
            })
        },
        get: function(req, res) {
            var identifier = req.param('id');

            User.findByIdentifier(identifier, function (err, user) {
                if (err) {
                    console.error(err);
                    return res.status(400).json(err);
                }

                if (!user) {
                    return res.sendStatus(404);
                }

                res.json(user);
            });
        }
    });
};
