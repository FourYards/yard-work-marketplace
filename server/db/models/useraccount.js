'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models['Role'], { foreignKey: 'role', as: 'roleDetails' });
      this.belongsTo(models['DisplayType'], {
        foreignKey: { name: 'displayType', allowNull: false },
        onDelete: 'SET NULL',
        as: 'displayTypeDetails',
      });

      this.hasMany(models['Bid'], {
        foreignKey: {
          allowNull: false,
          field: 'bidder',
          name: 'bidderId',
        },
        as: 'bids',
      });

      this.hasMany(models['Listing'], {
        foreignKey: {
          allowNull: false,
          field: 'creator',
          name: 'creatorId',
        },
        as: 'listings',
      });

      this.hasMany(models['Location'], {
        foreignKey: {
          allowNull: false,
          field: 'owner',
          name: 'ownerId',
        },
        as: 'locations',
      });

      this.hasMany(models['Review'], {
        foreignKey: {
          allowNull: false,
          field: 'author',
          name: 'authorId',
        },
        as: 'reviews',
      });

      this.hasMany(models['Review'], {
        foreignKey: {
          allowNull: true,
          field: 'provider',
          name: 'providerId',
        },
        as: 'customerReviews',
      });
    }
  }
  UserAccount.init(
    {
      emailAddress: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      realName: { type: DataTypes.STRING, allowNull: false },
      passwordHash: { type: DataTypes.STRING(255), allowNull: false },
      phoneNumber: DataTypes.STRING,
      balance: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      sequelize,
      modelName: 'UserAccount',
    }
  );

  return UserAccount;
};
