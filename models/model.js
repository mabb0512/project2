
module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      values: ['M', 'F']
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  
  var Category = sequelize.define('Category', {
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  var UserCategory = sequelize.define('UserCategory', {
    category_ranking: {
        type: DataTypes.INTEGER
    }
  });

  var Country = sequelize.define("Countries", { 
    country_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  
  User.belongsToMany(Category, {
    through: UserCategory
  });
  
  Category.belongsToMany(User, {
    through: UserCategory
  });

  Country.belongsToMany(User, {
    through: 'UserCountries'
  });

  User.belongsToMany(Country, {
    through: 'UserCountries'
  });

  return {User, Category, Country};

}
