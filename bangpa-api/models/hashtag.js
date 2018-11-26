module.exports = (sequelize, Sequelize) => (//미완성
  sequelize.define('hashtag', {
    name: {
      type: Sequelize.STRING(50),        //해쉬텍 이름
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