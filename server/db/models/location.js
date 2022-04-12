'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models['UserAccount'], {
        foreignKey: 'ownerId',
        as: 'owner',
      });

      this.belongsTo(models['USState'], {
        foreignKey: 'state',
        as: 'stateDetails',
      });

      this.hasMany(models['Listing'], {
        foreignKey: {
          allowNull: false,
          field: 'place',
          name: 'placeId',
        },
        onDelete: 'SET NULL',
        as: 'listings',
      });
    }
  }
  Location.init(
    {
      streetAddress: { type: DataTypes.STRING, allowNull: false },
      city: { type: DataTypes.STRING, allowNull: false },
      zipCode: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Location',
    }
  );

  return Location;
};
