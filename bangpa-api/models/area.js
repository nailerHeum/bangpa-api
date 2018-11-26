module.exports = (sequelize, Sequelize) => (//미완성
  sequelize.define('area', {
    name: {
      type: Sequelize.STRING(50),        // 지명
      allowNull: false,
      unique: true,
    },
  }, {
    timestamps: true,
    paranoid: true,
  })
);