'use strict';
const {hash} = require('../helpers/hash-helper')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Movie, {foreignKey: "authorId"})
      User.hasMany(models.History, {foreignKey: "authorId"})
      User.hasMany(models.Bookmark, {foreignKey: "authorId"})
      
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      // allowNull: false,
      // validate : {
      //   notNull: {
      //     msg : 'Username is require'
      //   },
      //   notEmpty: {
      //     msg: 'username cannot be empty'
      //   }
      // }
    },
    email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate : { 
      notNull: {
        msg : 'Email can not be an empty'
      }, 
      notEmpty: {
        msg: 'Email can not be an empty string'
      },
      isEmail: {
        msg: 'Email formata is not valid'
      }
    }
  },
    password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate : {
      notNull : { msg : 'Password can not be an empty'},
      notEmpty: { msg: 'Password can not be an empty stringy'},
      isValidLength(value) {
        if (value.length < 5) {
          throw new Error("Password Minimum 5");
        }
      }
    }
  },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate : (user) => {
        user.password = hash(user.password)
      }
    }
  });
  return User;
};