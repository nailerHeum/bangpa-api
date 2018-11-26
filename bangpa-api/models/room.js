module.exports = (sequelize, Sequelize) => (//미완성
  sequelize.define('room', {
    name: {    
      type: Sequelize.STRING(200),          // 방 이름 
      allowNull: false,
      unique: true,
    },
    img: {
      type: Sequelize.STRING(200),          // 이미지 첨부
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(4000),         // 설명글
      allowNull: false,
    },
    personnel: {                            // 방 정원
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  }, {
    timestamps: true,
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })
);