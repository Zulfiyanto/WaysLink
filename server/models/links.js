"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class links extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      links.belongsTo(models.users, {
        as: "brands",
        foreignKey: {
          name: "brand_id",
        },
      });
    }
  }
  links.init(
    {
      title: DataTypes.STRING,
      url: DataTypes.STRING,
      image: DataTypes.STRING,
      brand_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "links",
    }
  );
  return links;
};
