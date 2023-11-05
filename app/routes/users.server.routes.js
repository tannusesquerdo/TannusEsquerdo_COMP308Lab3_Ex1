// Load the 'users' controller
var users = require('../../app/controllers/users.server.controller');
var express = require('express');
var router = express.Router();
// Define the routes module' method
module.exports = function (app) {
    app.get("/admin/users",users.requiresLogin,users.list);
    app.post('/admin/', users.create);
    //
	app.route('/admin/users/:userId')
    .get(users.read)
    .put(users.update)
    .delete(users.delete)

    app.param('userId', users.userByID);
    //authenticate user
    app.post('/admin/signin', users.authenticate);
    app.get('/admin/signout', users.signout);
    app.get('/admin/read_cookie', users.isSignedIn);
    
};
