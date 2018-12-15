var Sequelize = require("sequelize");
var sequelize = require("../config/connection");

var model = {};

var user = sequelize.define('Users', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
    values: ['M', 'F']
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

var category = sequelize.define('Categories', {
  category_name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

var userCategory = sequelize.define('UserCategory', {
  category_ranking: {
      type: Sequelize.INTEGER
  }
});

var country = sequelize.define('Countries', { 
  country_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  country_code: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

var userCountries = sequelize.define('UserCountries', {});

user.belongsToMany(category, {
  through: userCategory
});

category.belongsToMany(user, {
  through: userCategory
});

country.belongsToMany(user, {
  through: userCountries
});

user.belongsToMany(country, {
  through: userCountries
});

country.sync();
category.sync();
user.sync();
userCategory.sync();
userCountries.sync();


model.User = user;
model.Category = category;
model.Country = country;

module.exports = model;