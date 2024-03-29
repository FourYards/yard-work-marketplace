'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models['UserAccount'], {
        foreignKey: {
          allowNull: false,
          field: 'creator',
          name: 'creatorId',
        },
        onDelete: 'CASCADE',
        as: 'creator',
      });
      this.belongsTo(models['Location'], {
        foreignKey: {
          allowNull: false,
          field: 'place',
          name: 'placeId',
        },
        onDelete: 'CASCADE',
        as: 'place',
      });
      this.belongsTo(models['TypeOfWork'], {
        foreignKey: {
          allowNull: false,
          field: 'type',
          name: 'type',
        },
        onDelete: 'RESTRICT',
        as: 'typeDetails',
      });
      this.belongsTo(models['WorkStatus'], {
        foreignKey: {
          field: 'status',
          name: 'status',
          defaultValue: 1,
        },
        onDelete: 'RESTRICT',
        as: 'workStatusDetails',
      });

      this.hasMany(models['Bid'], {
        foreignKey: {
          allowNull: false,
          field: 'listing',
          name: 'listingId',
        },
        as: 'bids',
      });

      this.hasMany(models['Review'], {
        foreignKey: {
          allowNull: true,
          field: 'listing',
          name: 'listingId',
        },
        onDelete: 'CASCADE',
        as: 'providerReviews',
      });
    }
  }
  Listing.init(
    {
      description: DataTypes.STRING,
      lengthInMinutes: DataTypes.INTEGER,
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Listing',
    }
  );

  return Listing;
};
