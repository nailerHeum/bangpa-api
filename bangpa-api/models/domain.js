module.exports = (sequelize, Sequelize) => (
  sequelize.define('domain', {
    host: {
      type: Sequelize.CHAR(36),
      allowNull: false,
    },
    clientSecret: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
  }, {
    timestamps: true,
    paranoid: true,
  })
);