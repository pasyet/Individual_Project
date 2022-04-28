'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.Genre, {foreignKey: "genreId"})
      Movie.belongsTo(models.User, {foreignKey: "authorId"})
      Movie.hasMany(models.History, {foreignKey: 'MovieId'});
      Movie.hasMany(models.Bookmark, {foreignKey: "movieId"});
    }
  };
  Movie.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : { 
        notEmpty: {
          msg: "Title tidak boleh kosong"
        },
        notNull: {
          msg : 'Title null'
        }
      }
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate : {
        notEmpty: {
          msg: "Synopsis tidak boleh kosong"
        },
        notNull: {
          msg : 'Synopsis null'
        }
      }
    },
    trailerUrl: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        min: {
          args: [
            [1]
          ],
          msg :' rating harus lebih dari 1'
        },
        notEmpty: {
          msg: 'Rating tidak boleh kosong'
        },
        notNull: {
          msg : 'Rating null'
        }

      }
    },
    genreId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        cekStatus(value) {
          const status = ['active', 'inactive', 'archived']
          let checkStatus = false
          status.map(el => {
            if (el === value) {
              checkStatus = true
            }
          })
          if (!checkStatus) {
              throw new Error('status must be either active, inactive or archived');
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};