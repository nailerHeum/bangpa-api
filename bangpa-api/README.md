# Bangpa-api 

mysql + Sequelize + nodejs + express



## mysql 설정방법

1. 



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

INSERT INTO bangpa.studies (title, img, description, enddate, minNumb, maxNumb, day, createdAt, updatedAt) VALUES ('토익 스터디 급구합니다.', '{"img1":"noimgs6", "key2":"noimgs7"}', '토익을 해야 졸업을 합니다.', '2018-12-16 03:14:07', 3, 5, '[1, 5]', '2018-12-04 03:14:07', '2018-12-05 04:15:08');



INSERT INTO bangpa.areas (name, createdAt, updatedAt) VALUES ('수원시 팔달구', '2018-01-19 03:14:07', '2018-01-19 03:14:07');



INSERT INTO bangpa.hashtags (name, createdAt, updatedAt) VALUES ('고급', '2038-01-19 03:14:07', '2038-01-19 03:14:07');



INSERT INTO bangpa.StudyHash (createdAt, updatedAt, hashtagId, studyId) VALUES ('2038-01-19 03:14:07', '2038-01-19 03:14:07', 9, 3);



INSERT INTO bangpa.users (email, nick, password, provider, snsId, job, createdAt, updatedAt) VALUES ('workerholic@gmail.com', 'proworker', '1234', 'local', 'whitehustler', '직장인', '2038-01-19 03:14:07', '2038-01-19 03:14:07');



update studies set RankOneAreaId=1 where id=2;



INSERT INTO bangpa.StudyArea (createdAt, updatedAt, studyId, areaId) VALUES ('2038-01-19 03:14:07', '2038-01-19 03:14:07', 3, 5);



INSERT INTO bangpa.StudyUser (createdAt, updatedAt, userId, studyId) VALUES ('2038-01-19 03:14:07', '2038-01-19 03:14:07', 3, 3);



- `-X POST`
- -H "Content-Type: application/json"
- -d '{"nick":"qwefqwef", "email":"kingman330@gmail.com", "password":"1234", "snsId":"kakaoef", "job":"대학생"}'