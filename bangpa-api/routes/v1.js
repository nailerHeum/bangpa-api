const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const authRouter = require('./auth');
const { isLoggedIn, isNotLoggedIn, verifyToken } = require('./middlewares');
const { User, Study, Hashtag, Category, Area } = require('../models');

const router = express.Router();

router.use(cors());
router.use('/auth', authRouter);

// router.post('/token', async (req, res) => {
//   const { clientSecret } = req.body;
//   try {
//     const token = jwt.sign(
//       {}, process.env.JWT_SECRET, 
//       {
//         expiresIn: '30m',
//         issuer: 'bangpa',
//       }
//     );
//     return res.json({
//       code: 200,
//       message: 'Token given',
//       token,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       code: 500,
//       message: 'Server Error',
//     });
//   }
// });

//test
router.get('/test', (req, res, next) => {
  return res.json(req.decoded);
});

router.get('/',  async (req, res) => {    // homepage // study와 거기에 해당하는 area, user, 
  try {
    const studies = await Study.findAll(
    {
      include: [{
        model: Area, as: 'RankOneArea',
      }, {
        model: Area, through: 'StudyArea',
      }, 
      {
        model: User, as: 'LeaderUser',
      }, {
        model: User, through: 'StudyUser',
      }, {
        model: Hashtag,
      }, {
        model: Category,
      },]
    }
  );
    console.log('ok=============');
    return res.status(200).json({
      code: 200,
      payload: { studies },
    });
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      code: 404,
      message: '왜 안됨..',
    });
  }
});//hashtags areas imgs
// study 생성시 필요한 것들 : hashtags + areas + imgs + 

router.get('/studies/:id', async(req, res) => {
  try {
    study = await Study.find({
      where: { id: req.params.id},
      include: [{
        model: Area, as: 'RankOneArea',
      }, {
        model: Area, through: 'StudyArea',
      }, 
      {
        model: User, as: 'LeaderUser',
      }, {
        model: User, through: 'StudyUser',
      }, {
        model: Hashtag,
      },
      ]
    });
    return res.status(200).json({
      code: 200,
      payload: { study },
    })
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      code: 404,
      message: 'Study didn\'t exist.',
    });
  }
})
router.post('/studies', verifyToken, async (req, res) => {
  try {
    const study = await Study.create({
      title: req.body.title,
      description: req.body.description,
      enddate: req.body.enddate,
      leader: req.user.id,
      img: req.body.img, // multer or firebase
    });
    const hashtags = req.body.hashtags;
    const categories = req.body.categories;
    if (hashtags) {
      const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
        where: { name: tag.slice(1).toUpperCase() },
      })));
      await post.addHashtags(result.map(r => r[0]));
    }
    if (categories) {
      const result2 = await Promise.all(categories.map(cate => Category.findOrCreate({
        where: { name: cate.slice(1).toUpperCase() },
      })));
      await post.addCategories(result2.map(r => r[0]));
    }
    res.status(200).json({
      code: 200,
      message: 'Study Created.',
      payload: study,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: 'Study Creation Failed',
    });
  }
});

router.patch('/studies/:id', isLoggedIn, async (req, res) => {
  var updateStudy = req.body.study;
  var userId = req.user.id;
  try {
    if (userId === req.updateStudy.leader){
      await Study.update({
        title: updateStudy.title,
        description: updateStudy.description,
        enddate: updateStudy.enddate,
        leader: req.user.id,
        imgs: updateStudy.imgs, 
      });  // update 동작에서 뭐가 필요할까?
      const hashtags = req.body.hashtags;
      const categories = req.body.categories;
      if (hashtags) {
        const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
          where: { name: tag.slice(1).toLowerCase() },
        })));
        await post.updateHashtags(result.map(r => r[0]));
      }
      if (categories) {
        const result2 = await Promise.all(categories.map(cate => Category.findOrCreate({
          where: { name: cate.slice(1).toUpperCase() },
        })));
        await post.updateCategories(result2.map(r => r[0]));
      } 
    } else {
      res.status(401).json({
        code: 401,
        message: 'User Unauthorized',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
    });
  }
});

router.delete('/studies/:id', isLoggedIn, async (req, res) => {
  try{
    const study = await Study.find({ where: { id: req.params.id }});
    study.destroy();
    res.status(200).json({
      code: 200,
      message: 'Deletion success',
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      code: 401,
      message: 'Deletion failed',
    });
  }
});

// users
router.get('/users/:id', isLoggedIn, async (req, res) => {
  try {
    const viewedUser = await User.find({ 
      where: { id: req.params.id }, 
      attributes: { exclude: ['password', 'snsId']},
      include: { model: Study } });
    if (req.params.id === req.user.id){ // my page
      return res.status(200).json({
        code: 200,
        payload: req.user,
      });
    } else {
      return res.status(200).json({     // another user's info.
        code: 200,
        payload: viewedUser,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: 'ernal Server Error',
    });
  }
});

router.patch('/users/:id', isLoggedIn, async (req, res) => {    //user update
  var updateUser = req.body;
  var id = req.user.id;
  try {
    if (id === req.params.id){
      const hash = await bcrypt.hash(updateUser.password, 12);
      await User.update({
        email: updateUser.email,
        nick: updateUser.nick,
        password: hash, // encrypt 처리했음
        snsId: updateUser.password,
      })  // update 동작에서 뭐가 필요할까?
    } else {
      res.status(401).json({
        code: 401,
        message: 'User Unauthorized',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
    });
  }
});

router.delete('/users/:id', isLoggedIn, async (req, res) => { 
  var id = req.params.id;
  try{
    if (id === req.user.id) {
      await User.destroy({ where: { id: req.user.id } });
      res.status(200).json({
        code: 200,
        message: 'User Destroyed',
      });
    } else {
      res.status(401).json({
        code: 401,
        message: 'Not a proper user',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
    });
  }
});


//cafes

router.get('/cafes', async (req, res) => {
  try {
    const cafe = await Cafe.create({
      name: req.body.name,
      description: req.body.description,
      img: req.body.img, // multer or firebase
    });
    const filteritems = req.body.filteritems;
    const area = req.body.area;
    if(filteritems) {
      const result = await Promise.all(filteritems.map)
    }
  } catch (error) {

  }
});
router.get('/cafes/:id', async (req, res) => {

});
router.post('/cafes', async (req, res) => {

});
router.patch('/cafes:id', async (req, res) => {

});
router.delete('/cafes:id', async (req, res) => {

});

// comments

router.get('/comments', async (req, res) => {

});
router.post('/comments', async (req, res) => {

});
router.patch('/comments', async (req, res) => {

});
router.delete('/comments', async (req, res) => {

});

//hashtags
router.get('/hashtags', async (req, res) => {

});
router.post('/hashtags', async (req, res) => {

});
router.patch('/hashtags', async (req, res) => {

});
router.delete('/hashtags', async (req, res) => {

});

//categories
router.get('/categories', async (req, res) => {

});
router.post('/categories', async (req, res) => {

});
router.patch('/categories', async (req, res) => {

});
router.delete('/categories', async (req, res) => {

});

//filteritems
router.get('/filteritems', async (req, res) => {

});
router.post('/filteritems', async (req, res) => {

});
router.patch('/filteritems', async (req, res) => {

});
router.delete('/filteritems', async (req, res) => {

});

//areas
router.get('/areas', async (req, res) => {

});
router.post('/areas', async (req, res) => {

});
router.patch('/areas', async (req, res) => {

});
router.delete('/areas', async (req, res) => {

});

//applies
router.get('/applies', async (req, res) => {

});
router.post('/applies', async (req, res) => {

});
router.patch('/applies', async (req, res) => {

});
router.delete('/applies', async (req, res) => {

});
module.exports = router;
//INSERT INTO bangpa.studies (title, imgs, description, enddate, leader) VALUES ('호로로로로롤', "['fwegadsf', 'wqcafwef']", 'english mofucker', '2038-01-19 03:14:07', 3);