module.exports = (sequelize, Sequelize) => (//미완성
  sequelize.define('apply', {
    introduce: {
      type: Sequelize.STRING(500),        // 소개글
      allowNull: false,
    },
  }, {
    timestamps: true,
    paranoid: true,
  })
);