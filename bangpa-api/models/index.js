const Sequelize = require('sequelize');             // model 관계 총괄
const env = process.env.NODE_ENV || 'development';  // 서버 환경
const config = require('../config/config')[env];    // db 설정
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// table list
db.Domain = require('./domain')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
db.Study = require('./study')(sequelize, Sequelize);
db.Category = require('./Category')(sequelize, Sequelize);
db.Apply = require('./apply')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
db.Filteritem = require('./filteritem')(sequelize, Sequelize);
db.Room = require('./room')(sequelize, Sequelize);
db.Area = require('./area')(sequelize, Sequelize);  
db.Cafe = require('./cafe')(sequelize, Sequelize);
//db.Time = require('./time')(sequelize, Sequelize);  // 얘가 필요한가?
//db.Image // 얘도 필요한가?

// relationships
db.User.hasMany(db.Comment);                                     // 유저와 댓글
db.Comment.belongsTo(db.User);                         

db.User.hasMany(db.Apply);                                       // 유저와 참가신청
db.Apply.belongsTo(db.User);

db.User.belongsToMany(db.Area, { through: 'UserArea' });         // 유저와 지역 구분
db.Area.belongsToMany(db.User, { through: 'UserArea' });

db.User.belongsToMany(db.Category, { through: 'UserCate' });     // 유저와 카테고리 
db.Category.belongsToMany(db.User, { through: 'UserCate' });

db.User.belongsToMany(db.Study, { through: 'StudyUser'});        // 유저와 스터디모집
db.Study.belongsToMany(db.User, { through: 'StudyUser'});

db.Hashtag.belongsToMany(db.Category, { through: 'HashCate' });  // 해시태그와 카테고리
db.Category.belongsToMany(db.Hashtag, { through: 'HashCate' });

db.Hashtag.belongsToMany(db.Study, { through: 'StudyHash' });    // 해시태그와 스터디
db.Study.belongsToMany(db.Hashtag, { through: 'StudyHash' });

db.Study.hasMany(db.Apply);                                      // 스터디모집과 참가신청 
db.Apply.belongsTo(db.Study);

db.Study.belongsToMany(db.Category, { through: 'StudyCate' });   // 스터디모집과 카테고리
db.Category.belongsToMany(db.Study, { through: 'StudyCate' });

db.Study.belongsToMany(db.Area, { through: 'StudyArea' });       // 스터디모집과 지역
db.Area.belongsToMany(db.Study, { through: 'StudyArea' });

db.Filteritem.belongsToMany(db.Room, { through: 'RoomItem' });   // 필터아이템과 룸
db.Room.belongsToMany(db.Filteritem, { through: 'RoomItem' }); 

db.Cafe.belongsTo(db.Area);                                      // 카페과 지역
db.Area.hasMany(db.Cafe);

db.Cafe.hasMany(db.Room);                                         // 카페와 룸
db.Room.belongsTo(db.Cafe);

module.exports = db;