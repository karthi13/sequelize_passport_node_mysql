const db = require('../config/db.config.js');

const Municipality = db.municipality;
const Locality = db.locality;
const LocalityAddress = db.localityAddress;
const User = db.user;

const Customer = db.customers;
const Address = db.address;

// create user

exports.createUser = (req, res) => {
    User.create({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        password : req.body.password,
        phone_num : req.body.phone_num,
        role : req.body.role,
        house_number:req.body.house_number,
        street:req.body.street ,
        postcode:req.body.postcode,
        locality_id : req.body.locality_id
    }).then( user => {
        // user.setLocalityAddress(localityAddress);
        res.json(user);
    })

};

// create a municipality
exports.createMunicipality = (req, res) => {	
	// Save to MySQL database
	
	Municipality.create({ 
	  municipality_name: req.body.municipality_name,
	  created_at : new Date(),
	}).then(municipality => {
		res.json(municipality);
	})
};

// create a locality
exports.createLocality = (req, res) => {	
	// Save to MySQL database
	
	Locality.create({ 
      municipality_id: req.body.municipality_id,
      city : req.body.city,
	  created_at : new Date(),
	}).then(locality => {
		res.json(locality);
	})
};

// Post a Customer
exports.create = (req, res) => {	
	// Save to MySQL database
	
	var customer;
	Customer.create({ 
	  //customerid: db.sequelize.Utils.generateUUID(),
	  firstname: req.body.firstname,
	  lastname: req.body.lastname,
	  age: req.body.age
	}).then(createdCustomer => {		
		// Send created customer to client
		customer = createdCustomer;
		
		return Address.create({
			street: req.body.street,
			phone: req.body.phone
		})
	}).then(address => {
		customer.setAddress(address)
		res.send('OK');
	})
};
 
// FETCH all Customers include Addresses
exports.findAll = (req, res) => {
	Customer.findAll({
		attributes: [['uuid', 'customerId'], ['firstname', 'name'], 'age'],
		include: [{
			model: Address,
			where: { fk_customerid: db.Sequelize.col('customer.uuid') },
			attributes: ['street', 'phone']
		}]
	}).then(customers => {
	   res.send(customers);
	});
};




