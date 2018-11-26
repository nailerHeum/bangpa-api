module.exports = (sequelize, Sequelize) => (//미완성
  sequelize.define('study', {
    title: {    
      type: Sequelize.STRING(200),          // 글 제목
      allowNull: false,
    },
    imgs: {
      type: Sequelize.JSON,          // 이미지 첨부
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(4000),         // 설명글
      allowNull: false,
    },
    enddate: {
      type: Sequelize.DATE,                 // 모집 기간 종료일
      allowNull: false, 
    },
    leader: {
      type: Sequelize.INTEGER,              // team leader의 id
      allowNull: false,
    },
    craetedAt: Sequelize.DATE,              // 모집 시작 시간
  }, {
    timestamps: true,
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })
);