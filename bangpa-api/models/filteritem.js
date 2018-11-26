module.exports = (sequelize, Sequelize) => (//미완성
  sequelize.define('filteritem', {
    name: {
      type: Sequelize.STRING(50),        //필터아이템 이름
      allowNull: false,
      unique: true
    },
  }, {
    timestamps: true,
    paranoid: true,
  })
);