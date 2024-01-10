'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {

    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "User",
      });

    }
  }
  Post.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    post_image_url: DataTypes.STRING,
    user_id: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
