"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class brands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      brands.belongsTo(models.users, {
        as: "user",
        foreignKey: {
          name: "user_id",
        },
      });
      brands.hasMany(models.links, {
        as: "link",
        foreignKey: {
          name: "brand_id",
        },
      });
    }
  }
  brands.init(
    {
      title_brand: DataTypes.STRING,
      description: DataTypes.STRING,
      image_brand: DataTypes.STRING,
      unique_link: DataTypes.STRING,
      view_count: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "brands",
    }
  );
  return brands;
};
