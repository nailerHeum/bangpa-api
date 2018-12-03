# Bangpa-api 

mysql + Sequelize + nodejs + express



/v1 을 통해서 요청, 응답 처리



/v1/test 

- 연결 테스트



/v1

- homepage, Study 목록과 관련 모델들(areas, hashtags, users, categories) 응답

code: 200

payload

- studies
  - id
  - title
  - enddate
  - minNumb
  - maxNumb
  - day
  - LeaderUserId
  - areas:
  - users: []
  - hashtags: []



Insertions for test

INSERT INTO bangpa.studies (title, img, description, enddate, minNumb, maxNumb, day, createdAt, updatedAt) VALUES ('wtf', '{"img1":"fwegadsf", "key2":"wqcafwef"}', 'english mofucker', '2038-01-19 03:14:07', 3, 6, '[1, 3, 5]', '2038-01-19 03:14:07', '2038-01-19 03:14:07');



INSERT INTO bangpa.areas (name, createdAt, updatedAt) VALUES ('서울시 구', '2038-01-19 03:14:07', '2038-01-19 03:14:07');



INSERT INTO bangpa.hashtags (name, createdAt, updatedAt) VALUES ('취준생', '2038-01-19 03:14:07', '2038-01-19 03:14:07');



INSERT INTO bangpa.StudyHash (createdAt, updatedAt, hashtagId, studyId) VALUES ('2038-01-19 03:14:07', '2038-01-19 03:14:07', 9, 1);



INSERT INTO bangpa.users (email, nick, password, provider, snsId, job, createdAt, updatedAt) VALUES ('workerholic@gmail.com', 'proworker', '1234', 'local', 'whitehustler', '직장인', '2038-01-19 03:14:07', '2038-01-19 03:14:07');



update studies set LeaderUserId=1 where id=3



INSERT INTO bangpa.StudyArea (createdAt, updatedAt, studyId, areaId) VALUES ('2038-01-19 03:14:07', '2038-01-19 03:14:07', 3, 5);



INSERT INTO bangpa.StudyUser (createdAt, updatedAt, userId, studyId) VALUES ('2038-01-19 03:14:07', '2038-01-19 03:14:07', 3, 3);

