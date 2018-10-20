module.exports = function(app,passport) {
 
    const customers = require('../controller/customer.controller.js');
    const register = require('../controller/register.controller.js');

    // const passport = require('../controller/passport.controller.js');
    // Create a new Customer
    app.post('/api/customers', customers.create);
 
    // CCreate a new User
    app.post('/api/registerUser', register.createUser);
    app.post('/api/createMunicipality', register.createMunicipality);
    app.post('/api/createLocality', register.createLocality);

    // Create a new User with passport
    app.post('/api/register', passport.authenticate('local-signup', {
        successRedirect: '/api/customers',
        failureRedirect: '/api/register'
    }));

    app.post(
        '/api/login',
        passport.authenticate('local-signin', {
          successRedirect: '/api/customers',
          failureRedirect: '/api/login',
          session: false 
        }), function(req, res){
            res.json({ id: req.user.id, firstname: req.user.first_name });
        });

    // Retrieve all Customer
    app.get('/api/customers', customers.findAll);
}