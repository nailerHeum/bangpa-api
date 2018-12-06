module.exports = (sequelize, Sequelize) => (  //미완성
  sequelize.define('user', {
    email: {
      type: Sequelize.STRING(40),     //이메일
      allowNull: false,
      unique: true,
    },
    nick: {
      type: Sequelize.STRING(40),     //닉네임
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(100),    //비밀번호 encrypted
      allowNull: false,
    },
    provider: {
      type: Sequelize.STRING(10),     //로그인 제공자
      allowNull: false,
      defaultValue: 'local',
    },
    snsId: {
      type: Sequelize.STRING(30),     // snsId
      allowNull: true,
      unique: true,
    },
    job: {
      type: Sequelize.STRING(20),     // 대학생, 취준생, 직장인
      allowNull: false, 
    }
  }, {
    timestamps: true,
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })
);