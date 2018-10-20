module.exports = (sequelize, Sequelize) => {

	const User = sequelize.define('user', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true
        },
        status:{
            type: Sequelize.ENUM,
            values: ['active', 'inactive'],
            defaultValue: 'active'
        },
		first_name: {
			type: Sequelize.STRING
		},
		last_name: {
			type: Sequelize.STRING
        }, 
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone_num: {
            type: Sequelize.STRING
        },
        house_number:{
            type: Sequelize.STRING
        },
		street: {
			type: Sequelize.STRING
		},
		postcode: {
			type: Sequelize.STRING
        }, 
        role: {
            type: Sequelize.ENUM,
            values: ['user', 'admin']
        },
        locality_id : {
            type: Sequelize.UUID,
            allowNull: false
        },
	}, {
        underscored: true
      });

	return User;
}