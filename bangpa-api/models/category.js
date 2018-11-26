module.exports = (sequelize, Sequelize) => (//미완성
  sequelize.define('category', {
    name: {
      type: Sequelize.STRING(50),        // 카테고리 이름
      allowNull: false,
      unique: true,
    },
  }, {
    timestamps: true,
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })
);