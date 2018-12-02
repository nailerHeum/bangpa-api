module.exports = (sequelize, Sequelize) => (//미완성
  sequelize.define('study', {
    title: {    
      type: Sequelize.STRING(200),          // 글 제목
      allowNull: false,
    },
    img : {
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
    made: {                                 // 모집 완료 여부
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    minNumb: {                              // 최소 인원
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    maxNumb: {                              // 최대 인원
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    day: {                                  // 요일 설정
      type: Sequelize.JSON,
      allowNUll: false,
    },
  }, {
    timestamps: true,
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })
);