module.exports = (sequelize, Sequelize) => (//미완성
  sequelize.define('comment', {
    content: {
      type: Sequelize.STRING(500),        // 댓글내용
      allowNull: false,
    },
    star: {
      type: Sequelize.INTEGER(5),         // 별점
      allowNull: true,
    },
  }, {
    timestamps: true,
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })
);